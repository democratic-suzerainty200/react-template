// This file makes Firestore easier to use with hooks.

import { useDocument } from "react-firebase-hooks/firestore"
import { doc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export function useFirestore(...path: [string, string, ...string[]]) {
  const [value, loading, error] = useDocument(doc(db, ...path))
  return { value, loading, error }
}
