#!/usr/bin/env node

import { createServer } from "http";
import { readFile } from "fs/promises";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { watch, readdir } from "fs";
import { spawn } from "child_process";
import { promisify } from "util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;
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
    return ["test01", "test02"]; // fallback
  }
}

let projects = [];
let currentProcess = null;

// MIME types for different file extensions
const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

// File watching and rebuilding logic
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

// Create and start the HTTP server
const server = createServer(async (req, res) => {
  try {
    let filePath = req.url;

    // Default to index.html if no file specified
    if (filePath === "/" || filePath === "") {
      filePath = "/index.html";
    }

    // Remove leading slash and resolve path
    const cleanPath = filePath.substring(1);
    const fullPath = join(__dirname, cleanPath);

    // Security: prevent directory traversal
    if (!fullPath.startsWith(__dirname)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    // Read the file
    const content = await readFile(fullPath);

    // Set content type based on file extension
    const ext = extname(fullPath);
    const contentType = mimeTypes[ext] || "text/plain";

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  } catch (error) {
    if (error.code === "ENOENT") {
      res.writeHead(404);
      res.end("File not found");
    } else {
      console.error("Server error:", error);
      res.writeHead(500);
      res.end("Internal server error");
    }
  }
});

// Initialize and start everything
async function initialize() {
  // Get project folders dynamically
  projects = await getProjectFolders();

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

  // Start the server
  server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log(`📄 Available projects:`);
    projects.forEach((project) => {
      console.log(`   - http://localhost:${PORT}/${project}/index.html`);
    });
    console.log(
      `\n👀 File watcher is running - changes will auto-rebuild HTML files`
    );
    console.log(`🌐 Server is running - view your projects in the browser`);
    console.log(`\nPress Ctrl+C to stop both watcher and server`);

    // Run the first project initially
    if (projects.length > 0) {
      runProject(projects[0]);
    }
  });
}

// Start the application
initialize().catch(console.error);

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down...");
  if (currentProcess) {
    currentProcess.kill();
  }
  server.close(() => {
    console.log("✅ Server stopped");
    process.exit(0);
  });
});
