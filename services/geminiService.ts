
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, TrackData } from "../types";

export const analyzeMusicTaste = async (tracks: TrackData[]): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
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

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          classification: { type: Type.STRING },
          summary: { type: Type.STRING },
          genres: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                percentage: { type: Type.NUMBER }
              },
              required: ["name", "percentage"]
            }
          },
          moods: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                value: { type: Type.NUMBER }
              },
              required: ["label", "value"]
            }
          },
          vibeKeywords: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          complexityScore: { type: Type.NUMBER },
          uniquenessScore: { type: Type.NUMBER }
        },
        required: ["classification", "summary", "genres", "moods", "vibeKeywords", "complexityScore", "uniquenessScore"],
      },
    },
  });

  try {
    return JSON.parse(response.text.trim()) as AnalysisResult;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Unable to decode the musical patterns. Please try a different data slice.");
  }
};
