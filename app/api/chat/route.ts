import { google } from "@ai-sdk/google"; // 1. Changed import to Google
import { generateText } from "ai"; 
import { getProfileData } from "@/sanity/queries";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // 1. Get the last message the user sent
  const lastUserMessage = messages[messages.length - 1].content;

  // 2. Fetch Data
  const { projects, experience, profile } = await getProfileData();

  // 3. Format Context
  const context = `
    HIDDEN CONTEXT (The user cannot see this, but use it to answer):
    ${profile.aiKnowledge || "No specific hidden knowledge provided."}

    EXPERIENCE:
    ${experience.map((job: any) => `
      - Role: ${job.role} at ${job.company} (${job.startDate} to ${job.isCurrent ? 'Present' : job.endDate})
      - Key Achievements: ${job.description?.join(". ")}
    `).join("\n")}

    PROJECTS:
    ${projects.map((p: any) => `
      - Title: ${p.title}
      - Stack: ${p.tags?.join(", ")}
      - Description: ${p.description?.join(". ")}
    `).join("\n")}
  `;

  const systemPrompt = `
    You are an AI assistant for Nendang Shallom Goshit's portfolio.
    Answer the user's question based ONLY on the context below.
    
    If the answer is found in the "HIDDEN CONTEXT", use it to sound knowledgeable and personal.
    If the answer is not in the context, say "Sorry i'm still learning and don't have that information yet, but NSG is open to chat click the "work with me" button to send your message."
    
    CONTEXT:
    ${context}
  `;

  // 4. Generate a simple text response using Gemini
  const { text } = await generateText({
    model: google("gemini-2.5-flash"), // 2. Switched to Gemini model
    system: systemPrompt,
    prompt: lastUserMessage,
  });

  return Response.json({ role: "assistant", content: text });
}