import React, {useState} from "react";
function MemberCompletedTaskDisplay(props){
    // props: heading, list, uid(of user whose data is being changed ), setDisplayTask

    const [deleted, setDeleted] = useState([]);
    function handleDelete(key){
        setDeleted(prev => [...prev,key]);
        props.setMembersListTaskDisplay(props.list.filter(element =>element.task_key !== key));
    }
    function handleCross(){
        props.handle_Edit_Add_Delete(props.uid,[],[],deleted, "completed");
        props.setDisplayTask(false);
    }
    
    return <div className="MemberCompletedTaskDisplay-div TaskDisplay-div">
        <div className="MemberCompletedTaskDisplay-top-panel TaskDisplay-top-panel">
            <h4>{props.heading}</h4>
            <button onClick={()=>handleCross()}><img src="https://img.icons8.com/?size=50&id=3062&format=png" alt="cross icon" /></button>
        </div>
        <hr />
        <div className="MemberCompletedTaskDisplay-bottom-panel TaskDisplay-bottom-panel">
            <ul>
                {props.list.map(element => {
                    return <li className="MemberCompletedTaskDisplay-list TaskDisplay-list" >
                        <p>{element.tasks}</p>
                        <button onClick={() => handleDelete(element.task_key)}><img src="https://img.icons8.com/?size=80&id=G01ACMKXfdpJ&format=png" alt="delete icon" /></button>
                        </li>
                })}
            </ul>
        </div>
    </div>
}
export default MemberCompletedTaskDisplay;
