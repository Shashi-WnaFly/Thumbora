import Together from "together-ai";

const ai = new Together({
  apiKey: process.env.TOGETHER_API_KEY as string,
});

// export const generateConfig = ({
//   aspectRatio,
// }: {
//   aspectRatio: IAspectRatio;
// }) => {
//   const generatingConfig: GenerateContentConfig = {
//     maxOutputTokens: 32768,
//     temperature: 1,
//     topP: 0.95,
//     responseModalities: ["Image"],
//     imageConfig: {
//       aspectRatio: (aspectRatio as IAspectRatio) || "16:9",
//       imageSize: "1K",
//     },
//     safetySettings: [
//       {
//         category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//         threshold: HarmBlockThreshold.OFF,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//         threshold: HarmBlockThreshold.OFF,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//         threshold: HarmBlockThreshold.OFF,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//         threshold: HarmBlockThreshold.OFF,
//       },
//     ],
//   };
//   return generatingConfig;
// };

export default ai;
