import React, { Suspense } from "react";
import { Route, Router,Routes } from "react-router-dom";
import UserSettings from "./userSettings";

const AdminContainer = () => {
    return (
        <>
        <Suspense fallback={<p>Loading...</p>}>
                <Routes>
                    <Route path="usersettings" element={<UserSettings />}/>
                </Routes>
        </Suspense>
        
        </>
    );
}

export default AdminContainer;
