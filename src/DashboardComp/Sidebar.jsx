import React, { useState } from "react";
// import "../../CSSFILES/Sidebar.css"
function Sidebar(props){
    const [showNav, setShowNav] = useState(false);
    return <section className="sidebar-section">
        <div className="sidebar-top-panel">
            <div className="sidebar-top-panel-content">
                <h1>{props.username}</h1>
                <h4>{props.position}</h4>
            </div>
            {!props.isDesktop && 
                <div className="menu-icon">
                    {props.navbarOpened ? 
                        <button onClick={() =>{
                            setShowNav(false);
                            props.setNavbarOpened(false);
                        }}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button> 
                        :   
                        <button onClick={()=> {
                            setShowNav(true);
                            props.setNavbarOpened(true);
                        }}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></button>    
                    }
                </div>
            }
        </div>
        {(props.isDesktop || showNav) && 
            <div className="sidebar-bottom-panel">
                <div className="sidebar-bottom-panel-content">
                    <ul>
                        {props.position != "Junior Developer" && <li onClick={()=>props.display("team")}>Team</li>}
                        <li onClick={()=>props.display("co-workers")}>Co-Workers</li>
                        {props.position != "Manager" && <li> Tasks
                            <ul>
                                <li onClick={()=>props.display("completed")}>Completed</li>
                                <li onClick={()=>props.display("pending")}>Pending</li>
                            </ul>
                        </li>}
                    </ul>
                </div>
            </div>
        }
    </section>
}
export default Sidebar;