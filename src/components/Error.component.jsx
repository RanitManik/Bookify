import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";
import { House } from "lucide-react";

export const ErrorComponent = () => {
  const navigate = useNavigate();
  return (
    <main className="grid min-h-[100svh] place-items-center content-center items-center gap-6 p-8">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        404 | Page Not Found
      </h1>
      <Button onClick={() => navigate("/")}>
        <House className="mr-2 h-4 w-4" />
        Go to Home
      </Button>
    </main>
  );
};
