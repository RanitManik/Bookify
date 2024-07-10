import { Route, Routes } from "react-router-dom";
import Home from "@/routes/home.jsx";
import Register from "@/routes/register.jsx";
import Login from "@/routes/login.jsx";
import Listing from "@/routes/listing.jsx";
import Support from "@/routes/support.jsx";
import Setting from "@/routes/setting.jsx";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/listing" element={<Listing />} />
      <Route path="/support" element={<Support />} />
      <Route path="/setting" element={<Setting />} />
    </Routes>
  );
}

export default App;
