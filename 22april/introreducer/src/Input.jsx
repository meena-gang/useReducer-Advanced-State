import React from 'react'
import { useRef } from 'react';
import { useReducer } from 'react';
import { useState } from 'react';


const calReducer = (state,action) => {
    
    switch(action.type){
        case "add" : return state+ (+action.payload)
        case "subtract" : return state - (+action.payload);
        case "multiply" : return state* (+action.payload); 
        case "divide" : return (state/ (+action.payload)).toFixed(2);
        case "reset" : return state = 0;
    }
}

const Input = () => {
    const[val, setVal] = useState(0);
    const[state, dispatch] = useReducer(calReducer,0);
    
  return (
    <>
    <div>
        <input type='number' placeholder='Enter a number' value={val} onChange={(e) => setVal(e.target.value)}/>
        <button onClick={() => dispatch({type:"add",payload:val})}>Add</button>
        <button onClick={() => dispatch({type:"subtract",payload:val})}>Subtract</button>
        <button onClick={() => dispatch({type:"multiply",payload:val})}>Multiply</button>
        <button onClick={() => dispatch({type:"divide",payload:val})}>Divide</button>
        <button  onClick={() => dispatch({type:"reset"})}>Reset</button>
    </div>
    <br></br>
    <h1>{state}</h1>
    </>
  )
}

export default Input