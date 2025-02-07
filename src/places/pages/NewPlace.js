import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import './NewPlace.css';
const NewPlace = () => {
  return (
    <div>
      <form className='place-form'>
      <Input element="input" type="text" label="Title" vaildators={[]} errorText="제목을 입력하세요." />
      </form>
    </div>
  );
};

export default NewPlace;