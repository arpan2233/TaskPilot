import React from "react";

function CoWorkers(props){

    // props: co_workers

    function handleClick(email){
        window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=Hello&body=I want to talk about...`,
        '_blank' 
        )
    }
    return <section className="co-worker-section">
        <h1>Co-Workers</h1>
        <ul>
            {(props.co_workers).map(element => {
                if(element.uid != props.uid){
                return <li>
                    <div className="co-worker-detail">
                        <p>{element.user_name}</p>
                        <button onClick={() => handleClick(element.email)}>Email</button>
                    </div>
                </li>
                }
            })}
        </ul>
    </section>;
  };

export default CoWorkers;
