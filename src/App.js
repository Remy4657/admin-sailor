import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import './components/main.css'
import Sidebar from "./components/Sidebar";
import Blog from "./pages/Blog/Blog";
import Category from "./pages/Category/Category";
import Order from "./pages/Order/Order";
import Login from "./pages/Login/Login";
import Register from "./pages/Logout/Register";
import Payment from "./pages/Payment/Payment";
import Shipping from "./pages/Shipping/Shipping";
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Routes className="content">
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/category" element={<Category />} />
        <Route exact path="/payment" element={<Payment />} />
        <Route exact path="/shipping" element={<Shipping />} />
        <Route exact path="/order" element={<Order />} />

      </Routes>
    </div>
  );
}

export default App;
