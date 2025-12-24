type Props = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export default function CarrerObjectiveForm({ isOpen, setOpen }: Props) {
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
            Add Career Objective
          </h2>
        </div>
        <div className="p-4 m-1">
          <form
            method="post"
            aria-labelledby="personal-info-heading"
            className="space-y-4"
          >
            <div>
              <label htmlFor="careerObjective" className="block text-sm font-medium mb-1">
                Write a brief career objective statement
              </label>
              <textarea
                id="careerObjective"
                name="careerObjective"
                autoComplete="off"
                required
                placeholder="To obtain a challenging position..."
                className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2 min-h-32"
              />
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
