'use client';
import { useEffect, useState } from "react";
import {useParams} from "next/navigation";

type Props = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

type PersonalInfo = {
  name: string;
  github: string;
  linkedin: string;
  email: string;
  phone: string;
  website: string;
  address: string;
};

export default function PersonalInfoForm({ isOpen, setOpen }: Props) {
  const [formData, setFormData] = useState<PersonalInfo>({
    name: "",
    github: "",
    linkedin: "",
    email: "",
    phone: "",
    website: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const params = useParams();
  const resumeId = params.resumeId as string;

  // fetch existing data (if resume exists)
  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/resume/${resumeId}/personal-info`,{
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) return; // no existing data

        const data = await res.json();
        setFormData({
          name: data.name ?? "",
          github: data.github ?? "",
          linkedin: data.linkedin ?? "",
          email: data.email ?? "",
          phone: data.phone ?? "",
          website: data.website ?? "",
          address: data.address ?? "",
        });
      } catch (error) {
        console.error("Failed to fetch personal info");
      }
    };

    fetchData();
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`http://localhost:5000/api/resume/${resumeId}/personal-info-update`, {
        method: "PATCH", // backend decides create/update
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      setOpen(false);
    } catch (error: unknown) {
      console.error("Failed to save personal info:", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
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
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Full name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                required
                placeholder="John Doe"
                className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
                placeholder="john@example.com"
                className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="(800) 555-0199"
                className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
              />
            </div>

            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium">
                LinkedIn link
              </label>
              <input
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                type="text"
                placeholder="linkedin.com/in/username"
                className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
              />
            </div>

            <div>
              <label htmlFor="github" className="block text-sm font-medium">
                GitHub link
              </label>
              <input
                id="github"
                name="github"
                value={formData.github}
                onChange={handleChange}
                type="text"
                placeholder="github.com/username"
                className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium">
                Website
              </label>
              <input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                type="text"
                placeholder="yourwebsite.com"
                className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St, City, State"
                rows={3}
                className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-[#e7099d] focus:outline-none focus:ring-2"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end border-t">
          <button
            className="bg-[#0a0a0f] font-light text-sm text-white py-3 px-4 rounded-md hover:bg-gray-700"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 py-2 bg-[linear-gradient(to_right,#db2777,#9333ea)] hover:bg-[linear-gradient(to_right,#be185d,#7e22ce)] text-white transition px-4 my-3 mx-3 font-medium rounded-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}