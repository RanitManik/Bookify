import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";

export const DataOfflineErrorComponent = ({ dataError }) => {
  return (
    <main className="grid min-h-[min(90svh,_1000px)] place-items-center content-center items-center gap-6 p-8 text-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        408 | {dataError.code}
      </h1>
      <p className="max-w-2xl leading-7">{dataError.message}</p>
      <Button onClick={() => window.location.reload()}>
        <RefreshCcw className="mr-2 h-4 w-4" />
        Try again
      </Button>
    </main>
  );
};
