import React, { useReducer } from "react";
// useReducer 로도 컴포넌트 상태관리를 할 수 있고
// useState 보다 더 복잡한 상태를 쉽게 관리할 수 있다.

import './Input.css';


const Input = props => {

    

    const ChangeHandler = event => {
        
    }

    const element = props.element === 'input' ? ( <input 
        id={props.id} 
        type={props.type} 
        placeholder={props.placeholder}
        onChange={ChangeHandler}
         />
 ) : ( 
    <textarea id={props.id} rows={props.row || 3} onChange={ChangeHandler}/>
    );

    

    return <div className={`form-control`}>
        <label htmlFor={props.id}>{props.label}</label>
        {element}
    </div>

}

export default Input;