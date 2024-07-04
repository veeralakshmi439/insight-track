import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Health from "./pages/Health";
import CustomerExperience from "./pages/CustomerExperience";
import Analytics from "./pages/Analytics";
import Delivery from "./pages/Delivery";
import CXFeature from "./pages/CXFeature";
import GeneralAssestnet from "./pages/GeneratlAssestnt";
import Login from "./Login";
import Layout from "./LayoutComponents/Layout";
import ProtectedRoute from "./Login/ProtectedRoute";
import AuthProvider from "./Login/AuthProvider";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthProvider>
              <Login />
            </AuthProvider>
          }
        />
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
          <Route path="/home" element={<Home />}></Route>
          <Route path="/health" element={<Health />} />
          <Route path="/customer-experience" element={<CustomerExperience />} />
          <Route
            path="/customer-experience/features/:id"
            element={<CXFeature />}
          />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/general-assestnet" element={<GeneralAssestnet />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
