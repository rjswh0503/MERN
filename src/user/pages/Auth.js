import React, { useState, useContext } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import '../../places/pages/PlaceForm.css';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';


const Auth = () => {

  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    }, false
  );


  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };


  const authSubmitHandler = async event => {
    event.preventDefault();

    if (isLoginMode) {

    } else {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/users/signUp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        setIsLoading(false);
        auth.login();
      } catch (err) {
        setIsLoading(false);
        setError(err.message || '오류가 발생하였습니다, 다시 시도 해 주세요.');
      }
    }
  };

  const errorHandler = () => {
    setError(null);
  }


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler}/>
      <div>
        <Card className="authentication">
          {isLoading && <LoadingSpinner asOverlay />}
          <h2>
            {
              isLoginMode ? '로그인' : '회원가입'
            }
          </h2>
          <hr />
          <form onSubmit={authSubmitHandler}>
            {
              !isLoginMode && (
                <Input
                  element="input"
                  id="name"
                  type="text"
                  label="Name"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="이름을 입력해주세요."
                  onInput={inputHandler}
                />
              )}
            <Input
              id="email"
              element="input"
              type="email"
              label="E-Mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="이메일 형식으로 입력하세요. (EX 123@123.com)"
              onInput={inputHandler}
            />

            <Input
              id="password"
              element="input"
              type="password"
              label="Password"
              validators={[VALIDATOR_MINLENGTH(10)]}
              errorText="비밀번호 입력하세요.(10글자 이상)"
              onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
              {isLoginMode ? '로그인' : '회원가입'}
            </Button>
          </form>
          <Button inverse onClick={switchModeHandler}>{isLoginMode ? '회원가입' : '로그인'}</Button>
        </Card>
      </div>
    </React.Fragment>
  )


}

export default Auth;