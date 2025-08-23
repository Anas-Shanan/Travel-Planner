export const fetchChatResponse = async (countryName, userInput) => {
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Travel question about ${countryName}: ${userInput}. Format as: Itinerary: [3-day plan]. Suggestions: [general tips].`,
          },
        ],
        max_tokens: 250,
      }),
    });
    if (!response.ok) throw new Error("Failed to fetch AI response");
    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching chat response:", error);
    throw error;
  }
};
