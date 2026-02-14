import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
    try {
        const response = await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4.1-mini",
                input: message
            })
        });

        const data = await response.json();

        console.log("OpenAI Response:", data); // for debugging

        if (!data.output || !data.output[0]?.content[0]?.text) {
            return "AI did not return a valid response.";
        }

        return data.output[0].content[0].text;

    } catch (error) {
        console.log("OpenAI Error:", error);
        return "Something went wrong.";
    }
};

export default getOpenAIAPIResponse;
