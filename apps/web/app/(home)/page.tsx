import { AlertDialogDemo } from "@/components/demo/alert-dialog-demo";
import { AppBreadcrumb } from "@/components/molecules";

export default function Home() {
  return (
    <>
      <div className="py-5 px-4">
        <AppBreadcrumb
          items={[
            {
              name: "Home",
              href: "/",
            },
            {
              name: "Dashboard",
            },
          ]}
        />
      </div>
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
    </>
  );
}
