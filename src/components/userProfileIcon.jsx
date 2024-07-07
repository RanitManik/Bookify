import { useFirebase } from "@/context/firebase.jsx";

export const UserProfileIcon = (props) => {
  const { user } = useFirebase();

  return <img src={user.photoURL} alt="" {...props} />;
};
