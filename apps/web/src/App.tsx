import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Health from "./pages/Health";
import CustomerExperience from "./pages/CustomerExperience";
import Analytics from "./pages/Analytics";
import Delivery from "./pages/Delivery";
import Login from "./Login";
import Layout from "./LayoutComponents/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/health" element={<Health />} />
          <Route path="/customer-experience" element={<CustomerExperience />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/delivery" element={<Delivery />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
