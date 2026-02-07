"use client";

import { useActionState } from "react";
import { createPost } from "@/actions/forum";

interface ReplyFormProps {
  threadId: string;
  monthId: string;
}

export default function ReplyForm({ threadId, monthId }: ReplyFormProps) {
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return createPost(formData);
    },
    null
  );

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="threadId" value={threadId} />
      <input type="hidden" name="monthId" value={monthId} />

      <textarea
        name="body"
        required
        rows={4}
        placeholder="Write a reply..."
        className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-white text-slate-heading placeholder:text-slate-muted focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-colors resize-y"
      />

      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
          {state.error}
        </p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="px-6 py-2.5 bg-amber text-white font-semibold rounded-xl hover:bg-amber-dark transition-colors shadow-lg shadow-amber/20 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? "Posting..." : "Reply"}
        </button>
      </div>
    </form>
  );
}
