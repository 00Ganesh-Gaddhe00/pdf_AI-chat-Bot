"use server";


import { Message } from "@/components/Chat";
import { admindb } from "@/firebaseAdmin";
import { generateLangchainCompletion } from "@/lib/langchain";
// import { generateLangchainCompletion } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server";

const PRO_LIMIT = 20;
const FREE_LIMIT = 2;

export async function askQuestion (id: string, question: string){
  auth.protect()

  const { userId } = await auth();
  
  const chatRef = admindb
    .collection("users")
    .doc(userId!)
    .collection("files")
    .doc(id)
    .collection("chat");

    // check how many user messages are in the chat
  const chatSnapshot = await chatRef.get();
  const userMessages = chatSnapshot.docs.filter(
    (doc) => doc.data().role === "human"
  );

  const userMessage: Message = {
    role: "human",
    message: question,
    createdAt: new Date(),
  };

  await chatRef.add(userMessage);

  //   Generate AI Response
  const reply = await generateLangchainCompletion(id, question);

  const aiMessage: Message = {
    role: "ai",
    message: reply,
    createdAt: new Date(),
  };

  await chatRef.add(aiMessage);

  return { success: true, message: null };
   

}