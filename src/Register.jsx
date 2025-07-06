import React from "react";
import "../CSSFILES/Register.css"
function Register(){
    return <section className="register-section"> 
        <div className="register-container">
            <div className="register-image">
                <img src="https://img.freepik.com/free-vector/cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37328.jpg?semt=ais_hybrid&w=740" alt="Register Illustration"/>
            </div>
            <div className="register-content">
                <h2>Register</h2>
                <form className="registration-form" action="https://taskpilot-backend-7wni.onrender.com/register" method="post">
                <div className="register-top-fields">
                    <div>
                        <label htmlFor="position">Position</label>
                        <select id="position" name="position" required>
                        <option value="" disabled selected>Select your role</option>
                        <option value="Manager">Manager</option>
                        <option value="HR">HR</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="username">User Name</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div>
                        <label htmlFor="organisation">Organisation</label>
                        <select className="org-name" name="organisation" required >
                        <option value="" disabled selected>Select your Organisation</option>
                        <option value="Organisation 1">Organisation 1</option>
                        <option value="Organisation 2">Organisation 2</option>
                        <option value="Organisation 3">Organisation 3</option>
                        <option value="Organisation 4">Organisation 4</option>
                        <option value="Organisation 5">Organisation 5</option>
                    </select>
                    </div>
                </div>

                <div className="register-split-section">
                    <div className="register-left-side">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />

                        <button type="submit" className="register-btn">Register</button>
                    </div>
                    {/* <div className="register-right-side">
                    <p>or</p>
                    <button type="button" className="register-google-btn">Register with Google</button>
                    </div> */}
                </div>
                </form>

                <div className="register-login-redirect">
                Already have an account? <a href="/Login">Login</a>
                </div>
            </div>
        
        </div>
    </section>
}
export default Register;