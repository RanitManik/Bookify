import { Navigation } from "@/components/navigation.jsx";
import Background from "@/components/background.jsx";
import { useFirebase } from "../context/firebase.jsx";

const Home = () => {
  const { user } = useFirebase();

  return (
    <Background>
      <Navigation />
      <div className="grid animate-pulse place-items-center content-start gap-6">
        {user && user.photoURL && (
          <img
            className="rounded-full"
            src={user.photoURL}
            alt={`${user.displayName}'s profile`}
          />
        )}
        <h1 className="text-center text-5xl">
          Welcome, {user ? user.displayName : "Guest"}
        </h1>
      </div>
    </Background>
  );
};

export default Home;
