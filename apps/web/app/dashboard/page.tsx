import { AlertDialogDemo } from "@/components/demo/alert-dialog-demo";
import { ChartAreaInteractive } from "@/components/molecules";
import { AppBreadcrumb } from "@/components/organism";

export default function Home() {
  return (
    <div className="space-y-6 px-4 py-5">
      <AppBreadcrumb
        items={[
          {
            name: "Dashboard",
          },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <ChartAreaInteractive />

        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/40 bg-muted/10 p-6 text-center sm:p-10">
          <h1 className="text-3xl font-semibold sm:text-4xl">Hello World</h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Dashboard content goes here. Explore the chart or trigger the dialog
            action.
          </p>
          <AlertDialogDemo className="mt-6 cursor-pointer">
            Click here
          </AlertDialogDemo>
        </div>
      </div>
    </div>
  );
}
