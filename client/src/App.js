import Auth from "./features/Auth";
import { Routes, Route } from "react-router-dom";
import Test from "./test";
import SignInPage from "./features/Auth/Pages/SignInPage";
import SignUpPage from "./features/Auth/Pages/SignUpPage";

function App() {
  return (
    <div className="App h-screen">
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
