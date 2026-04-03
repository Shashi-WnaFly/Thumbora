export const AspectRatios = ["16:9", "1:1", "9:16"] as const;
export type AspectRatio = (typeof AspectRatios)[number];

export const ThumbnailStyles = ["Bold & Graphic", "Minimalistic", "Realistic", "Illustrated", "Tech/Futuristic"] as const;
export type ThumbnailStyle = (typeof ThumbnailStyles)[number];