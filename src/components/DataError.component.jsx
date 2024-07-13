import { House } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";

export const DataErrorComponent = ({ dataError }) => {
  const navigate = useNavigate();
  return (
    <main className="grid min-h-[80svh] place-items-center content-center items-center gap-6 p-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        404 | {dataError.code}
      </h1>
      <p className="leading-7">{dataError.message}</p>
      <Button onClick={() => navigate("/")}>
        <House className="mr-2 h-4 w-4" />
        Go to Home
      </Button>
    </main>
  );
};
