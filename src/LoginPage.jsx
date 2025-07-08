import React, { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import "../CSSFILES/LoginPage.css"
function LoginPage(props){
    const [showError, setShowError] = useState(false); 
    const emailRef = useRef();
    const passwordRef = useRef();
    const orgRef = useRef();
    const [redirect, setRedirect] = useState(false);  
    async function handleSubmit(e){
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const organisation = orgRef.current.value;
        
        const result = await fetch("https://taskpilot-backend-7wni.onrender.com/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_email: email,
                user_password: password,
                org_name: organisation
            })
        }).then(res => res.json());
        
        if(result.length === 0) {
            setShowError(true);
        }else {
            props.getDetails(result[0]);
            setRedirect(true);
        }
        
        return;
    }

    return <section className="login-section">
        <div className="login-card">
            <div className="login-left">
                <h2>Welcome Back</h2>
                <p>Please log in to access your dashboard.</p>
                {showError && <p style={{color: "red", margin: 0,marginBottom: "2px", padding: 0, fontWeight: "lighter"}}>
                    Email or Password Not Found! Please Try Again or Try to Register</p>}
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="organisation">Organisation</label>
                    <select className="org-name" name="organisation" required ref={orgRef}>
                        <option value="" disabled selected>Select your Organisation</option>
                        <option value="Organisation 1">Organisation 1</option>
                        <option value="Organisation 2">Organisation 2</option>
                        <option value="Organisation 3">Organisation 3</option>
                        <option value="Organisation 4">Organisation 4</option>
                        <option value="Organisation 5">Organisation 5</option>
                    </select>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="you@example.com" name="email" ref={emailRef} required/>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter Your Password" name="password" ref={passwordRef} required/>
                    <button type="submit" className="login-button" >Login</button>
                    {/* <div className="divider">or</div> */}
                    {/* <button type="button" className="google-login">Login with Google</button> */}
                </form>
                <div className="register-redirect">
                    <p>Do not have an account? <a href="/register">Register</a></p>
                </div>
                </div>
                <div className="login-right">
                <img src="https://img.freepik.com/free-vector/cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37328.jpg?semt=ais_hybrid&w=740" alt="Login Illustration"/>
                </div>
            </div>
            {redirect && <Navigate to="/dashboard" />}; 
    </section>
}
export default LoginPage;
