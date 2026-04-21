const CLAUDE_MODEL = "claude-sonnet-4-6";
const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";

interface ClaudeMessage {
  role: "user" | "assistant";
  content: string;
}

export async function callClaude(messages: ClaudeMessage[], retries = 3): Promise<unknown> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");

  for (let i = 0; i < retries; i++) {
    const response = await fetch(ANTHROPIC_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 1000,
        messages,
      }),
    });

    if (response.ok) return await response.json();

    const err = await response.json();
    if (response.status !== 500 || i === retries - 1) throw err;

    // Exponential backoff before retry
    await new Promise(r => setTimeout(r, 1000 * (i + 1)));
  }
}
