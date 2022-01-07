import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import CatVideos from "./components/Pages/CatVideos";
import NavigationBar from "./components/Layout/NavigationBar";
import VideoUpload from "./components/Pages/VideoUpload";
import { AuthContext } from "./store/auth-context";
import { useAuth } from "./store/auth-hook";
import LoginPage from "./components/Pages/LoginPage";
import HomePage from "./components/Pages/HomePage";

//import './components/UI/Spinner/Spinner.module.css';
function App() {
  const { token, login, logout, userId } = useAuth();
  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <NavigationBar />
        <Routes>
          <Route path="*" element={<h2>Page not found</h2>} />
          <Route path="/cat-videos" element={<CatVideos />} />
          <Route path="/cat-videos/upload" element={<VideoUpload />} />
          <Route exact path="/" element={<Navigate to="/cat-videos" />} />
          <Route exact path="/login" element={<Navigate to="/cat-videos" />} />
        </Routes>
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Routes>
          <Route path="/login" element={<LoginPage></LoginPage>} />
        </Routes>
        <HomePage></HomePage>
      </React.Fragment>
    );
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setShowSpinner(false);
  //   }, 4500);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [showSpinner]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <main>{routes}</main>
    </AuthContext.Provider>
  );
}

export default App;
