"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { BotIcon, Loader2Icon } from "lucide-react";
import Markdown from "react-markdown";
import { Message } from "./Chat";

function ChatMessage({ message }: { message: Message }) {
  const isHuman = message.role === "human";
  const { user } = useUser();

  
    return (
        <div className={`flex items-end gap-2 mb-4 ${isHuman ? "justify-end" : "justify-start"}`}>
          {!isHuman && (
            <div className="h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center">
              <BotIcon className="text-white h-6 w-6" />
            </div>
          )}
    
          <div
            className={`max-w-[80%] px-4 py-2 rounded-xl text-sm whitespace-pre-wrap ${
              isHuman
                ? "bg-indigo-500 text-gray-100 rounded-br-none"
                : "bg-gray-600 text-gray-200 rounded-bl-none"
            }`}
          >
            {message.message === "Thinking..." ? (
              <div className="flex items-center justify-center">
                <Loader2Icon
                  className={`animate-spin h-5 w-5 ${isHuman ? "text-white" : "text-gray-200"}`}
                />
              </div>
            ) : (
              <Markdown>{message.message}</Markdown>
            )}
          </div>
    
          {isHuman && (
            <div className="h-10 w-10">
              {user?.imageUrl && (
                <Image
                  src={user.imageUrl}
                  alt="Profile Picture"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
            </div>
          )}
        </div>
      );
}
export default ChatMessage;