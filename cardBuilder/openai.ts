import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
});

export async function generateText(systemPrompts: string[], userPrompt: string): Promise<string> {
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [...systemPrompts.map(p => ({
            role: "system",
            content: p
        }) as ChatCompletionMessageParam), {
            role: "user",
            content: userPrompt
        }]
    });

    const maybeText = response.choices[0].message.content;
    if (!maybeText) {
        throw new Error("ChatGPT text generation failed!");
    }

    return maybeText as string;
}