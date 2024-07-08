import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./Login";
import Layout from "./LayoutComponents/Layout";
import ProtectedRoute from "./Login/ProtectedRoute";
import AuthProvider from "./Login/AuthProvider";
import DynamicPage from "./DynamicPage";

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
          <Route path="/health" element={<DynamicPage name={'Health'} />} />
          <Route path="/customer-experience" element={<DynamicPage name={'CustomerExperience'} />} />
          <Route
            path="/customer-experience/features/:id"
            element={<DynamicPage name={'CXFeature'} />}
          />
          <Route path="/analytics" element={<DynamicPage name={'Analytics'} />} />
          <Route path="/delivery" element={<DynamicPage name={'Delivery'} />} />
          <Route path="/general-assestnet" element={<DynamicPage name={'GeneralAssestnet'} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
