import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import './NewPlace.css';
const NewPlace = () => {
  return (
    <div>
      <form className='place-form'>
      <Input element="input" type="text" label="title" validators={[]} onChange />
      </form>
    </div>
  );
};

export default NewPlace;