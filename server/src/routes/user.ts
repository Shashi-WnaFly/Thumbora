import express, { Request, Response } from "express";
import { userAuth } from "../middleware/auth.js";
import Thumbnail from "../models/Thumbnail.js";
import { colorSchemeDescriptions, stylePrompts } from "../utils/constants.js";
import { IColor, IStyle } from "../types/types.js";
import ai, { generateConfig } from "../config/ai.js";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

router.post(
  "/user/generate/thumbnail",
  userAuth,
  async (req: Request, res: Response) => {
    let thumbnail: any = null;
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
      thumbnail = await Thumbnail.create({
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

      const response: any = await ai.models.generateContent({
        model,
        contents: [prompt],
        config: generatingConfig,
      });

      const parts = response?.candidates[0]?.content?.parts;

      if (!parts) throw new Error("Unexpected response");

      let imageBuffer: Buffer | null = null;

      for (const part of parts) {
        if (part.inlineData)
          imageBuffer = Buffer.from(part.inlineData.data, "base64");
      }

      // Upload directly from memory buffer to Cloudinary
      const uploadRes = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "thumbnails",
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );
        stream.end(imageBuffer);
      });

      thumbnail.imageUrl = uploadRes.secure_url;
      thumbnail.isGenerating = false;

      await thumbnail.save();

      return res.status(201).json({
        success: true,
        data: thumbnail,
      });

      // const fileName = `final-output-${Date.now()}.png`;
      // const filePath = path.join("images", fileName);

      // fs.mkdirSync("images", { recursive: true });
      // fs.writeFileSync(filePath, finalBuffer!);

      // const uploadRes = await cloudinary.uploader.upload(filePath, {
      //   resource_type: "image",
      // });

      // thumbnail.imageUrl = uploadRes.url;
      // thumbnail.isGenerating = false;

      // await thumbnail.save();
      // res.json({ success: true, data: thumbnail });
      // fs.unlinkSync(filePath);
    } catch (error) {
      console.error(error);

      if (thumbnail) {
        thumbnail.isGenerating = false;
        await thumbnail.save();
      }
      return res
        .status(500)
        .json({ success: false, message: (error as Error).message });
    }
  },
);

router.get(
  "/user/thumbnails",
  userAuth,
  async (req: Request, res: Response) => {
    try {
      const userId = req.user._id;
      let page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = 15;
      const skip = (page - 1) * limit;

      const [userThumbnails, totalDoc] = await Promise.all([
        await Thumbnail.find({ userId })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        Thumbnail.countDocuments({ userId }),
      ]);
      const totalPages = Math.ceil(totalDoc / limit);

      const hasMore = page < totalPages;

      res.json({
        success: true,
        data: userThumbnails,
        hasMore: hasMore,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: (error as Error).message });
    }
  },
);

router.delete(
  "/user/thumbnail/delete/:thumbId",
  userAuth,
  async (req: Request, res: Response) => {
    try {
      const { thumbId } = req.params;
      await Thumbnail.findOneAndDelete({ _id: thumbId, userId: req.user._id });

      res.json({ success: true, message: "Thumbnail successfully deleted." });
    } catch (error) {
      res.json({ success: false, message: (error as Error).message });
    }
  },
);

export default router;
