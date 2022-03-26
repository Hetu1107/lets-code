import React from 'react'

function Run() {
  return (
    <div className='right-container-editor run'>
        <div>
            <button>Run</button>
        </div>
        <div>
            <h4>Input</h4>
            <textarea onChange={(e)=>console.log(e.target.value)}></textarea>
        </div>
        <div>
            <h4>Output</h4>
            <textarea value="hey"></textarea>
        </div>
    </div>
  )
}

export default Run