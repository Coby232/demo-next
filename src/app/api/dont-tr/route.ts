// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { setDoc, doc } from "firebase/firestore";
// import { db } from "@/firebase";
// import { NextApiResponse, NextApiRequest } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const { track, step_name, isComplete } = req.body;

//     if (!track || !step_name || typeof isComplete !== "boolean") {
//       return res.status(400).json({ error: "Invalid request body" });
//     }

//     const docRef = doc(db, "track", track);
//     await setDoc(docRef, {
//       track,
//       step_name,
//       isComplete,
//       timestamp: new Date().toISOString(),
//     });

//     res.status(200).json({ message: "Data posted successfully!" });
//   } catch (err) {
//     console.error("Error posting data to Firestore:", err);
//     res.status(500).json({ error: "Failed to post data" });
//   }
// }
