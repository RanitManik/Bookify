import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";
import { House } from "lucide-react";

export const ErrorComponent = () => {
  const navigate = useNavigate();
  return (
    <main className="grid min-h-[100svh] place-items-center content-center items-center gap-6 p-8 text-center">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        404 | Page Not Found
      </h1>
      <p className="max-w-2xl leading-7">
        Oops! The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable. Please check the URL for any
        mistakes or use the button below to go back to the homepage.
      </p>
      <Button onClick={() => navigate("/")}>
        <House className="mr-2 h-4 w-4" />
        Go to Home
      </Button>
    </main>
  );
};
