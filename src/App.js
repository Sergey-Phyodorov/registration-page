import './App.css';
import { EntryField } from './components/field/entry-field';
import { useState, useRef, useEffect } from 'react';

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState({
        errorEmail: null,
        errorPassword: null,
        errorRepeatPassword: null
    });

    const validationConfirms = useRef({
        emailValid: false,
        passwordValid: false,
        repeatPasswordValid: false
    });

    const buttonFocus = useRef(null);
    const onEmailChange = (event) => {
        setEmail(event.target.value);
        let errorEmail = null;
        if (event.target.value === '') {
            errorEmail = null;
        } else if (event.target.value.length < 5) {
            errorEmail = 'Длина поля должна быть не менее 5 символов';
        } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(event.target.value)) {
            errorEmail = 'Введите действительный адрес электронной почты';
        } else if (event.target.value.length > 20) {
            errorEmail = 'Длина адреса электронной почты должна быть не более 100 символов';
        } else {
            validationConfirms.current.emailValid = true;
        }
        setError({ ...error, errorEmail: errorEmail });
        validateFocus();
    };

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
        let errorPassword = null;

        const hasLowercase = /[a-z]/.test(event.target.value);
        const hasUppercase = /[A-Z]/.test(event.target.value);
        const hasDigit = /\d/.test(event.target.value);
        const validLength = event.target.value.length >= 8 && event.target.value.length <= 32;

        if (!validLength) {
            errorPassword = 'Пароль должен быть длиной от 8 до 32 символов';
        } else if (!hasLowercase) {
            errorPassword = 'Пароль должен содержать хотя бы одну строчную букву';
        } else if (!hasUppercase) {
            errorPassword = 'Пароль должен содержать хотя бы одну заглавную букву';
        } else if (!hasDigit) {
            errorPassword = 'Пароль должен содержать хотя бы одну цифру';
        }

        setError({ ...error, errorPassword: errorPassword });
        validationConfirms.current.passwordValid = errorPassword === null;
        validateFocus();
    };


    const onRepeatPasswordChange = (event) => {
        setRepeatPassword(event.target.value);
        let errorRepeatPassword = null;
        if (event.target.value !== password) {
            errorRepeatPassword = 'Пароли не совпадают';
        }
        setError({ ...error, errorRepeatPassword: errorRepeatPassword });
        validationConfirms.current.repeatPasswordValid = errorRepeatPassword === null;
        validateFocus();
    };

    useEffect(() => {
        const allValid = Object.values(validationConfirms.current).every(value => value);
        const noErrors = Object.values(error).every(e => e === null);
        if (allValid && noErrors) {
            buttonFocus.current.focus();
        }
    }, [error]);

    const validateFocus = () => {
        const allValid = Object.values(validationConfirms.current).every(value => value);
        const noErrors = Object.values(error).every(e => e === null);
        if (allValid && noErrors) {
            buttonFocus.current.focus();
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        console.log({ email, password, repeatPassword });
    };

    const allFieldsValid = Object.values(validationConfirms.current).every(value => value);
    const noErrors = Object.values(error).every(e => e === null);

    return (
        <div className="App">
            <div className="loginHtml">
                <h2>Страница регистрации нового пользователя</h2>

                <form onSubmit={onSubmit}>
                    <EntryField nameFieldLabel="Email"
                                nameField="email"
                                placeholderField="Введите Email"
                                fieldValue={email}
                                onFiledValueChange={onEmailChange}
                                errorField={error.errorEmail} />

                    <EntryField nameFieldLabel="Password"
                                nameField="password"
                                placeholderField="Введите Password"
                                fieldValue={password}
                                onFiledValueChange={onPasswordChange}
                                errorField={error.errorPassword} />

                    <EntryField nameFieldLabel="Repeat Password"
                                nameField="repeatPassword"
                                placeholderField="Повторите Password"
                                fieldValue={repeatPassword}
                                onFiledValueChange={onRepeatPasswordChange}
                                errorField={error.errorRepeatPassword} />

                    <button ref={buttonFocus}
                            type="submit"
                            className="button"
                            disabled={!(noErrors && allFieldsValid)}>Зарегистрироваться
                    </button>

                </form>
            </div>
        </div>
    );
}

export default App;
