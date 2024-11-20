import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { LandingPage } from "./components/LandingPage";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { UserContextProvider } from "./UserContext/contextProvider";
import { NewPost } from "./components/CreateBlog";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <div className="w-svw p-10">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/newPost" element={<NewPost />} />
          </Routes>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
