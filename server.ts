import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const db = new Database("inquiries.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    projectType TEXT,
    message TEXT,
    status TEXT DEFAULT 'Not Started',
    files TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Check if status column exists (for existing databases)
try {
  db.prepare("SELECT status FROM inquiries LIMIT 1").get();
} catch (e) {
  db.exec("ALTER TABLE inquiries ADD COLUMN status TEXT DEFAULT 'Not Started'");
}

// Check if files column exists (for existing databases)
try {
  db.prepare("SELECT files FROM inquiries LIMIT 1").get();
} catch (e) {
  db.exec("ALTER TABLE inquiries ADD COLUMN files TEXT");
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());
  app.use("/uploads", express.static(uploadDir));

  // API Routes
  app.post("/api/inquiries", upload.array("files"), async (req, res) => {
    const { name, email, projectType, message } = req.body;
    const files = req.files as Express.Multer.File[];
    const fileNames = files ? JSON.stringify(files.map(f => f.filename)) : null;

    try {
      // 1. Save to Database
      const stmt = db.prepare("INSERT INTO inquiries (name, email, projectType, message, files) VALUES (?, ?, ?, ?, ?)");
      stmt.run(name, email, projectType, message, fileNames);

      // 2. Send Email Notification
      if (resend) {
        try {
          await resend.emails.send({
            from: 'D3V Prints <onboarding@resend.dev>',
            to: process.env.NOTIFICATION_EMAIL || 'd3vprints@gmail.com',
            subject: `New Project Inquiry: ${projectType}`,
            text: `
              New inquiry received from D3V Prints website:
              
              Name: ${name}
              Email: ${email}
              Project Type: ${projectType}
              
              Message:
              ${message}
              
              Files Attached: ${files ? files.length : 0}
              
              ---
              View all inquiries at: ${process.env.APP_URL || 'http://localhost:3000'}/developer
            `,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #141414; border-bottom: 2px solid #00FF00; padding-bottom: 10px;">New Project Inquiry</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Project Type:</strong> ${projectType}</p>
                <p><strong>Files:</strong> ${files ? files.length : 0} attached</p>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
                  <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #888;">Message</h3>
                  <p style="white-space: pre-wrap; color: #444;">${message}</p>
                </div>
                <div style="margin-top: 30px; text-align: center;">
                  <a href="${process.env.APP_URL || 'http://localhost:3000'}/developer" style="background: #141414; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Dashboard</a>
                </div>
              </div>
            `
          });
          console.log("Notification email sent successfully via Resend");
        } catch (emailError: any) {
          console.error("Failed to send notification email via Resend:", emailError);
        }
      } else {
        console.warn("Resend API key missing. Email not sent.");
      }

      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Failed to save inquiry" });
    }
  });

  app.get("/api/inquiries", (req, res) => {
    const password = req.headers["x-dev-password"];
    const devPassword = process.env.DEV_PASSWORD || "admin";

    if (password !== devPassword) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const inquiries = db.prepare("SELECT * FROM inquiries ORDER BY createdAt DESC").all();
      res.json(inquiries);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Failed to fetch inquiries" });
    }
  });

  app.patch("/api/inquiries/:id", (req, res) => {
    const password = req.headers["x-dev-password"];
    const devPassword = process.env.DEV_PASSWORD || "admin";

    if (password !== devPassword) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id } = req.params;
    const { status } = req.body;

    try {
      const stmt = db.prepare("UPDATE inquiries SET status = ? WHERE id = ?");
      stmt.run(status, id);
      res.json({ success: true });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Failed to update inquiry" });
    }
  });

  app.delete("/api/inquiries/:id", (req, res) => {
    const password = req.headers["x-dev-password"];
    const devPassword = process.env.DEV_PASSWORD || "admin";

    if (password !== devPassword) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id } = req.params;

    try {
      const stmt = db.prepare("DELETE FROM inquiries WHERE id = ?");
      const result = stmt.run(id);
      if (result.changes > 0) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Inquiry not found" });
      }
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Failed to delete inquiry" });
    }
  });

  app.post("/api/verify-password", (req, res) => {
    const { password } = req.body;
    const devPassword = process.env.DEV_PASSWORD || "admin";
    
    if (password === devPassword) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
