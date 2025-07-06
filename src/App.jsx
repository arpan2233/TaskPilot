import React, { useState } from "react";
import { BrowserRouter,  Navigate,  Route, Routes} from "react-router-dom";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import Register from "./Register";
import Dashboard from "./Dashboard";
import ProtectedRoutes from "./utils/ProtectedRoutes";


function App(){
    const [userdetails, setUserDetails] = useState({});
    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/login" element={<LoginPage getDetails={setUserDetails}/>} />
            <Route path="/register" element={<Register getDetails={setUserDetails}/>} />
            <Route element={<ProtectedRoutes uid={userdetails.uid}/>}>
                <Route path="/dashboard" element={<Dashboard ud={userdetails}/>} /> 
            </Route>
         </Routes>
    </BrowserRouter>);
};
export default App;