import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Allow larger payload for image uploading / base64 content
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Static uploads directory
  const uploadsDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  app.use("/uploads", express.static(uploadsDir));

  // Storage for site content JSON
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const contentFilePath = path.join(dataDir, "siteContent.json");

  // Admin authentication endpoint
  app.post("/api/admin/login", (req: express.Request, res: express.Response): void => {
    const { email, password } = req.body || {};
    if (
      email &&
      email.trim().toLowerCase() === "pappuott@gmail.com" &&
      password === "Admin@2026"
    ) {
      res.json({
        success: true,
        token: `admin_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        user: {
          email: "pappuott@gmail.com",
          role: "Super Admin",
          name: "Molecure Admin"
        }
      });
    } else {
      res.status(401).json({
        error: "Invalid credentials. Access restricted to authorized personnel."
      });
    }
  });

  // Get site content
  app.get("/api/site-content", (req: express.Request, res: express.Response): void => {
    try {
      if (fs.existsSync(contentFilePath)) {
        const fileData = fs.readFileSync(contentFilePath, "utf-8");
        const parsed = JSON.parse(fileData);
        res.json({ success: true, data: parsed });
      } else {
        res.json({ success: false, data: null });
      }
    } catch (err: any) {
      console.error("Error reading siteContent.json:", err);
      res.status(500).json({ error: "Failed to read content file", details: err.message });
    }
  });

  // Save/update site content
  app.put("/api/site-content", (req: express.Request, res: express.Response): void => {
    try {
      const content = req.body;
      if (!content || typeof content !== "object") {
        res.status(400).json({ error: "Invalid content body" });
        return;
      }
      fs.writeFileSync(contentFilePath, JSON.stringify(content, null, 2), "utf-8");
      res.json({ success: true, timestamp: new Date().toISOString() });
    } catch (err: any) {
      console.error("Error writing siteContent.json:", err);
      res.status(500).json({ error: "Failed to save content", details: err.message });
    }
  });

  // Reset site content
  app.post("/api/site-content/reset", (req: express.Request, res: express.Response): void => {
    try {
      if (fs.existsSync(contentFilePath)) {
        fs.unlinkSync(contentFilePath);
      }
      res.json({ success: true, message: "Site content reset to initial defaults." });
    } catch (err: any) {
      console.error("Error resetting site content:", err);
      res.status(500).json({ error: "Failed to reset content", details: err.message });
    }
  });

  // Image / file upload endpoint
  app.post("/api/upload", (req: express.Request, res: express.Response): void => {
    try {
      const { dataUrl, filename, title } = req.body || {};
      if (!dataUrl) {
        res.status(400).json({ error: "Missing dataUrl in request." });
        return;
      }

      // Handle base64 data URI
      const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const extension = matches[1].split("/")[1]?.replace("jpeg", "jpg") || "png";
        const cleanName = (filename || `upload_${Date.now()}`)
          .replace(/[^a-zA-Z0-9_-]/g, "_")
          .replace(/\.[^/.]+$/, "");
        const targetFilename = `${cleanName}_${Date.now()}.${extension}`;
        const targetPath = path.join(uploadsDir, targetFilename);
        const buffer = Buffer.from(matches[2], "base64");
        fs.writeFileSync(targetPath, buffer);

        res.json({
          success: true,
          url: `/uploads/${targetFilename}`,
          title: title || cleanName
        });
      } else if (dataUrl.startsWith("http://") || dataUrl.startsWith("https://")) {
        // External URL pass-through
        res.json({
          success: true,
          url: dataUrl,
          title: title || "External image asset"
        });
      } else {
        res.status(400).json({ error: "Unsupported dataUrl format." });
      }
    } catch (err: any) {
      console.error("Error handling upload:", err);
      res.status(500).json({ error: "Failed to upload file", details: err.message });
    }
  });

  // Initialize Google GenAI securely on the server
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Molecure Server: GoogleGenAI successfully initialized.");
  } else {
    console.warn("Molecure Server: GEMINI_API_KEY is not defined. AI Chatbot will run in offline simulation mode.");
  }

  // API Endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // Chatbot Secure Endpoint
  app.post("/api/chat", async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const { history } = req.body;

      if (!history || !Array.isArray(history)) {
        res.status(400).json({ error: "Invalid history format. Must be an array of chat messages." });
        return;
      }

      if (!ai) {
        // Fallback simulation mode if API key is missing, to keep app running gracefully
        res.json({
          response: "Hello! I am currently operating in a simulated consultation mode because my scientific core (API key) is not fully initialized. I can still explain that Molecure utilizes nutrigenomics—the study of gene-diet interactions—to personalize antioxidant support. For example, individuals with specific variations in the MnSOD gene (such as the Val16Ala polymorphism) may have altered mitochondrial transport of antioxidant enzymes, making high-quality exogenous antioxidant intake (like beta-carotene and Vitamin C) essential. How can I help you learn about cellular health today?",
          text: "Hello! I am currently operating in a simulated consultation mode because my scientific core (API key) is not fully initialized. I can still explain that Molecure utilizes nutrigenomics—the study of gene-diet interactions—to personalize antioxidant support. For example, individuals with specific variations in the MnSOD gene (such as the Val16Ala polymorphism) may have altered mitochondrial transport of antioxidant enzymes, making high-quality exogenous antioxidant intake (like beta-carotene and Vitamin C) essential. How can I help you learn about cellular health today?",
        });
        return;
      }

      // Prepare system instructions for FDA compliance and science-backed brand voice from shared PDFs
      const systemInstruction = `You are Molecure AI, a premium, professional cellular wellness and nutrigenomics expert advisor.
Your goal is to educate users on gene-diet interactions, antioxidant defense, and personalized nutrition, while maintaining the brand's premium, scientific, yet highly human tone.

REPRESENTATIVE SCIENTIFIC TOPICS & PRODUCTS:
1. Liposomal Glutathione & Ergothioneine Synergy (Catalog: CDLNPF24-008-L): Bypasses transport limits to restore cellular Glutathione (GSH). Addresses GSH depletion which is a fundamental risk factor for chronic pulmonary and vascular disease. GPX enzymes are selenium-dependent, so we include L-Selenomethionine as a vital cofactor.
2. Clipos™ Nanoliposomal Curcumin & Resveratrol (Catalog: CDPR-0005): Suppresses inflammatory markers (CRP, TNF-a, IL-6, STAT4, TRAF1/C5, and PTPN22) related to autoinflammatory conditions like arthritis. Modulates neurological PGC1a/FNDC5/BDNF pathway, reversing depression & stress by protecting hippocampal brain-derived neurotrophic factor (BDNF). Includes Astragaloside IV (Cat. No: X23-04-XQ1082) for telomere longevity.
3. Clipos™ Nanoliposomal Luteolin & PEA (Catalog: CDPR-0014): Selective COX-2 inhibitor that suppresses neuroinflammation (TNF-a, IL-1b, IL-6, and iNOS) in age-related cognitive decline, multiple sclerosis, and trauma. Inhibits cancer signaling (p-AKT, mTOR) in MCF7 tumor cells.
4. Tanshinone IIA & CoQ10 Vascular Shield (Catalog: CDPR-0006): Isolated from Salvia miltiorrhiza (Dan Shen). Demonstrates good binding with heme oxygenase 1 and secreted phosphoprotein 1. Promotes tumor cell apoptosis and protects heart/nerve tissues.
5. Liposomal NMN & Sirtuin Activator (Catalog: CDLNPF24-039-L): Replenishes intracellular NAD+ pools to regulate SIRT1-9 pathways. Preserves protein acetylation in mitochondria to protect against respiratory complex IV defects and metabolic catastrophe.
6. Dec0ded AI Bespoke Personalized Pack: Powered by Dec0ded, the world's first AI functional genomics clinic software (7-year ML models interoperable with NutriGenDB database) sequencing psychiatric risk genes (TRANK1 rs9834970 Bipolar risk, TENM4 Schizophrenia missense mutations, MAD1L1, etc.) to customize plant-based therapeutics.

CRITICAL COMPLIANCE RULES:
- Never make medical, diagnostic, treatment, or disease-prevention claims.
- Never mention diagnosing, treating, curing, or preventing diseases (such as cancer, diabetes, Alzheimer's, or osteoporosis) in connection with our supplements. You can mention they are areas of active research regarding oxidative stress in general, but clearly state supplements are designed to support and maintain healthy biological functions.
- Always use compliant, supportive language: "helps maintain cellular integrity", "supports natural mitochondrial defense", "contributes to redox homeostasis", "designed to support antioxidant status", "promotes cellular health".
- If asked about specific medical conditions, guide the user to consult with their physician.
- Keep responses concise, structured (using clean formatting), easy to read, and deeply reassuring.`;

      // Format history properly to support multiple possible formats (role, text, content, parts)
      const formattedContents = history.map((msg: any) => {
        const role = msg.role === "assistant" || msg.role === "model" ? "model" : "user";
        const messageText = msg.text || msg.content || (msg.parts && msg.parts[0] && msg.parts[0].text) || "";
        return {
          role,
          parts: [{ text: messageText }],
        };
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({
        response: response.text,
        text: response.text,
      });
    } catch (error: any) {
      console.error("Error in /api/chat:", error);
      res.status(500).json({ error: "Failed to communicate with AI service.", details: error.message });
    }
  });

  // Serve static assets or mount Vite middleware
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in DEVELOPMENT mode with Vite dev middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Molecure Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
