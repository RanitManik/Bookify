import { LoaderCircle } from "lucide-react";

export const LoaderCircleComponent = () => {
  return (
    <div className="grid min-h-[min(80svh,_1000px)] place-items-center">
      <LoaderCircle className="h-20 w-20 animate-spin" />
    </div>
  );
};
