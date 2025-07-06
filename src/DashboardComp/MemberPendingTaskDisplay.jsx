import React, { useState } from "react";
function MemberPendingTaskDisplay(props){
    // props: heading, list, uid(of user whose data is being changed ), setDisplayTask

    const [editedTask, setEditedTask] = useState([]);
    const [deleted, setDeleted] = useState([]);
    const [makeInput, setMakeInput] = useState(false); 
    const [currentValue,setCurrentValue] = useState("");
    const [added,setAdded] = useState([]);
    const [enterNewTask, setEnterNewTask] = useState(false);
    const [key, setKey] = useState(-1);
    const [completed,setCompleted] = useState([]);

    function handleSave(key){
        if(editedTask.some(el => (el.task_key === key))){  
            setEditedTask(prev =>{
                prev.filter(element => element.task_key !== key);
            })
        }

        setEditedTask(prev => [...prev,{task_key: key, tasks: currentValue}]);
        setMakeInput(false);
        props.setMembersListTaskDisplay(prev => 
            prev.map(element => {
                if(element.task_key === key){
                    return {task_key: key, tasks: currentValue};
                }else return element
            })
        );
        setKey(-1);
    }
    function handleDelete(k){
        setDeleted(prev => [...prev,k]);
        props.setMembersListTaskDisplay(prev => prev.filter(element => element.task_key !== k));
    }

    function handleCross(){
        props.handle_Edit_Add_Delete(props.uid ,editedTask, added, deleted, "pending");
        props.handle_Edit_Add_Delete(props.uid ,[], completed,[], "completed");
        props.setDisplayTask(false);
    }

    
    return <div className="TaskDisplay-div MemberPendingTaskDisplay-div">
        <div className="MemberPendingTaskDisplay-top-panel TaskDisplay-top-panel">
            <div className="left-part">
                <h4>{props.heading}</h4>
                <button onClick={()=>{
                    setEnterNewTask(true)
                    setCurrentValue("");
                }}> <img src="https://img.icons8.com/?size=50&id=24717&format=png" alt="add icon" /> </button>
            </div>
            <div className="right-part">
                <button onClick={()=>handleCross()}><img src="https://img.icons8.com/?size=50&id=3062&format=png" alt="cross icon" /></button>
            </div>
            
        </div>
        <hr />
        <div className="MemberPendingTaskDisplay-bottom-panel TaskDisplay-bottom-panel">
            <ul>
                {props.list.map(element => {
                    if(makeInput && (key === element.task_key)){
                        return <li className="MemberPendingTaskDisplay-list TaskDisplay-list" >
                            <div className="edit-input">
                                <input type="text" value={currentValue} onChange={(e)=>setCurrentValue(e.target.value)}/>
                                <button onClick={()=>handleSave(key)}>Save</button>
                            </div>
                        </li>
                    } else {
                        return <li className="MemberPendingTaskDisplay-list TaskDisplay-list" >
                            <div className="content">
                                <p>{element.tasks}</p>
                            </div>
                            <div className="buttons">
                                {/* completed  start */}
                                <button className="mark-as-complete" onClick={async ()=>{
                                    const result = await fetch("https://taskpilot-backend-7wni.onrender.com/addCompletedTask", {
                                    method: "post",
                                    headers: {
                                            "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        uid: props.uid,
                                        tasks: element.tasks
                                    })
                                }).then(res => res.json()).catch(err => console.error(err))
                                setCompleted(prev => [...prev,{task_key: result[0].task_key, tasks: element.tasks}]);
                                setDeleted(prev => [...prev,element.task_key]);
                                props.setMembersListTaskDisplay(prev => prev.filter(e => e.task_key !== element.task_key));

                                }}>Completed</button>
                                {/* competed end */}
                                <button onClick={()=>{
                                setMakeInput(true);
                                setCurrentValue(element.tasks);
                                setKey(element.task_key);
                                }}>
                                <img src="https://img.icons8.com/?size=48&id=2ZghfySe3UcN&format=png" alt="edit icon" />
                                </button>
                                <button onClick={() => handleDelete(element.task_key)}>
                                    <img src="https://img.icons8.com/?size=80&id=G01ACMKXfdpJ&format=png" alt="delete icon" />
                                </button>
                            </div>
                            </li>
                    }
                })}
                {enterNewTask && <li className="add-new-task">
                        <input type="text" value={currentValue} onChange={(e)=>setCurrentValue(e.target.value)}/>
                        <button  onClick={async ()=>{
                            const result = await fetch("https://taskpilot-backend-7wni.onrender.com/addPendingTask", {
                                method: "post",
                                headers: {
                                        "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    uid: props.uid,
                                    tasks: currentValue
                                })
                            }).then(res => res.json()).catch(err => console.error(err))
                            props.setMembersListTaskDisplay(prev => [...prev,{task_key: result[0].task_key, tasks: currentValue}]);
                            // setEditedTask(prev => [...prev,{task_key: result[0].task_key, tasks: currentValue}]);
                            setEnterNewTask(false);
                            setAdded(prev => [...prev,{task_key: result[0].task_key, tasks: currentValue}])
                            }}>Save</button>
                    </li>}
            </ul>
        </div>
    </div>
}
export default MemberPendingTaskDisplay;
{/* <div className="TaskDisplay-div">
        <div className="TaskDisplay-top-panel">
            <h4>{props.heading}</h4>
            <button onClick={()=>props.setDisplayTask(false)}><img src="https://img.icons8.com/?size=50&id=3062&format=png" alt="cross icon" ></img></button>
        </div>
        <hr />
        <div className="TaskDisplay-bottom-panel">
            <ul>
                {props.list.map(element => {
                    return <li className="TaskDisplay-list" >
                        <p>{element}</p>
                        <button><img src="https://img.icons8.com/?size=80&id=G01ACMKXfdpJ&format=png" alt="delete icon" /></button>
                        </li>
                })}
            </ul>
        </div>
    </div> */}