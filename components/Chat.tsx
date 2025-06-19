
"use client";

import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader2Icon } from "lucide-react";
// import ChatMessage from "./ChatMessage";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { console } from "inspector";
// import { askQuestion } from "@/actions/askQuestion";
// import ChatMessage from "./ChatMessage";
// import { useToast } from "./ui/use-toast";

export type Message = {
    id?: string;
    role: "human" | "ai" | "placeholder";
    message: string;
    createdAt: Date;
  };

function Chat({ id }: { id: string }) {
    const {user} = useUser();

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isPending, startTransition] = useTransition();

    const handleSumbit = async (e:FormEvent)=>{
        e.preventDefault()
       
        const q= input
        
        setInput("");

    // Optimistic UI update
    setMessages((prev) => [
        ...prev,
        {
          role: "human",
          message: q,
          createdAt: new Date(),
        },
        {
          role: "ai",
          message: "Thinking...",
          createdAt: new Date(),
        },
      ]);
      
       

    }

  return (
    <div className="flex flex-col h-full overflow-scroll">
        {/* chat contenet */}
        <div className="flex-1 w-full">
            {/* chat messages */}
        </div>

  <form
  onSubmit={handleSumbit}
  className="flex sticky bottom-0 space-x-2 p-5 bg-indigo-600/75"
  >
    <Input
    placeholder="Ask a Question..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
    className="bg-white "
  />
  <Button type="submit" disabled={!input || isPending} >
  {isPending ? (
            <Loader2Icon className="animate-spin text-indigo-600" />
          ) : (
            "Ask"
          )}
  </Button>
  </form>


    </div>
  )
}

export default Chat