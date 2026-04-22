import express, { Request, Response } from "express";
import { userAuth } from "../middleware/auth.js";
import Thumbnail from "../models/Thumbnail.js";
import { colorSchemeDescriptions, stylePrompts } from "../utils/constant.js";
import { IColor, IStyle } from "../types/types.js";
import ai, { generateConfig } from "../config/ai.js";
import path from "node:path";
import fs from "node:fs";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

router.post(
  "/user/generate/thumbnail",
  userAuth,
  async (req: Request, res: Response) => {
    try {
      const {
        title,
        prompt: userPrompt,
        style,
        aspectRatio,
        colorScheme,
        textOverlay,
      } = req.body;
      const userId = req.body.user._id;
      const thumbnail = await Thumbnail.create({
        userId,
        title,
        userPrompt,
        promptUsed: userPrompt,
        style,
        aspectRatio,
        colorScheme,
        textOverlay,
        isGenerating: true,
      });

      const model = "gemini-3-pro-image-preview";

      const generatingConfig = generateConfig(aspectRatio);

      let prompt = `create a ${stylePrompts[style as IStyle]} for: "${title}"`;

      if (colorScheme) {
        prompt += `Use a ${colorSchemeDescriptions[colorScheme as IColor]} color scheme.`;
      }

      if (userPrompt) {
        prompt += `Additional details: ${userPrompt}`;
      }

      prompt += `The thumbnail should be ${aspectRatio}, visually stunning, and designed to maximize click-through rate. Make it bold, professional and impossible to ignore.`;

      const response: any = ai.models.generateContent({
        model,
        contents: [prompt],
        config: generatingConfig,
      });

      if (!response?.candidates[0]?.content?.parts)
        throw new Error("Unexpected response");

      const parts = response.candidates[0].content.parts;

      let finalBuffer: Buffer | null = null;

      for (const part of parts) {
        if (part.inlineData)
          finalBuffer = Buffer.from(part.inlineData.data, "base64");
      }

      const fileName = `final-output-${Date.now()}.png`;
      const filePath = path.join("images", fileName);

      fs.mkdirSync("images", { recursive: true });
      fs.writeFileSync(filePath, finalBuffer!);

      const uploadRes = await cloudinary.uploader.upload(filePath, {
        resource_type: "image",
      });

      thumbnail.imageUrl = uploadRes.url;
      thumbnail.isGenerating = false;

      await thumbnail.save();
      res.json({ success: true, data: thumbnail });
      fs.unlinkSync(filePath);
    } catch (error) {
      res.json({ success: false, message: (error as Error).message });
    }
  },
);

router.delete(
  "/user/thumbnail/delete/:thumbId",
  userAuth,
  async (req: Request, res: Response) => {
    try {
      const {thumbId} = req.params;
      await Thumbnail.findByIdAndDelete(thumbId);

      res.json({ success: true, message: "Thumbnail successfully deleted." });
    } catch (error) {
      res.json({ success: false, message: (error as Error).message });
    }
  },
);

export default router;
