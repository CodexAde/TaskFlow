import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "AIzaSyB3hzm9RxcBmd3zr32rSFNTuhaQWTOOhUw",
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export async function getAIResponse(req, res, tasks) {
    try {
        // const { prompt } = req.body;
        // const finalPrompt = "Todo data is this " + (prompt || tasks) + " this a todo list app here you will get todos of the persons so you main goal is to provide them wiht the information that they would probly need before doing that task so utilise the data that i am dgiving to you this is basically an todo task so analysize it and maek some suggestin and prerequiste thaty theyshould know before doing that task and what are the precautions that they shoudl take before doing it";
        const finalPrompt = "Todo data is this " + tasks + " this a todo list app here you will get todos of the persons so you main goal is to provide them wiht the information that they would probly need before doing that task so utilise the data that i am dgiving to you this is basically an todo task so analysize it and maek some suggestin and prerequiste thaty theyshould know before doing that task and what are the precautions that they shoudl take before doing it";
        const userId = req.user?._id || req.user?.id;
        const response = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{ role: "user", content: finalPrompt }],
        });
        const aiResponse = response.choices[0].message.content;
        res.json({ "user": userId, "output": aiResponse});
        console.log("Ai response is: ", aiResponse);

    } catch (error) {
        console.error("Error sending AI response:", error);
        res.status(500).json({ error: "Failed to generate AI response." });
    }

} 