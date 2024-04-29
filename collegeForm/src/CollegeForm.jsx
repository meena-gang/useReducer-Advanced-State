import React from 'react'
import { useState } from 'react';
import { useReducer } from 'react'
import './CollegeForm.css'

const formReducer = (state, action) => {
    switch(action.type){
        case "college" : return {...state, college:action.payload};
        case "year" : return {...state, year:action.payload};
        case "building" : return {...state, addressDetails:{...state.addressDetails, building:action.payload} };
        case "street" : return {...state, addressDetails:{...state.addressDetails, street:action.payload}};
        case "cityName" : return {...state, addressDetails:{...state.addressDetails, city:{...state.addressDetails.city, name:action.payload}}};
        case "pincode" : return {...state, addressDetails:{...state.addressDetails, city:{...state.addressDetails.city, locality:{...state.addressDetails.city.locality, pincode:action.payload}}}};
        case "landmark" : return {...state, addressDetails:{...state.addressDetails, city:{...state.addressDetails.city, locality:{...state.addressDetails.city.locality, landmark:action.payload}}}};
        case "state" : return {...state, addressDetails:{...state.addressDetails, state:action.payload}};
        case "courses" : return {...state, courses_offered:[...state.courses_offered, action.payload]}
        case "remove" : return {...state, courses_offered: state.courses_offered.filter(item => item!=action.payload)}
        case "reset" : return {college:"",year:"", addressDetails:{building:"",street:"",state:"",city:{name:"",locality:{pincode:"",landmark:"",courses_offered:[]}}}}
        default : throw new Error("invalid action type");
    }
}

const CollegeForm = () => {
    let initialState = {
        college : "",
        year : "",
        addressDetails : {
            building : "",
            street : "",
            city : {
                name : "",
                locality : {
                    pincode : "",
                    landmark : ""
                }
            },
            state : "",
        },
        courses_offered : []
    }
    const[state, dispatch] = useReducer(formReducer, initialState);
    const[flag, setFlag] = useState(false);


    const changeHandler = (e) => {
        e.target.checked ? dispatch({type:"courses",payload:e.target.value}) : 
                           dispatch({type:"remove",payload:e.target.value})
    }

    const resetHandler = (event) => {
        // document.getElementById("myForm").reset();
        dispatch({type:'reset'});
    }
    console.log(state);
    const submitHandler = (e) => {
        e.preventDefault();
        setFlag(true);
        setTimeout(() => setFlag(false),3000)
    }
    console.log
  return (
    <>
        <form onSubmit={submitHandler} id='myForm'>
            <div>
                <label>College Name : </label>
                    <input type="text" name='college' value={state.college} onChange={(e) => dispatch({type:"college",payload:e.target.value})}/><br/>
                </div>
                <div>
                    <label>Establishment year : </label>
                <input type='number' name='year' value={state.year}  onChange={(e) => dispatch({type:"year",payload:e.target.value})}/><br/>
            </div>
            <div className='address'>
                <label>Address Details : </label><br/>
                    <input type="text"  name="building" placeholder='Enter building name' value={state.addressDetails.building} onChange={(e) => dispatch({type:"building",payload:e.target.value})}/><br/>
                    <input type="text" name="street"  placeholder='Enter street' value={state.addressDetails.street} onChange={(e) => dispatch({type:"street",payload:e.target.value})}/><br/>
                    <input type="text" name="city" placeholder='Enter city' value={state.addressDetails.city.name} onChange={(e) => dispatch({type:"cityName",payload:e.target.value})} /><br/>
                    <input type="text" name="pin" placeholder='Enter pincode' value={state.addressDetails.city.locality.pincode} onChange={(e) => dispatch({type:"pincode",payload:e.target.value})}/><br/>
                    <input type="text" name="landmark" placeholder='Enter landmark' value={state.addressDetails.city.locality.landmark} onChange={(e) => dispatch({type:"landmark",payload:e.target.value})} /><br/>
                    <input type="text" name="state" placeholder='Enter state' value={state.addressDetails.state} onChange={(e) => dispatch({type:"state",payload:e.target.value})} /><br/>
            </div>
                <div className='courses'>
                    <label style={{paddingLeft:'-100px'}}>Courses Offered : </label><br/>
                        <input type="checkbox" name="sub1"  value="science" onChange={changeHandler}/>
                    <label >Science</label><br/>
                        <input type="checkbox"  name="sub2" value="Maths" onChange={changeHandler}/>
                    <label >Maths</label><br/>
                        <input type="checkbox" name="sub3"  value="Commerce" onChange={changeHandler}/>
                    <label >Commerce</label><br/>
                        <input type="checkbox" name="sub4" value="Atrs" onChange={changeHandler}/>
                    <label >Arts</label><br/>
                        <input type="checkbox" name="sub5"  value="Economic" onChange={changeHandler}/>
                    <label >Economic</label><br/>
                </div>
            <button>Submit</button>
            </form>
            <button onClick={resetHandler}>Reset</button>
            <br/>
            {flag ? <div>
                        <h2>Name : {state.college}</h2>
                        <p>Establishment Year : {state.year}</p>
                        <p>Adress : {state.addressDetails.building}, {state.addressDetails.street}, {state.addressDetails.city.name},
                                    {state.addressDetails.city.locality.pincode}, {state.addressDetails.city.locality.landmark},  
                                    {state.addressDetails.state}</p>
                        <h3>Coureses Offered</h3>
                        <ul style={{listStyle : "none"}}>
                            {state.courses_offered.map((item,i)=> <li key={i}>{item}</li>)}
                        </ul>
                    </div> : ""}
       

    </>
  )
}

export default CollegeForm