import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";

const useRoutes = (isAuthenticated) => {
    if(isAuthenticated) {
        return(
            <Routes>
                <Route path="/list" element={<MainPage />} exact />
                <Route path="*" element={<MainPage />} exact />
            </Routes>
        );
    }

    return(
        <Routes>
            <Route path="/" element={<AuthPage />} exact />
            <Route path="*" element={<AuthPage />} exact />
        </Routes>
    );
}

export default useRoutes;