import { useFirebase } from "@/context/firebase.context.jsx";
import { CircleUser } from "lucide-react";

export const WelcomeComponent = () => {
  const { user } = useFirebase();
  return (
    <div className="grid place-items-center content-start gap-6">
      {user && user.photoURL ? (
        <img
          className="h-16 w-16 rounded-full bg-muted object-cover object-center"
          src={user.photoURL}
          alt={`${user.displayName}'s profile`}
        />
      ) : (
        <CircleUser className="h-16 w-16 animate-pulse rounded-full bg-muted object-cover object-center" />
      )}
      <h1 className="text-center text-5xl">
        Welcome, {user ? user.displayName : "Guest"}
      </h1>
    </div>
  );
};
