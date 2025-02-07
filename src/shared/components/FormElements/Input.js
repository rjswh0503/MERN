import React, { useReducer } from "react";
// useReducer 로도 컴포넌트 상태관리를 할 수 있고
// useState 보다 더 복잡한 상태를 쉽게 관리할 수 있다.
// 상태를 변경하고 싶을 떄마다 실행되는 로직을 작성할 수 있다.

import './Input.css';


const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isvalid: true
            };
            default :
            return state;
    }

};

const Input = props => {
   const [inputState, dispatch] = useReducer(inputReducer, {value: '', isvalid: false});
    

    const ChangeHandler = event => {
        dispatch({type:'CHANGE', val: event.target.value});
    }

    const element = props.element === 'input' ? ( <input 
        id={props.id} 
        type={props.type} 
        placeholder={props.placeholder}
        onChange={ChangeHandler}
        value={inputState.value}
         />
 ) : ( 
    <textarea 
    id={props.id} 
    rows={props.row || 3} 
    onChange={ChangeHandler} 
    value={inputState.value}
    />
    );

    

    return <div className={`form-control ${!inputState.isvalid && 'form-control--invalid'}`}>
        <label htmlFor={props.id}>{props.label}</label>
        {element}
        {!inputState.isvalid && <p>{props.errorText}</p>}
    </div>

}

export default Input;