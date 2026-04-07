import { LLM } from "@langchain/core/language_models/llms";

interface HuggingFaceLLMInput {
  apiKey: string;
  model: string;
}

export class HuggingFaceLLM extends LLM {
  apiKey: string;
  model: string;

  constructor({ apiKey, model }: HuggingFaceLLMInput) {
    super({});
    this.apiKey = apiKey;
    this.model = model;
  }

  _llmType(): string {
    return "huggingface";
  }

  async _call(prompt: string): Promise<string> {
    const res = await fetch(
      `https://router.huggingface.co/hf-inference/v1/chat/completions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this.model,
          messages: [{ role: "user", content: prompt }],
          max_tokens: 512,
          temperature: 0.7,
        }),
      }
    );

    const text = await res.text();

    if (!res.ok) {
      console.error("HF ERROR:", res.status, text);
      throw new Error(`HF ERROR ${res.status}: ${text}`);
    }

    const data = JSON.parse(text);

    return data.choices?.[0]?.message?.content ?? "";
  }
}