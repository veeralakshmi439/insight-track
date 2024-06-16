import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Health from "./pages/Health";
import CustomerExperience from "./pages/CustomerExperience";
import Analytics from "./pages/Analytics";
import Delivery from "./pages/Delivery";
import Login from "./Login";
import Layout from "./LayoutComponents/Layout";
import ProtectedRoute from "./Login/ProtectedRoute";
import AuthProvider from "./Login/AuthProvider";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthProvider><Login /></AuthProvider>} />
        <Route
          path="/"
          element={
            <AuthProvider>
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            </AuthProvider>
          }
        >
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
