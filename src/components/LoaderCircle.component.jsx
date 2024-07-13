import { LoaderCircle } from "lucide-react";

export const LoaderCircleComponent = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <LoaderCircle className="h-20 w-20 animate-spin" />
    </div>
  );
};
