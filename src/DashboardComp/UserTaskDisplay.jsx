import React from "react";
function UserTaskDisplay(props){
    //props: title, list
    return <section className="userTaskDisplay-section">
        <h3>{props.title}</h3>
        <ul>
            {props.tasklist.map(element => <li>{element.tasks}</li>)}
        </ul>
        
    </section>
}
export default UserTaskDisplay;