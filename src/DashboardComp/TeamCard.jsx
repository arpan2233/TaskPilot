import React from "react";
function TeamCard(props){
    return <div className="TeamCard-div">
        <div className="TeamCard-top-panel">
            <h4>{props.username}</h4>
            <div className="TeamCard-top-panel-right-section">
                <p>{props.position}</p>
                <button onClick={async () =>{
                    const result = await fetch("https://taskpilot-backend-7wni.onrender.com/removeTeamMember", {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            uid: props.uid,
                        })
                    }).then(res => res.json()).catch(err => console.error(err));
                    props.reporterRemoved(props.uid);
                }}>
                    <img src="https://img.icons8.com/?size=80&id=G01ACMKXfdpJ&format=png" alt="delete icon" />
                </button>
            </div>
        </div>
        <hr />
        <div className="TeamCard-bottom-panel">
            <p>Tasks</p>
            <div className="TeamCard-buttons">
                <button onClick={()=>props.setDetails(props.uid,"Completed Tasks", props.completed_tasks)}>Completed</button>
                <button onClick={()=>props.setDetails(props.uid,"Pending Tasks", props.pending_tasks)}>Pending</button>
            </div>
        </div>
    </div>
}
export default TeamCard;