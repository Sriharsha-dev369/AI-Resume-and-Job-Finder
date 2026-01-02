type Props = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export default function CertificationForm({ isOpen, setOpen }: Props) {
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
            Add Certification
          </h2>
        </div>
        <div className="p-4 m-1">
          <form
            method="post"
            aria-labelledby="certification-info-heading"
            className="space-y-4"
          >
            {/* Certification Name */}
            <div>
              <label htmlFor="certName" className="block text-sm font-medium">
                Certification Name *
              </label>
              <input
                id="certName"
                name="certName"
                type="text"
                required
                placeholder="AWS Certified Solutions Architect"
                className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
              />
            </div>

            {/* Issuing Organization */}
            <div>
              <label htmlFor="issuingOrg" className="block text-sm font-medium">
                Issuing Organization *
              </label>
              <input
                id="issuingOrg"
                name="issuingOrg"
                type="text"
                required
                placeholder="Amazon Web Services"
                className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dateObtained" className="block text-sm font-medium">
                  Date Obtained *
                </label>
                <input
                  id="dateObtained"
                  name="dateObtained"
                  type="month"
                  required
                  className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
                />
              </div>

              <div>
                <label htmlFor="expirationDate" className="block text-sm font-medium">
                  Expiration Date (Optional)
                </label>
                <input
                  id="expirationDate"
                  name="expirationDate"
                  type="month"
                  className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
                />
              </div>
            </div>

            {/* Credential ID */}
            <div>
              <label htmlFor="credentialId" className="block text-sm font-medium">
                Credential ID (Optional)
              </label>
              <input
                id="credentialId"
                name="credentialId"
                type="text"
                placeholder="ABC-1234-XYZ"
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
