"use server";

import { admindb, adminApp } from "@/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";
import { getStorage } from "firebase-admin/storage";
import pineconeClient from "@/lib/pincone";
import { indexName } from "@/lib/langchain";
import { revalidatePath } from "next/cache";

export async function deleteDocument(docId: string) {
  await auth.protect();
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const docRef = admindb.collection("users").doc(userId).collection("files").doc(docId);
  const docSnap = await docRef.get();
  const fileRef = docSnap.data()?.ref;

  // 1. Delete from Firebase Storage
  if (fileRef) {
    const bucket = getStorage(adminApp).bucket(
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    );
    await bucket.file(fileRef).delete().catch(() => {
      // ignore if file doesn't exist
    });
  }

  // 2. Delete chat subcollection
  const chatSnapshot = await docRef.collection("chat").get();
  const batch = admindb.batch();
  chatSnapshot.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();

  // 3. Delete document from Firestore
  await docRef.delete();

  // 4. Delete embeddings from Pinecone
  try {
    const index = pineconeClient.index(indexName);
    await index.namespace(docId).deleteAll();
  } catch {
    // ignore if namespace doesn't exist
  }

  revalidatePath("/dashboard");
}
