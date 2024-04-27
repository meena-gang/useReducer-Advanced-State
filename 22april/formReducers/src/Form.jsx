import React, { useReducer, useState } from 'react'

const formReducer = (state,action) => {
   switch(action.type){
    case "email": return {...state, email:action.payload};
    case "password": return {...state, password:action.payload};
    case "reset" : return {email:"", password:""};
    default:
        throw new Error(`Action type is invalid`);
   }
}
const Form = () => {
    const[state, dispatch] = useReducer(formReducer, {email:"", password:""});
    const[flag, setFlag] = useState(false);
    
  return (
    <>
        <form>
            <input placeholder='Enter your email id' type='text' onChange={(e) => dispatch({type:'email',payload:e.target.value})}/>
            <input placeholder='Enter your password' type='text' onChange={(e) => dispatch({type:'password',payload:e.target.value})}/>
            <button onClick={(e) => {e.preventDefault();
                            setFlag(true)}}>Submit</button>
            <button onClick={() => dispatch({type:'reset'})}>Reset</button>
        </form>
        <br/>
        {flag ? <div>
                    <div>User Email : {state.email}</div>
                    <div>Password : {state.password}</div>
                </div> : <div>No details found</div>}

    </>
  )
}

export default Form