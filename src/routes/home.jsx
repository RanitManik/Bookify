import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/navigation.jsx";
import Background from "@/components/Background.jsx";
import { useFirebase } from "@/context/firebase.jsx";
import BookList from "@/components/BookList.jsx";

const Home = () => {
  const { user } = useFirebase();
  const navigate = useNavigate();


  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <>
      <Navigation />
      <Background>
        <BookList />
      </Background>
    </>
  );
};

export default Home;
