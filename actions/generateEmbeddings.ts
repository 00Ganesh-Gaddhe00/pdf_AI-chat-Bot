
"use server";

import { generateEmbeddingsInPineconeVectorStore } from "@/lib/langchain";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";



export async function generateEmbeddings(docId: string) {
    try {
      const { userId } = await auth();
      if (!userId) throw new Error("Unauthorized");
  
      await generateEmbeddingsInPineconeVectorStore(docId);
      await revalidatePath("/dashboard");
  
      return { completed: true };
    } catch (err) {
      console.error("generateEmbeddings error:", err);
      throw err;
    }
  }