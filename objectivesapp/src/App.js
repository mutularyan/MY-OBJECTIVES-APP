import React, { useState } from 'react';
import './App.css';
import { MdDeleteSweep } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";



function App() {
  const [isCompleteScreen,setIsCompleteScreen] = useState(false);
  const [allObjectives,setObjectives] = useState ([]);
  Const [newObjective,setNewObjective] = useState("");
  const [newDescription,setNewDescription] = useState("");

  const handleAddObjective = ()=>{
    let newObjectiveItem = {
      objective:newObjective,
      description:newDescription,
    }
  }

  let updatedObjectiveArr = [...allObjectives];
  updatedObjectiveArr.push(newObjective);
  setObjectives(updatedObjectiveArr);

  return (
    <div className="App">
      <h1>My Objectives</h1>

       <div className='objectives-wrapper'>
          <div className='objectives-input'>
            <div className='objectives-input-item'>
              <label>Objective</label>
              <input type='text' value={newObjective} onChange={(e)=>setNewObjective(e.target.value)} placeholder='Write down objective here'/>
            </div>
            <div className='objectives-input-item'>
              <label>Description</label>
              <input type='text' value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="Write down description here"/>
            </div>
            <div className='objectives-input-item'>
              <button type='button' onClick={handleAddObjective} className='primary-button'>Add</button>
            </div>
          </div> 

          <div className='btn-area'>
             <button className={`secondary-button1 ${isCompleteScreen===false && 'active1'}`}
               onClick={()=>setIsCompleteScreen(false)}>
                Objective
             </button>

             <button className={`secondary-button2 ${isCompleteScreen===true && 'active2'}`}
               onClick={()=>setIsCompleteScreen(true)}>
                Completed
             </button>
                
          </div>
          <div className='objectives-list'>
            
           {allObjectives.map((item,index) => {
              return 
              <div className='objectives-list-item' key={index}>
                
                <div>
                <h3>{item.title}</h3>
                <p>{}</p>
                </div>
                
                <div className='icon'>
                <MdDeleteSweep className='delete-icon' />
                <IoCheckmarkDoneSharp className='check-icon'/>
                </div>
                
              </div>

           }
            )}
            

          </div>
        </div>
    </div>
  )
}


export default App;