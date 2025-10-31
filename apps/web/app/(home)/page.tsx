import { AlertDialogDemo } from "@/components/alert-dialog-demo";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="text-center">
        <h1 className="text-6xl mb-4">Hello World</h1>
        <div className="flex gap-3 justify-center">
          <AlertDialogDemo className="cursor-pointer">
            Click here
          </AlertDialogDemo>
        </div>
      </div>
    </div>
  );
}
