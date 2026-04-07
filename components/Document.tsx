"use client";

import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import byteSize from "byte-size";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { deleteDocument } from "@/actions/deleteDocument";

function Document({
  id,
  name,
  size,
}: {
  id: string;
  name: string;
  size: number;
  downloadUrl: string;
}) {
  const router = useRouter();
  const [isDeleting, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = window.confirm("Are you sure you want to delete this document?");
    if (!confirmed) return;

    startTransition(async () => {
      await deleteDocument(id);
    });
  };

  return (
    <div className="flex flex-col w-64 h-80 rounded-xl bg-white drop-shadow-md justify-between p-4 transition-all transform hover:scale-105 hover:bg-indigo-600 hover:text-white cursor-pointer group relative">
      {isDeleting && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-xl z-10">
          <Loader2Icon className="h-8 w-8 text-indigo-600 animate-spin" />
        </div>
      )}

      <div
        className="flex-1"
        onClick={() => {
          router.push(`/dashboard/files/${id}`);
        }}
      >
        <p className="font-semibold line-clamp-2">{name}</p>
        <p className="text-sm text-gray-500 group-hover:text-indigo-100">
          {byteSize(size).value} KB
        </p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-2 rounded-lg hover:bg-red-100 group-hover:hover:bg-red-500 transition-colors"
        >
          <Trash2Icon className="h-5 w-5 text-red-500 group-hover:text-white" />
        </button>
      </div>
    </div>
  );
}

export default Document;
