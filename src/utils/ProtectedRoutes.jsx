import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes(props){
    return (props.uid != undefined) ? <Outlet/> : <Navigate to="/login"/> ;
}
export default ProtectedRoutes;