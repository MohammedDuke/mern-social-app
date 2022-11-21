import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "screen/homePage";
import LoginPage from "screen/loginPage";
import ProfilePage from "screen/profilePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/profile/:userId" element={<ProfilePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;