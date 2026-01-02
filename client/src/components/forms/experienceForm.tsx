import { Plus, Trash2 } from "lucide-react";

type Props = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export default function ExperienceForm({ isOpen, setOpen }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      {/* Modal box */}
      <div
        className="w-[500px] rounded-2xl bg-[#1d293d] border-2 border-[#892e6b]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center p-4 border-b bg-[#312c4a] rounded-t-2xl">
          <h2 className="text-left text-l font-bold text-white ">
            Add Experience
          </h2>
        </div>
        <div className="p-4 m-1">
          <form
            method="post"
            aria-labelledby="work-experience-heading"
            className="space-y-6"
          >
            {/* Row 1: Job Title + Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="jobTitle"
                  className="block text-sm font-medium mb-1"
                >
                  Job Title *
                </label>
                <input
                  id="jobTitle"
                  name="jobTitle"
                  required
                  placeholder="Software Engineer"
                  className="w-full rounded-md bg-[#27354a] border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e7099d]"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium mb-1"
                >
                  Company *
                </label>
                <input
                  id="company"
                  name="company"
                  required
                  placeholder="Google"
                  className="w-full rounded-md bg-[#27354a] border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e7099d]"
                />
              </div>
            </div>

            {/* Row 2: Location + Dates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium mb-1"
                >
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  placeholder="Bengaluru, India"
                  className="w-full rounded-md bg-[#27354a] border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e7099d]"
                />
              </div>

              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium mb-1"
                >
                  Start Date
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="month"
                  className="w-full rounded-md bg-[#27354a] border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#e7099d]"
                />
              </div>

              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium mb-1"
                >
                  End Date
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="month"
                  className="w-full rounded-md bg-[#27354a] border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#e7099d]"
                />
              </div>
            </div>

            {/* Bullet Points */}
            <div className="space-y-3 pt-4">
              <label className="block text-sm font-medium">
                Work Description / Bullet Points
              </label>

              {/* One bullet row (repeat later via map) */}
              <div className="flex items-start gap-3">
                <textarea
                  placeholder="Built scalable backend APIs using Node.js and PostgreSQL"
                  className="flex-1 rounded-md bg-[#27354a] border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e7099d] resize-none min-h-30"
                />

                {/* Delete bullet */}
                <button
                  type="button"
                  className="mt-1 p-2 rounded-md text-red-500 hover:text-white hover:bg-red-500 transition"
                  aria-label="Delete bullet"
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
