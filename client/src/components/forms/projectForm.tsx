import { Plus, Trash2 } from "lucide-react";

type Props = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export default function ProjectForm({ isOpen, setOpen }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      {/* Modal box */}
      <div
        className="w-[650px] rounded-2xl bg-[#1d293d] border-2 border-[#892e6b]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center p-4 border-b bg-[#312c4a] rounded-t-2xl">
          <h2 className="text-left text-l font-bold text-white">Add Project</h2>
        </div>

        {/* Body */}
        <div className="p-4 m-1">
          <form method="post" className="space-y-6">
            {/* Row 1: Project Name + Technologies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Project Name *
                </label>
                <input
                  required
                  placeholder="AI Resume Analyzer"
                  className="w-full rounded-md bg-[#27354a] border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e7099d]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Technologies
                </label>
                <input
                  placeholder="Next.js, Node.js, PostgreSQL, OpenAI"
                  className="w-full rounded-md bg-[#27354a] border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e7099d]"
                />
              </div>
            </div>

            {/* Project Link */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Project Link (Optional)
              </label>
              <input
                placeholder="https://github.com/username/project"
                className="w-full rounded-md bg-[#27354a] border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e7099d]"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Date
                </label>
                <input
                  type="month"
                  className="w-full rounded-md bg-[#27354a] border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#e7099d]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  End Date
                </label>
                <input
                  type="month"
                  className="w-full rounded-md bg-[#27354a] border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#e7099d]"
                />
              </div>
            </div>

            {/* Bullet Points */}
            <div className="space-y-3 pt-2">
              <label className="block text-sm font-medium">
                Project Description / Bullet Points
              </label>

              {/* One bullet row (map later) */}
              <div className="flex items-start gap-3">
                <textarea
                  placeholder="Implemented resume parsing and scoring using OpenAI embeddings"
                  className="flex-1 rounded-md bg-[#27354a] border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e7099d] resize-none min-h-[64px]"
                />

                {/* Delete bullet */}
                <button
                  type="button"
                  className="mt-1 p-2 rounded-md  text-red-200 hover:bg-red-500 transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Add bullet */}
              <button
                type="button"
                className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
              >
                <Plus className="w-4 h-4" />
                Add bullet point
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t">
          <button
            className="bg-[#0a0a0f] font-light text-sm text-white py-3 px-4 rounded-md hover:bg-gray-700"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 py-2 bg-[linear-gradient(to_right,#db2777,#9333ea)] hover:bg-[linear-gradient(to_right,#be185d,#7e22ce)] text-white transition px-4 my-3 mx-3 font-medium rounded-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
