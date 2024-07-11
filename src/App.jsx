import { Route, Routes } from "react-router-dom";
import HomeRoute from "@/routes/home.route.jsx";
import RegisterRoute from "@/routes/register.route.jsx";
import LoginRoute from "@/routes/login.route.jsx";
import ListingRoute from "@/routes/listing.route.jsx";
import SupportRoute from "@/routes/support.route.jsx";
import SettingRoute from "@/routes/setting.route.jsx";
import BookDetailRoute from "@/routes/BookDetail.route.jsx";
import OrdersRoute from "@/routes/orders.route.jsx";

function App() {
  return (
    <Routes>
      <Route index element={<HomeRoute />} />
      <Route path="/register" element={<RegisterRoute />} />
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/support" element={<SupportRoute />} />
      <Route path="/setting" element={<SettingRoute />} />
      <Route path="/list" element={<ListingRoute />} />
      <Route path="/orders" element={<OrdersRoute />} />
      <Route path="/book/view/:bookId" element={<BookDetailRoute />} />
    </Routes>
  );
}

export default App;
