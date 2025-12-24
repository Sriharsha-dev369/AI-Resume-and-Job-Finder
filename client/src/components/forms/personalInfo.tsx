type Props = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export default function PersonalInfoForm({ isOpen, setOpen }: Props) {
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
            Add Personal Info
          </h2>
        </div>
        <div className="p-4 m-1">
          <form
            method="post"
            aria-labelledby="personal-info-heading"
            className="space-y-4"
          >
            {/* First + Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium"
                >
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  placeholder="john"
                  className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  placeholder="doe"
                  className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
                />
              </div>
            </div>

            {/* GitHub */}
            <div>
              <label htmlFor="github" className="block text-sm font-medium">
                GitHub link
              </label>
              <input
                id="github"
                name="github"
                type="text"
                inputMode="url"
                autoComplete="username"
                placeholder="github.com/username"
                className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium">
                LinkedIn link
              </label>
              <input
                id="linkedin"
                name="linkedin"
                type="text"
                inputMode="url"
                placeholder="linkedin.com/in/username"
                className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="john@example.com"
                required
                className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="(800) 555-0199"
                inputMode="tel"
                className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
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
