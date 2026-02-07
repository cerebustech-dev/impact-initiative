"use client";

import { useActionState } from "react";
import { createThread } from "@/actions/forum";

interface NewThreadFormProps {
  monthId: string;
}

export default function NewThreadForm({ monthId }: NewThreadFormProps) {
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return createThread(formData);
    },
    null
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="monthId" value={monthId} />

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-body mb-1.5">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          maxLength={200}
          placeholder="What do you want to discuss?"
          className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-white text-slate-heading placeholder:text-slate-muted focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-colors"
        />
      </div>

      <div>
        <label htmlFor="body" className="block text-sm font-medium text-slate-body mb-1.5">
          Body
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={6}
          placeholder="Share your thoughts..."
          className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-white text-slate-heading placeholder:text-slate-muted focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-colors resize-y"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
          {state.error}
        </p>
      )}

      <div className="flex gap-3 justify-end">
        <a
          href={`/discuss/${monthId}`}
          className="px-5 py-2.5 text-sm font-medium text-slate-body hover:text-slate-heading transition-colors"
        >
          Cancel
        </a>
        <button
          type="submit"
          disabled={pending}
          className="px-6 py-2.5 bg-amber text-white font-semibold rounded-xl hover:bg-amber-dark transition-colors shadow-lg shadow-amber/20 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? "Posting..." : "Post Thread"}
        </button>
      </div>
    </form>
  );
}
