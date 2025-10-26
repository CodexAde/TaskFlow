import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "AIzaSyB3hzm9RxcBmd3zr32rSFNTuhaQWTOOhUw",
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export async function getAIResponse(tasks) {
    if (!tasks || tasks.length === 0) {
        console.log("No tasks received");
        return null;
    }

    try {
        const systemPrompt = `${tasks[0].description} Always answer in english alphabets but in language. Be human and don't write things like object array {} []. Use simple English and sentences should not be technical. Todo data will be given to you by the user in object form. Focus on title and description. This is a todo list app; provide information they need before the task, suggestions, prerequisites, and precautions. Response should not exceed 50 words.`;

        const response = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: JSON.stringify(tasks) }  // Stringify tasks
            ],
        });

        const aiResponse = response.choices[0].message;
        console.log("AI response:", aiResponse);
        return aiResponse.content;  // Return the text content
    } catch (error) {
        console.error("Error sending AI response:", error);
        return { error: error.message };
    }
}
