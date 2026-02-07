"use client";

import { deleteThread, deletePost, togglePin } from "@/actions/forum";

interface AdminActionsProps {
  threadId?: string;
  postId?: string;
  monthId: string;
  isPinned?: boolean;
}

export default function AdminActions({
  threadId,
  postId,
  monthId,
  isPinned,
}: AdminActionsProps) {
  const isThread = !!threadId && !postId;

  return (
    <div className="flex items-center gap-2">
      {isThread && (
        <button
          onClick={() => togglePin(threadId, monthId)}
          className="text-xs px-2.5 py-1 rounded-lg bg-cream-dark text-slate-body hover:bg-amber hover:text-white transition-colors"
        >
          {isPinned ? "Unpin" : "Pin"}
        </button>
      )}
      <button
        onClick={() => {
          if (!confirm("Are you sure you want to delete this?")) return;
          if (postId && threadId) {
            deletePost(postId, monthId, threadId);
          } else if (threadId) {
            deleteThread(threadId, monthId);
          }
        }}
        className="text-xs px-2.5 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
      >
        Delete
      </button>
    </div>
  );
}
