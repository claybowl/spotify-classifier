
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { AnalysisResult, TrackData } from "../types";

export const analyzeMusicTaste = async (tracks: TrackData[]): Promise<AnalysisResult> => {
  const apiKey = (import.meta.env.VITE_GEMINI_API_KEY || (window as any).GEMINI_API_KEY) as string;
  
  if (!apiKey) {
    throw new Error("API key not configured. Please set VITE_GEMINI_API_KEY in your .env file.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Sample tracks to provide context
  const sampledTracks = tracks.slice(0, 60).map(t => `${t.artistName} - ${t.trackName}`).join(", ");

  const prompt = `Perform an advanced musical taste classification and psychological profile analysis based on these tracks: [${sampledTracks}]. 
  
  Return a JSON object containing:
  1. classification: A bold, 2-3 word name for this taste profile.
  2. summary: A 3-4 sentence interesting and informative analysis of the user's personality based on their music.
  3. genres: An array of the top 5 genres identified with percentages (total 100).
  4. moods: An array of 4 mood metrics (e.g., Energetic, Melancholic, Chill, Intense) with values 0-100.
  5. vibeKeywords: 5 unique keywords describing the aesthetic.
  6. complexityScore: A number 0-100 representing musical diversity.
  7. uniquenessScore: A number 0-100 representing how rare the taste is.`;

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          classification: { type: SchemaType.STRING },
          summary: { type: SchemaType.STRING },
          genres: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                name: { type: SchemaType.STRING },
                percentage: { type: SchemaType.NUMBER }
              },
              required: ["name", "percentage"]
            }
          },
          moods: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                label: { type: SchemaType.STRING },
                value: { type: SchemaType.NUMBER }
              },
              required: ["label", "value"]
            }
          },
          vibeKeywords: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING }
          },
          complexityScore: { type: SchemaType.NUMBER },
          uniquenessScore: { type: SchemaType.NUMBER }
        },
        required: ["classification", "summary", "genres", "moods", "vibeKeywords", "complexityScore", "uniquenessScore"],
      },
    },
  });

  const result = await model.generateContent(prompt);
  
  try {
    const text = result.response.text();
    return JSON.parse(text.trim()) as AnalysisResult;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Unable to decode the musical patterns. Please try a different data slice.");
  }
};
