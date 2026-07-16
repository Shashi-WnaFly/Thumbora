import together from "../config/ai.js"
import { IAspectRatio } from "../types/types.js";

export const generateImage = async (aspectRatio: IAspectRatio, prompt: string) => {
  const response = await together.images.generate({
    model: "black-forest-labs/FLUX.1-schnell",
    prompt,
    aspect_ratio: aspectRatio || "16:9",
    steps: 4,
    n: 1,
  });

  return response.data?.[0]?.url;
};