import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import Button from '../../shared/components/FormElements/Button';
import './PlaceForm.css';


const NewPlace = () => {
 const [formState, inputHandler] =  useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      }
  },false
);
   

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