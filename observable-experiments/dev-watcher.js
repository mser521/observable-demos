#!/usr/bin/env node

import { watch } from "fs";
import { spawn } from "child_process";
import { join } from "path";

const projects = ["test01", "test02", "test03"];
let currentProcess = null;

function runProject(projectPath) {
  // Kill any existing process
  if (currentProcess) {
    currentProcess.kill();
  }

  console.log(`🔄 Running ${projectPath}/main.mjs...`);

  // Start new process
  currentProcess = spawn("node", [`${projectPath}/main.mjs`], {
    stdio: "inherit",
    shell: true,
  });

  currentProcess.on("close", (code) => {
    console.log(`✅ ${projectPath}/main.mjs finished with code ${code}`);
  });
}

function getProjectFromPath(filePath) {
  for (const project of projects) {
    if (filePath.startsWith(project + "/")) {
      return project;
    }
  }
  return null;
}

// Watch all project directories
projects.forEach((project) => {
  watch(project, { recursive: true }, (eventType, filename) => {
    if (
      filename &&
      (filename.endsWith(".mjs") ||
        filename.endsWith(".js") ||
        filename.endsWith(".csv"))
    ) {
      const projectName = getProjectFromPath(join(project, filename));
      if (projectName) {
        console.log(`📁 Change detected in ${projectName}: ${filename}`);
        runProject(projectName);
      }
    }
  });
});

console.log("👀 Watching for changes in:");
projects.forEach((project) => console.log(`   - ${project}/`));
console.log("Press Ctrl+C to stop\n");

// Run the first project initially
runProject("test01");
