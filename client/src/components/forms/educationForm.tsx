type Props = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export default function EducationInfoForm({ isOpen, setOpen }: Props) {
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
            Add Education 
          </h2>
        </div>
        <div className="p-4 m-1">
          <form
            method="post"
            aria-labelledby="education-info-heading"
            className="space-y-4"
          >
            {/* School / University */}
            <div>
              <label
                htmlFor="institution"
                className="block text-sm font-medium"
              >
                School / University *
              </label>
              <input
                id="institution"
                name="institution"
                type="text"
                required
                placeholder="Indian Institute of Technology, Delhi"
                className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
              />
            </div>

            {/* Degree + Minor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="degree" className="block text-sm font-medium">
                  Degree *
                </label>
                <input
                  id="degree"
                  name="degree"
                  type="text"
                  required
                  placeholder="B.Tech in Computer Science"
                  className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
                />
              </div>

              <div>
                <label htmlFor="minor" className="block text-sm font-medium">
                  Minor (Optional)
                </label>
                <input
                  id="minor"
                  name="minor"
                  type="text"
                  placeholder="Artificial Intelligence"
                  className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
                />
              </div>
            </div>

            {/* GPA + Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="gpa" className="block text-sm font-medium">
                  GPA (Optional)
                </label>
                <input
                  id="gpa"
                  name="gpa"
                  type="text"
                  placeholder="8.5 / 10"
                  className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Delhi, India"
                  className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium"
                >
                  Start Date
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="month"
                  className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium">
                  Graduation Date
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="month"
                  className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
                />
              </div>
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
