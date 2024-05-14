import React, { useEffect, useState } from 'react';
import './App.css';
import { MdDeleteSweep } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import {AiOutlineEdit} from "react-icons/ai";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allObjectives, setObjectives] = useState([]);
  const [newObjective, setNewObjective] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedObjectives, setCompletedObjectives] = useState([]);
  const [currentEdit,setCurrentEdit] = useState("");
  const [currentEditedItem,setCurrentEditedItem] = useState("");

  const handleAddObjective = () => {
    let updatedObjectiveArr = [...allObjectives];
    updatedObjectiveArr.push({
      objective: newObjective,
      description: newDescription,
    });
    setObjectives(updatedObjectiveArr);
    setNewObjective("");
    setNewDescription("");
    localStorage.setItem('objectiveslist', JSON.stringify(updatedObjectiveArr));
  };

  const handleDeleteObjective = (index) => {
    let reducedObjective = [...allObjectives];
    reducedObjective.splice(index, 1);

    localStorage.setItem('objectiveslist', JSON.stringify(reducedObjective));
    setObjectives(reducedObjective);
  }

  const handleCompleted = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...allObjectives[index],
      completedOn: completedOn
    }

    let updatedCompletedArr = [...completedObjectives];
    updatedCompletedArr.push(filteredItem);
    setCompletedObjectives(updatedCompletedArr);
    handleDeleteObjective(index);
    localStorage.setItem('completedObjectives', JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompletedObjectives = (index)=> {
    let reducedCompletedObjective = [...completedObjectives];
    reducedCompletedObjective.splice(index, 1);

    localStorage.setItem('completedObjectives', JSON.stringify(reducedCompletedObjective));
    setCompletedObjectives(reducedCompletedObjective);
  }

  useEffect(() => {
    let savedObjective = JSON.parse(localStorage.getItem('objectiveslist'));
    let savedCompletedObjective = JSON.parse(
      localStorage.getItem('completedObjectives'));
    
    
    if (savedObjective) {
      setObjectives(savedObjective);
    }

    if (savedCompletedObjective) {
      setCompletedObjectives(savedCompletedObjective);
    }
  }, []);

  const handleEdit = (ind,item)=>{
    console.log(ind);
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  }

  const handleUpdateObjectives = (value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,objective:value}
    })
  }

  const handleUpdateDescription = (value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,description:value}
    })
  }

  const handleUpdateObjective = ()=>{
      let newObjective = [...allObjectives];
      newObjective[currentEdit] = currentEditedItem;
      setObjectives(newObjective);
      setCurrentEdit("");
  }

  return (
    <div className="App">
      <h1>My Objectives</h1>

      <div className='objectives-wrapper'>
        <div className='objectives-input'>
          <div className='objectives-input-item'>
            <label>Objective</label>
            <input type='text' value={newObjective} onChange={(e) => setNewObjective(e.target.value)} placeholder='Write down objective here' />
          </div>
          <div className='objectives-input-item'>
            <label>Description</label>
            <input type='text' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Write down description here" />
          </div>
          <div className='objectives-input-item'>
            <button type='button' onClick={handleAddObjective} className='primary-button'>Add</button>
          </div>
        </div>

        <div className='btn-area'>
          <button
            className={`secondary-button1 ${isCompleteScreen === false && 'active1'}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Objective
          </button>

          <button
            className={`secondary-button2 ${isCompleteScreen === true && 'active2'}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>

        </div>
        <div className='objectives-list'>

        {isCompleteScreen === false &&
            allObjectives.map ((item, index) => {
              if(currentEdit===index){
                 return(
                  <div className='edit__wrapper' key={index}>
                  <input placeholder='Updated Objective' 
                  onChange={(e)=>handleUpdateObjectives(e.target.value)} 
                  value={currentEditedItem.objective}  />
                  <textarea placeholder='Updated Objective' 
                  rows={4}
                  onChange={(e)=>handleUpdateDescription(e.target.value)} 
                  value={currentEditedItem.description}  />
                   <button
              type="button"
              onClick={handleUpdateObjective}
              className="primaryBtn"
            >
              Update
            </button>
              </div> 
                 ) 
              }else{
            return (
              <div className='objectives-list-item' key={index}>

                <div>
                  <h3>{item.objective}</h3>
                  <p>{item.description}</p>
                </div>

                <div className='icon'>
                  <MdDeleteSweep className='delete-icon' 
                  onClick={() => handleDeleteObjective(index)} 
                  title='Delete?' />
                  <IoCheckmarkDoneSharp className='check-icon' 
                  onClick={() => handleCompleted(index)} 
                  title='Complete?' />
                  <AiOutlineEdit  className="check-icon"
                  onClick={() => handleEdit (index,item)}
                  title="Edit?" />
                </div>

              </div>
            );
          }
          })}

          {isCompleteScreen === true && completedObjectives.map((item, index) => {
            return (
              <div className='objectives-list-item' key={index}>

                <div>
                  <h3>{item.objective}</h3>
                  <p>{item.description}</p>
                  <p><em>Completed on: {item.completedOn}</em></p>
                </div>

                <div className='icon'>
                  <MdDeleteSweep 
                  className='delete-icon' 
                  onClick={() => handleDeleteCompletedObjectives(index)} 
                  title='Delete?' />
                </div>

              </div>
            )
          })}


        </div>
      </div>
    </div>
  )
};


export default App;
