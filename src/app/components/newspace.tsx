import React from 'react'

function Newspace() {
  return (
    <div>
        <div>preview</div>
        <div>
            <button></button>
            <button></button>
            <div><h1>Create a new space</h1>
            <form action="">
                <label htmlFor="">Space Name</label>
                <input type="text" />

                <label htmlFor="">Space Logo</label>
                <input type="checkbox" name="" id="" />square

                <div><div></div> <button>change</button></div>

                <label htmlFor="">Header title</label>
                <input type="text" />

                <label htmlFor="">custom message</label>
                <input type="text" />

                <label htmlFor="">Questions</label>
                <div>displaying list of questions</div>

                <label htmlFor="">collection type</label>
                <select name="" id="">
                <option value="">text and video</option>
                <option value="">text only</option>
                <option value="">video only</option>
                </select>
                
            </form>
            </div>

        </div>
    </div>
  )
}

export default Newspace