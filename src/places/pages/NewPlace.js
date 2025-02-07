import React, { useCallback, useDeferredValue, useReducer } from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import './NewPlace.css';



const formReducer = (state, action) => {

  switch(action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for(const inputId in state.inputs){
        if(inputId === action.inputId){
          formIsValid = formIsValid && action.isValid;
        }else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {value: action.value, isValid : action.isValid}
        },
        isValid: formIsValid
      };

    default: 
      return 
  }
}



const NewPlace = () => {
   const [formState, dispatch ] = useReducer(formReducer, {
      inputs: {
        title: {
          value: '',
          isValid: false
        },
        description: {
          value: '',
          isValid: false
        }
      },
      isValid: false
    });


  const inputHandler = useCallback((id,value, isValid) => {
    dispatch({type:'INPUT_CHANGE', value: value, isValid: isValid, inputId: id})
  },[]);


  const placeSubmitHnadler = event => {
    event.preventDefault();
    console.log(formState.inputs); // 나중에 백엔드로 보냄
  }


  return (
    
      <form className='place-form' onSubmit={placeSubmitHnadler}>
      <Input
      id="title"
      element="input" 
      type="text" 
      label="Title" 
      validators={[VALIDATOR_REQUIRE()]} 
      errorText="제목을 입력하세요."
      onInput={inputHandler}
      />
      
      <Input 
      id="description"
      element="textarea" 
      label="Description" 
      validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]} 
      errorText="내용을 입력하세요.(최소5글자)"
      onInput={inputHandler}
      />

      <Input 
      id="address"
      element="input"
      type="text" 
      label="address" 
      validators={[VALIDATOR_REQUIRE()]} 
      errorText="주소를를 입력하세요"
      onInput={inputHandler}
      />
      
      <Button type="submit" disabled={!formState.isValid}>추가</Button>
      </form>
    
  );
};

export default NewPlace;