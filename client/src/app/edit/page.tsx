import FormStepper from "@/components/FormStepper";
import Navbar from "@/components/Navbar";

export default function Editpage() {
  return (
    <div>
      <Navbar />
      <div className="flex w-screen h-screen">
        <FormStepper />
      </div>
    </div>
  );
}
