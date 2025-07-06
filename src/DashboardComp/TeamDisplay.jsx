import React from "react";
import TeamCard from "./TeamCard";
// import "../../CSSFILES/TeamDisplay.css"
function TeamDisplay(props) {
    // props : uid, setDetails(heading, list), data,setShowAvailable, reporterRemoved
    return <section className="TeamDisplay-section">
        <ul>
            {props.data.map(element =>{
                   return <li> 
                        <TeamCard
                            uid={element.uid}
                            username={element.user_name}
                            position={element.user_position}
                            completed_tasks={element.completed_task}
                            pending_tasks={element.pending_task}
                            setDetails={props.setDetails}
                            reporterRemoved={props.reporterRemoved}
                        />
                    </li>
                })}
        </ul>
        <button onClick={() => props.setShowAvailable(true)}>Add</button>
    </section>
    
}

export default TeamDisplay;