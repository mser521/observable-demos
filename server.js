import { createServer } from "http";
import { readFile } from "fs/promises";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;

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

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📁 Serving files from: ${__dirname}`);
  console.log(`📄 Available projects:`);
  console.log(`   - http://localhost:${PORT}/test01/index.html`);
  console.log(`   - http://localhost:${PORT}/test02/index.html`);
  console.log(`   - http://localhost:${PORT}/test03/index.html`);
  console.log(`\nPress Ctrl+C to stop the server`);
});
