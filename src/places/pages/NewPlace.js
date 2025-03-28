import React, { useContext } from 'react';
import { useNavigate  } from 'react-router-dom';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './PlaceForm.css';


const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
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
      },
      image: {
        value: null,
        isValid: false
      }
    }, false
  );

  const Navigate = useNavigate();

  const placeSubmitHnadler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('image', formState.inputs.image.value);
      await sendRequest('http://localhost:5000/api/places','POST',formData, {
        Authorization: 'Bearer ' + auth.token
      });
    // redirect 함수인 useNavigate()를 사용
    Navigate('/');
    }catch(err){
      console.log(err)
    }
    
  }


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
    <form className='place-form' onSubmit={placeSubmitHnadler}>
      {isLoading && <LoadingSpinner asOverlay />}
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
      {<ImageUpload center id='image' onInput={inputHandler} errorText={'이미지를 업로드 하세요.'}/>}

      <Button type="submit" disabled={!formState.isValid}>추가</Button>
    </form>
    </React.Fragment>
  );
};

export default NewPlace;