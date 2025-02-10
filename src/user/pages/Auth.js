import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import '../../places/pages/PlaceForm.css';
import { useForm } from '../../shared/hooks/form-hook';


const Auth = () => {

    const [formState, inputHandler] = useForm(
        {
            email : {
                value: '',
                isValid: false
            },
            password : {
                value: '',
                isValid: false
            }
    }, false
);


const RegisterHandler = event => {
    event.preventDefault();
    console.log(formState.inputs)
}


    


    return (
        <div>
            <Card>
                <form className='place-form' onSubmit={RegisterHandler}>
                    <Input
                    id="email"
                    element="input"
                    type="email"
                    label="email"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                    errorText="이메일을 형식으로 입력하세요. (EX 123@123.com)"
                    onInput={inputHandler}
                    >
                    </Input>
                    <Input
                    id="password"
                    element="input"
                    type="password"
                    label="password"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
                    errorText="비밀번호 입력하세요.(10글자 이상)"
                    onInput={inputHandler}
                    >
                    </Input>
                    <Button type="submit" disabled={!formState.isValid}>회원가입</Button>
                </form>
            </Card>
        </div>
    )


}

export default Auth;