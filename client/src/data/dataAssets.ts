import img_1 from "../../public/assets/Excited_duo_promoting_design_tool.png";

export const AspectRatios = ["16:9", "1:1", "9:16"] as const;
export type IAspectRatio = (typeof AspectRatios)[number];

export const ThumbnailStyles = [
  "Bold & Graphic",
  "Minimalistic",
  "Realistic",
  "Illustrated",
  "Tech/Futuristic",
] as const;
export type IThumbnailStyle = (typeof ThumbnailStyles)[number];

export const ColorSchemes = [
  { id: "vibrant", name: "Vibrant", colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"] },
  { id: "sunset", name: "Sunset", colors: ["#FF8C42", "#FF3C38", "#A23B72"] },
  { id: "ocean", name: "Ocean", colors: ["#0077B6", "#00B4D8", "#90E0EF"] },
  { id: "forest", name: "Forest", colors: ["#2D6A4F", "#40916C", "#95D5B2"] },
  {
    id: "purple",
    name: "Purple Dream",
    colors: ["#7B2CBF", "#9D4EDD", "#C77DFF"],
  },
  {
    id: "monochrome",
    name: "Monochrome",
    colors: ["#212529", "#495057", "#ADB5BD"],
  },
  { id: "neon", name: "Neon", colors: ["#FF00FF", "#00FFFF", "#FFFF00"] },
  { id: "pastel", name: "Pastel", colors: ["#FFB5A7", "#FCD5CE", "#F8EDEB"] },
] as const;
export type IColorScheme = (typeof ColorSchemes)[number];

export interface IThumbnail {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  style:
    | "Bold & Graphic"
    | "Tech/Futuristic"
    | "Minimalist"
    | "Photorealistic"
    | "Illustrated";
  aspect_ratio?: "16:9" | "1:1" | "9:16";
  color_scheme?:
    | "vibrant"
    | "sunset"
    | "forest"
    | "neon"
    | "purple"
    | "monochrome"
    | "ocean"
    | "pastel";
  text_overlay?: boolean;
  image_url?: string;
  prompt_used?: string;
  user_prompt?: string;
  isGenerating?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const demoThumbnail = [
  {
    _id: "69451d5bc9ea67e4c930f698",
    userId: "6942b3bd2a93a220baa331b3",
    title: "Learn How to make 100k in 10 days",
    style: "Bold & Graphic",
    aspect_ratio: "16:9",
    color_scheme: "vibrant",
    text_overlay: true,
    image_url: img_1,
    prompt_used: "add cash images graph and etc",
    user_prompt: "add cash images graph and etc",
    isGenerating: false,
    createdAt: "2025-12-19T09:39:39.971Z",
    updatedAt: "2025-12-19T09:40:05.084Z",
    _v: 0,
  },
];
