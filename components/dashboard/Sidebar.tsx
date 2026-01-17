"use client";

import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, orderBy } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Clock, Shield, BarChart2 } from "lucide-react";

export function Sidebar() {
  const [user] = useAuthState(auth);
  const [snapshot, loading, error] = useCollection(
    user
      ? query(
          collection(db, "users", user.uid, "analyses"),
          orderBy("timestamp", "desc")
        )
      : null
  );

  return (
    <aside className="w-80 border-r border-zinc-200 dark:border-zinc-800 h-[calc(100vh-4rem)] bg-zinc-50/50 dark:bg-zinc-950/50 backdrop-blur-sm hidden lg:block overflow-y-auto">
      <div className="p-6">
        <h3 className="text-xs font-mono font-medium text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Clock className="w-3 h-3" />
            Analysis History
        </h3>

        {loading && (
             <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-zinc-200 dark:bg-zinc-800 rounded-lg"></div>
                ))}
            </div>
        )}

        <div className="space-y-3">
          {snapshot?.docs.map((doc) => {
            const data = doc.data();
            const date = data.timestamp?.toDate();
            const score = data.score || 0;

            return (
              <Link href={`/results/${doc.id}`} key={doc.id} className="block group">
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-brand-teal/50 hover:shadow-sm transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        {data.lensType?.split(" ")[0] || "General"}
                    </span>
                    <span className={`text-xs font-bold ${
                        score < 30 ? "text-rose-500" : score <= 70 ? "text-amber-500" : "text-emerald-500"
                    }`}>
                        {score}/100
                    </span>
                  </div>
                  <p className="text-sm text-zinc-800 dark:text-zinc-200 line-clamp-2 mb-2 font-mono text-xs opacity-80">
                    {data.originalText?.substring(0, 50)}...
                  </p>
                  <div className="text-[10px] text-zinc-400">
                    {date ? date.toLocaleDateString() : "Just now"}
                  </div>
                </div>
              </Link>
            );
          })}

          {snapshot?.empty && (
              <div className="text-center py-8 text-zinc-400 text-sm">
                  No previous analyses found.
              </div>
          )}
        </div>
      </div>
    </aside>
  );
}
