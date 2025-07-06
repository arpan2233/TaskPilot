import React, { useEffect, useState } from "react";
import {useMediaQuery} from 'react-responsive'
import Sidebar from "./DashboardComp/Sidebar";
import TeamDisplay from "./DashboardComp/TeamDisplay";
import CoWorkers from "./DashboardComp/CoWorkers";
import UserTaskDisplay from "./DashboardComp/UserTaskDisplay";
import AvailableMemberDisplay from "./DashboardComp/AvailableMembersDisplay";
import "../CSSFILES/Dashboard.css"
import MemberPendingTaskDisplay from "./DashboardComp/MemberPendingTaskDisplay";
import MemberCompletedTaskDisplay from "./DashboardComp/MemberCompletedTaskDisplay";
import AddNote from "./DashboardComp/AddNote";
function Dashboard(props){
    
    const isDesktop = useMediaQuery({
        query: '(min-width: 768px)',
    });
    const [navbarOpened, setNavbarOpened] = useState(false);
    
    const [display, setDisplay] = useState("");
    const [loading, setLoading] = useState(true);

    //  data required for a particular user 

    const [co_workers, setCo_workers] = useState([]);
    const [completed_task, setCompleted_task] = useState([]);
    const [pending_task, setPending_task] = useState([]);
    const [data, setData] = useState([]);
    const [notes,setNotes] = useState([]);
    const [showNotes, setShowNotes] = useState(false);

    // Available members to add in team

    const [showAvailable, setShowAvailable] = useState(false);
    const [availableMembers, setAvailableMembers] = useState([]);

    // Team Memebers task display

    const [id,setID] = useState(-1);
    const [displayTask , setDisplayTask] = useState(false);
    const [headingTaskDisplay,setHeadingTaskDisplay] = useState("");
    const [listMembersTaskDisplay,setMembersListTaskDisplay] = useState([]);
    function setDetails(id, h, l){  
        setHeadingTaskDisplay(h);
        setMembersListTaskDisplay(l);
        setDisplayTask(true);
        setID(id);
        return;
    }
    async function onSave(users){
        const ids = users.map(element=>element.uid);
        const result = await fetch("https://taskpilot-backend-7wni.onrender.com/addReporter", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uid: props.ud.uid,
                IDs: ids
            })
        }).then(res=>res.json()).catch(err=>console.log(err));
        users.forEach(element => {
            element.completed_task = [];
            element.pending_task = [];
        })
        // console.log("nano");
        const mySet = new Set();
        users.forEach(e => mySet.add(e.uid));
        setAvailableMembers(prev => prev.filter(e => !mySet.has(e.uid)));
        setData(prev => [...prev,...users]);
        // console.log("nano");

    }
    useEffect(()=>{
        async function loadData() {
        var local_co_workers = [], local_completed_task = [], local_pending_task = [], local_data = [];
        console.log(props.ud.uid)
        try {
            const local_notes = await fetch("https://taskpilot-backend-7wni.onrender.com/getNotes", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid: props.ud.uid,
                })
            }).then(res => res.json()).catch(err => console.log(err));
            
            if(local_notes.length > 0) setNotes(local_notes);

            const members = await fetch("https://taskpilot-backend-7wni.onrender.com/availableMembers", {
                method: "post",
                headers: {
                        "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid: props.ud.uid,
                    position: props.ud.user_position,
                    org_name: props.ud.org_name
                })
            }).then(res => res.json()).catch(err => console.log(err));

            setAvailableMembers(members);
            console.log(members)

            const result = await fetch("https://taskpilot-backend-7wni.onrender.com/reportsTo", {
            method: "post",
            headers: {
                    "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uid: props.ud.uid,
            })}).then(res => res.json()).catch(err => console.log(err));

            const arrayID = [];
            local_data = result;
            // console.log(result);
            result.forEach(element => {
                arrayID.push(element.uid);
            })
            
            const reporters_completed_tasks = await fetch("https://taskpilot-backend-7wni.onrender.com/reportersCompletedTask", {
                method: "post",
                headers: {
                        "Content-Type": "application/json"
                    },
                body: JSON.stringify({
                    ids: arrayID,
                })
            }).then(res=>res.json()).catch(err => console.error(err));
            // console.log(reporters_completed_tasks);
            
            const reporters_pending_tasks = await fetch("https://taskpilot-backend-7wni.onrender.com/reportersPendingTask", {
                method: "post",
                headers: {
                        "Content-Type": "application/json"
                    },
                body:JSON.stringify({
                    ids: arrayID,
                })
            }).then(res=>res.json()).catch(err => console.error(err));
            local_co_workers = await fetch("https://taskpilot-backend-7wni.onrender.com/coWorkers",{
                method: "post",
                headers: {
                        "Content-Type": "application/json"
                    },
                body:JSON.stringify({
                    uid: props.ud.uid,
                    org_name: props.ud.org_name
                })
            }).then(res => res.json()).catch(err=>console.log(err));
            
            setCo_workers(local_co_workers);

            var sizeofdata = local_data.length;
            var sizeofCompletedTasks = reporters_completed_tasks.length;
            var sizeofPendingTasks = reporters_pending_tasks.length;
            var i = 0, j = 0,k = 0;
            while(i < sizeofdata){
                var id = local_data[i].uid;
                var completed = [], pending = [];
                while (j < sizeofCompletedTasks && id === reporters_completed_tasks[j].uid) {
                    completed.push({
                        tasks: reporters_completed_tasks[j].tasks, 
                        task_key: reporters_completed_tasks[j].task_key
                    });
                    j++;
                }
                while (k < sizeofPendingTasks && id === reporters_pending_tasks[k].uid) {
                    pending.push({
                        tasks: reporters_pending_tasks[k].tasks, 
                        task_key: reporters_pending_tasks[k].task_key
                    });
                    k++;
                }
                local_data[i].completed_task = completed;
                local_data[i].pending_task = pending;
                i++; 
            }
            
            setData(local_data);

            local_completed_task = await fetch("https://taskpilot-backend-7wni.onrender.com/completedTasks", {
                method: "post",
                headers: {
                        "Content-Type": "application/json"
                    },
                    
                body:JSON.stringify({
                    uid: props.ud.uid,
                })
            }).then(res => res.json()).catch(err=>console.log(err));

            setCompleted_task(local_completed_task);
            

            local_pending_task =await fetch("https://taskpilot-backend-7wni.onrender.com/pendingTasks", {
                method: "post",
                headers: {
                        "Content-Type": "application/json"
                    },
                body: JSON.stringify({
                    uid: props.ud.uid,
                })
            }).then(res => res.json()).catch(err=>console.log(err));

            setPending_task(local_pending_task)

        } catch (error) {
            console.log(error);
            
        } finally{
            setLoading(false);
        }
        
    }
        loadData();
    },[])

    // console.log(data);
    // console.log(completed_task);
    async function handle_Edit_Add_Delete(changed_uid, edit, add, del, status){
        var temp_data = data;
        var status_target = (status === "pending") ? "pending_task" : "completed_task";
        
        temp_data.forEach(element => {
            if(element.uid === changed_uid){
                const editMap = new Map();
                edit.forEach(e=>{
                    editMap.set(e.task_key, e.tasks);
                }) 
                const deleteSet = new Set();
                del.forEach(e=>{
                    deleteSet.add(e);
                })

                var revised_tasks_after_deletion = [];
                element[status_target].forEach(element => {
                    if(!deleteSet.has(element.task_key)){
                        revised_tasks_after_deletion.push(element);
                    }
                } );
                element[status_target] = revised_tasks_after_deletion;
                element[status_target] = element[status_target].map(element =>{
                    return {
                        task_key: element.task_key,
                        tasks: editMap.has(element.task_key) ? editMap.get(element.task_key) : element.tasks
                    }
                })

                if(add.length !== 0) element[status_target] = [...element[status_target], ...add];
                setData(temp_data);
                
            }
        });
        
        if(edit.length > 0){
            const result = await fetch("https://taskpilot-backend-7wni.onrender.com/editTasks", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    table: (status_target + 's'),
                    uid: changed_uid,
                    task_key_tasks: edit
                })
            }).then(res => res.json()).catch(err =>console.error(err))
        }
        if(del.length > 0){
            const result = await fetch("https://taskpilot-backend-7wni.onrender.com/deleteTasks", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    table: (status_target + 's'),
                    uid: changed_uid,
                    task_keys: del
                })
            }).then(res => res.json()).catch(err => console.error(err));
        }
    }
    function reporterRemoved(uid){

        var element = {};
        var temp_data = data
        temp_data.forEach(e => {
            if(e.uid === uid) element = e;
        })
        setData(prev=> prev.filter(e => e.uid !== uid));
        setAvailableMembers(prev => availableMembers.some(e => e.uid === element.uid) ? prev : [...prev,element]);
    }
    if(loading){
        return <p>Loading</p>
    } 
    return <section className="dashboard-section">
        {/* Sidebar */}
        <div className="dashboard-left-panel">
                <Sidebar display={setDisplay} username={props.ud.user_name} position={props.ud.user_position} 
                         isDesktop={isDesktop} 
                         navbarOpened={navbarOpened}
                         setNavbarOpened={setNavbarOpened}
                />

        </div>
        <div className="dashboard-right-panel">
            <div className="dashboard-right-top-panel">
                <div className="dashboard-right-top-panel-background"></div>
                <button onClick={() => setShowNotes(true)}><h3>Note +</h3></button>
            </div>
            <div className="dashboard-right-bottom-panel">
                {/* main body featuring different displays */}
                {display === "team" && <TeamDisplay 
                                            uid={props.ud.uid} 
                                            setDetails={setDetails}
                                            data={data}
                                            setShowAvailable={setShowAvailable}
                                            reporterRemoved={reporterRemoved}
                                            />}
                {(display === "co-workers") && <CoWorkers 
                                                uid={props.ud.uid}
                                                co_workers={co_workers}
                                                />}
                {(display === "completed") && 
                                            <UserTaskDisplay 
                                                title={"Completed"}
                                                tasklist={completed_task}
                                            />}
                {display === "pending" && <UserTaskDisplay 
                                                title={"Pending"}
                                                tasklist={pending_task}
                                            />}
            </div>
        </div>
        {displayTask && (headingTaskDisplay === "Completed Tasks" ? 
                            <MemberCompletedTaskDisplay
                                heading={headingTaskDisplay}
                                list={listMembersTaskDisplay}
                                uid={id}
                                setDisplayTask={setDisplayTask}
                                setMembersListTaskDisplay={setMembersListTaskDisplay}
                                handle_Edit_Add_Delete={handle_Edit_Add_Delete}
                            />
        :
                            <MemberPendingTaskDisplay 
                                heading={headingTaskDisplay}
                                list={listMembersTaskDisplay}   
                                uid={id}
                                setDisplayTask={setDisplayTask}
                                setMembersListTaskDisplay={setMembersListTaskDisplay}
                                handle_Edit_Add_Delete={handle_Edit_Add_Delete}
                            />)}
        {showAvailable && <AvailableMemberDisplay
                        availableMembers={availableMembers}
                        onSave={onSave}
                        setShowAvailable={setShowAvailable}
                    />}
        {showNotes && <AddNote uid={props.ud.uid} notes={notes} setNotes={setNotes} setShowNotes={setShowNotes} />}
    </section>;
}
export default Dashboard;