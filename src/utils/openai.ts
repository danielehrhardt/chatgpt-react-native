import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const openai = axios.create({
  baseURL: "https://api.openai.com/v1/completions",
});

export const getChatReply = async (message: string): Promise<string> => {
  const apiKey = await AsyncStorage.getItem("OPENAI_API_KEY");
  if (!apiKey) {
    throw new Error("API key not found");
  }

  const prompt = `User: ${message}\nAI:`;
  const data = {
    prompt,
    model: "text-davinci-003",
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  try {
    const response = await openai.post("", data, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error fetching AI reply:", error);
    return "Error fetching AI reply.";
  }
};
