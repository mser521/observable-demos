#!/usr/bin/env node

import { watch, readdir } from "fs";
import { spawn } from "child_process";
import { join } from "path";
import { promisify } from "util";

const readdirAsync = promisify(readdir);

// Dynamically detect project folders
async function getProjectFolders() {
  try {
    const items = await readdirAsync(".", { withFileTypes: true });
    return items
      .filter((item) => item.isDirectory() && item.name.startsWith("test"))
      .map((item) => item.name);
  } catch (error) {
    console.error("Error reading directories:", error);
    return []; // fallback
  }
}

let projects = [];
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

// Initialize and start watching
async function initialize() {
  // Get project folders dynamically
  projects = await getProjectFolders();

  console.log("👀 Watching for changes in:");
  projects.forEach((project) => console.log(`   - ${project}/`));
  console.log("Press Ctrl+C to stop\n");

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

  // Run the first project initially
  if (projects.length > 0) {
    runProject(projects[0]);
  }
}

// Start the application
initialize().catch(console.error);
