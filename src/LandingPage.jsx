import React, { useState } from "react";
import {useMediaQuery} from 'react-responsive'
import samplevideo from "../resourses/TaskPilot_walkThrough.mp4"
import "../CSSFILES/welcomePage.css"
import { Navigate } from "react-router-dom";
function LandingPage(props){
    const [showAnswer1, setShowAnswer1] = useState(false);
    const [showAnswer2, setShowAnswer2] = useState(false);
    const [showAnswer3, setShowAnswer3] = useState(false);
    const [isShown, setShown] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const isDesktop = useMediaQuery({
        query: '(min-width: 768px)',
    });
    function handleClick(e){
      const item = e.target.closest("li");
      if(item){
        if(item.textContent == "Manager"){
          props.setUserDetails(JSON.parse(import.meta.env.VITE_MANAGER));
        }else if(item.textContent == "HR"){
          props.setUserDetails(JSON.parse(import.meta.env.VITE_HR));
        }else if(item.textContent == "Senior Developer"){
          props.setUserDetails(JSON.parse(import.meta.env.VITE_SENIOR_DEVELOPER));
        } else{
          props.setUserDetails(JSON.parse(import.meta.env.VITE_JUNIOR_DEVELOPER));
        }
      }
      setRedirect(true);
    }
    return <div className="land-page">
      
    <nav>
      <div className="leftsection">
        {/* <video src={samplevideo} width={600}></video> */}
        <img src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png" alt="task graphic" className="hero-image" />
        {isDesktop && <div className="navlinks">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#faqs">FAQs</a>
        </div>}
        
      </div>
      <div className="rightsection">
        <a href="/login"><button>Log In / Register</button></a>
        {!isDesktop && <div className="navbutton">
        {isShown ? 
        <svg onClick={()=>{
          setShown(false);
        }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
        :
        <svg onClick={()=>{
          setShown(true);
        }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>  
      }
        </div>}
      </div>
      
      
    </nav>
      
    {(!isDesktop && isShown)  && <div className="mobilenav">
        <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#faqs">FAQs</a>
      </div>}

    <section className="main-content">
      <div className="left-main-content">
        <h1><span className="highlight">TaskPilot</span></h1>
        <p>Smart task management for teams to assign, manage, and complete tasks with ease.</p>
        <div className="button">
          <a href="/login"><button className="cta-btn">Get Started</button></a>
          <div className="tryTaskPilot">
            {showOptions && 
              <div className="taskpilotOpened">
                <ul onClick={handleClick}> 
                  {/* <p>As</p> */}
                  <li className="list-item">Manager</li>
                  <li className="list-item" >HR</li>
                  <li className="list-item" >Senior Developer</li>
                  <li className="list-item" >Junior Developer</li>
                </ul>
              </div>
            }
            <div className="taskpilotCollapsed">
              <h3>Try TaskPilot As</h3>
              <img src="https://www.svgrepo.com/show/124304/three-dots.svg" alt="Options" onClick={() => {
                showOptions ? setShowOptions(false) : setShowOptions(true);
              }}/>
            </div>
          </div>
        </div>
      </div>
      <div className="right-main-content">
        <div className="enclosing-div">
        <video className="hero-image" autoPlay muted loop>
          <source src={samplevideo} type="video/mp4" />
        </video>
        </div>
      </div>
    </section>

    <section className="about-section" id="about">
      <h2>What is TaskPilot?</h2>
      <div className="about-grid">
        <div className="about-item">
          <h3>🛡️ Secure Access</h3>
          <p>Login/register with your role and organization. Passwords are safely hashed.</p>
        </div>
        <div className="about-item">
          <h3>📋 Task Control</h3>
          <p>View and update pending/completed tasks with dynamic assignment options.</p>
        </div>
        <div className="about-item">
          <h3>👥 Team Management</h3>
          <p>Create teams, assign tasks, and stay in sync across roles like Manager, HR, or Devs.</p>
        </div>
        <div className="about-item">
          <h3>✉️ Easy Communication</h3>
          <p>Email coworkers directly and stay in the loop without switching platforms.</p>
        </div>
      </div>
    </section>

    <section className="join-today">
      <h2>Get Organized. Stay Productive.</h2>
      <p>Built for developers and team leads who want clarity without the clutter.</p>
      <a href="/login"><button className="cta-btn">Start Now</button></a>
    </section>

    <section className="faqs" id="faqs">
      <h2>FAQs</h2>
      <div className="faq-item">
        <button className="faq-question" onClick={()=>showAnswer1 ? setShowAnswer1(false) : setShowAnswer1(true)}>Is TaskPilot free to use?</button>
        {showAnswer1 && <div className="faq-answer">Yes! TaskPilot is completely free for all users.</div>}
      </div>
      <div className="faq-item">
        <button className="faq-question" onClick={()=>showAnswer2 ? setShowAnswer2(false) : setShowAnswer2(true)}>Who can create teams?</button>
        {showAnswer2 && <div className="faq-answer">Only Managers, HRs, and Senior Developers have the ability to create and manage teams.</div>}
      </div>
      <div className="faq-item">
        <button className="faq-question" onClick={()=>showAnswer3 ? setShowAnswer3(false) : setShowAnswer3(true)}>Can I edit my completed tasks?</button>
        {showAnswer3 && <div className="faq-answer">Yes. You can delete or review your completed tasks anytime for clarity.</div>}
      </div>
    </section>

    <section className="footer" id="contact">
      <p >Know the Developer</p>
      <div className="socials">
        <a href="https://www.linkedin.com/in/arpan-rohilla-65991b256/">LinkedIn</a>
        <a style={{color: 'grey'}} href="https://github.com/arpan2233">GitHub</a>
      </div>
        <p>Note!</p>
        <ul>
            <li style={{color: 'white'}}>The version is currently in testing mode, for the same reason organisation names in registration and login are hardcoded. 
            For customisation and personalisation you may contact developer via LinkedIn.</li>
            <li style={{color: 'white'}}>To make Team, members to be added must be registered</li>
            <li style={{color: 'white'}}>Manager has no task assigned and junior developer cannot make a team to guide, for the obvious reasons, yet both can add personal notes</li>
        </ul>

    </section>
    {redirect && <Navigate to={"/dashboard"} />}
  </div>
}
export default LandingPage;
