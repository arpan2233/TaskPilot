import React, { useState } from "react";

function AvailableMemberDisplay(props) {
  // { availableMembers, onSave ,setShowAvailable}
  const [selecteduser, setSelecteduser] = useState([]);

  const toggleMember = (member) => {
    setSelecteduser((prev) =>
      prev.some(m => m.uid === member.uid) ? prev.filter((m) => m.uid !== member.uid) : [...prev, member]
    );
  };

  function handleSave(){
    props.setShowAvailable(false);
    props.onSave(selecteduser); 
  };

  return (
    <div className="Available-memebers-div">
      <div className="Available-memebers-top-section">
        <h3>Available Members</h3>
        <button onClick={() => props.setShowAvailable(false)}>
          <img src="https://img.icons8.com/?size=50&id=3062&format=png" alt="delete icon" />
        </button>
      </div>
      <div className="Available-memebers-bottom-section">
        <ul>
        {props.availableMembers.map((member) => (
          <li key={member.uid}>
            <h4>{member.user_name}</h4>
            <button onClick={() => toggleMember(member)}>
              {selecteduser.some(m => m.uid === member.uid) ? "Undo" : "Add"}
            </button>
          </li>
          ))}
        </ul>
        <button onClick={() => handleSave()} disabled={selecteduser.length === 0}>
          Save
        </button>
      </div>
      
    </div>
  );
}

export default AvailableMemberDisplay;
