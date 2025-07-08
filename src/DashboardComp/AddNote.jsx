import React, { useState } from "react";
function AddNote(props){
    // props: notes, uid(of user whose data is being changed ), setShowNotes, setNotes
    // tasks -> notes
    // task_key -> note_key
    const [editedTask, setEditedTask] = useState([]);
    const [deleted, setDeleted] = useState([]);
    const [currentValue,setCurrentValue] = useState("");
    const [enterNewTask, setEnterNewTask] = useState(false);
    const [key, setKey] = useState(-1);

    function handleSave(){
        if(editedTask.some(el => (el.note_key === key))){  
            setEditedTask(prev =>{
                prev.filter(element => element.note_key !== key);
            })
        }

        setEditedTask(prev => [...prev,{note_key: key, notes: currentValue}]);
        props.setNotes(prev => 
            prev.map(element => {
                if(element.note_key === key){
                    return {note_key: key, notes: currentValue};
                }else return element;
            })
        );
        setKey(-1);
    }
    function handleDelete(k){
        setDeleted(prev => [...prev,k]);
        props.setNotes(prev => prev.filter(element => element.note_key !== k));
    }

    async function handleCross(){
        if(editedTask.length > 0){
            const result = await fetch("https://taskpilot-backend-7wni.onrender.com/editNotes", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid: props.uid,
                    note_key_notes: editedTask
                })
            }).then(res => res.json()).catch(err =>console.error(err))
        }
        if(deleted.length > 0){
            const result = await fetch("https://taskpilot-backend-7wni.onrender.com/deleteNotes", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid: props.uid,
                    note_key: deleted
                })
            }).then(res => res.json()).catch(err => console.error(err));
        }
        setDeleted([]);
        setEditedTask([]);
        setCurrentValue("");
        props.setShowNotes(false);
    }
    
    
    return <div className="TaskDisplay-div MemberPendingTaskDisplay-div">
        <div className="MemberPendingTaskDisplay-top-panel TaskDisplay-top-panel">
            <div className="left-part">
                <h4>My Notes</h4>
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
                {props.notes.map(element => {
                    if(key === element.note_key){
                        return <li className="MemberPendingTaskDisplay-list TaskDisplay-list" >
                            <div className="edit-input">
                                <input type="text" value={currentValue} onChange={(e)=>setCurrentValue(e.target.value)}/>
                                <button onClick={()=>handleSave()}>Save</button>
                            </div>
                        </li>
                    } else {
                        return <li className="MemberPendingTaskDisplay-list TaskDisplay-list" >
                            <div className="content">
                                <p>{element.notes}</p>
                            </div>
                            <div className="buttons">
                                <button onClick={()=>{
                                setCurrentValue(element.notes);
                                setKey(element.note_key);
                                }}>
                                <img src="https://img.icons8.com/?size=48&id=2ZghfySe3UcN&format=png" alt="edit icon" />
                                </button>
                                <button onClick={() => handleDelete(element.note_key)}>
                                    <img src="https://img.icons8.com/?size=80&id=G01ACMKXfdpJ&format=png" alt="delete icon" />
                                </button>
                            </div>
                            </li>
                    }
                })}
                {enterNewTask && <li className="add-new-task">
                        <input type="text" value={currentValue} onChange={(e)=>setCurrentValue(e.target.value)}/>
                        <button  onClick={async ()=>{
                            const result = await fetch("https://taskpilot-backend-7wni.onrender.com/addNotes", {
                                method: "post",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    uid: props.uid,
                                    notes: currentValue
                                })
                            }).then(res => res.json()).catch(err => console.error(err))
                            props.setNotes(prev => [...prev,{note_key: result[0].note_key, notes: currentValue}]);
                            
                            setEnterNewTask(false);
                            }}>Save</button>
                    </li>}
            </ul>
        </div>
    </div>
}
export default AddNote;
