import PDFView from "@/components/PDFView";
import { admindb } from "@/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";
import React from "react";

async function chatTofilePage({
  params
}: {
  params: {
    id: string;
  };
}) {

  auth.protect()

  const awaitedParams = await params; // await here

  const { id } = awaitedParams;
  const { userId } = await auth();

  const ref = await admindb
    .collection("users")
    .doc(userId!)
    .collection("files")
    .doc(id)
    .get();

  const url = ref.data()?.downloadURL;
  return (<div className="grid lg:grid-cols-5 h-full overflow-hidden">
  {/* Right */}
  <div className="col-span-5 lg:col-span-2 overflow-y-auto">
    {/* Chat */}
    {/* <Chat id={id} /> */}
  </div>

  {/* Left */}
  <div className="col-span-5 lg:col-span-3 bg-gray-100 border-r-2 lg:border-indigo-600 lg:-order-1 overflow-auto">
    {/* PDFView */}
    <PDFView url={url} />
  </div>
</div>
  )
}

export default chatTofilePage;