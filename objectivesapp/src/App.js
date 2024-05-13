import './App.css'

function App() {
  return (
    <div className="App">
      <h1>My Objectives</h1>

       <div className='objectives-wrapper'>
          <div className='objectives-input'>
            <div className='objectives-input-item'>
              <label>Objective</label>
              <input type='text' placeholder='Write down objective here'/>
            </div>
            <div className='objectives-input-item'>
              <label>Description</label>
              <input type='text' placeholder="Write down it's description here"/>
            </div>
            <div className='objectives-input-item'>
              <button type='button' className='primary-button'>Add</button>
            </div>
          </div> 

          <div className='btn-area'>
             <button>Objective</button>
             <button>Completed</button>
          </div>
          <div className='objectives-list'>
              <div className='objectives-list-item'>
                <h3>Objective 1</h3>
                <p>Description</p>
              </div>
              
          </div>
        </div>
    </div>
  )
}


export default App;