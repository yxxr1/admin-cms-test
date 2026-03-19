import {type ChangeEvent, type SubmitEventHandler, useCallback, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router";
import {Snackbar} from "@mui/material";
import {Input} from "@/shared/ui/Input";
import {CheckBox} from "@/shared/ui/Checkbox";
import {Button} from "@/shared/ui/Button";
import {Delimiter} from "@/shared/ui/Delimiter";
import {Link} from "@/shared/ui/Link";
import {setIsSaveSession, setTokens} from "@/helpers/token";
import type {FormData, FormErrors} from "./types";
import {useAuthFormStore} from "./store/form";
import {login} from "./api/login";
import {useCurrentUser} from "./hooks/useCurrentUser.ts";
import logoUrl from "./assets/logo.svg";
import userIconUrl from "./assets/user.svg";
import lockIconUrl from "./assets/lock.svg";

export const Auth = () => {
    const {username, password, isSave, setUsername, setPassword, toggleIsSave, isSubmitting, setIsSubmitting} = useAuthFormStore();
    const navigate = useNavigate();
    const { user, refetchUser } = useCurrentUser();

    useEffect(() => {
        if (user) {
            navigate('/products');
        }
    }, [user])

    const [touchedFields, setTouchedFields] = useState<Partial<Record<keyof FormData, boolean>>>({});
    const setFieldTouched = useCallback((name: keyof FormData) => {
        if (!touchedFields[name]) {
            setTouchedFields({ ...touchedFields, [name]: true });
        }
    }, [touchedFields, setTouchedFields]);
    const onUsernameTouched = useCallback(() => setFieldTouched('username'), [setFieldTouched]);
    const onPasswordTouched = useCallback(() => setFieldTouched('password'), [setFieldTouched]);

    const [hasErrors, formErrors] = useMemo<[boolean, FormErrors]>(() => {
        const errors: FormErrors = {};

        if (!username) {
            errors.username = "Необходимо заполнить имя пользователя";
        }

        if (!password) {
            errors.password = "Необходимо заполнить пароль";
        }

        return [!!Object.keys(errors).length, errors];
    }, [username, password]);

    const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

    const onSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        if (!hasErrors && !isSubmitting) {
            try {
                setIsSubmitting(true);
                const loginData = await login(username, password);
                setIsSaveSession(isSave);
                setTokens(loginData);
                await refetchUser();
                navigate('/products');
            } catch (e: unknown) {
                setNotificationMessage((e as Error).message);
            } finally {
                setIsSubmitting(false);
            }
        }
    }

    const onUsernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }, [setUsername]);
    const onPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }, [setPassword]);

    return (
        <>
            <form className="p-8 border-1 border-gray-200 rounded-3xl" onSubmit={onSubmit}>
                <img className="w-13 h-13 m-auto mb-2" src={logoUrl} alt="logo" />
                <h1 className="font-semibold text-center text-3xl">Добро пожаловать!</h1>
                <div className="text-gray-400 text-center mb-8 mt-2">Пожалуйста, авторизуйтесь</div>
                <Input
                    type="text"
                    label="Логин"
                    name="username"
                    iconUrl={userIconUrl}
                    value={username}
                    onChange={onUsernameChange}
                    onBlur={onUsernameTouched}
                    error={touchedFields.username ? formErrors.username : undefined}
                />
                <Input
                    type="password"
                    label="Пароль"
                    name="password"
                    iconUrl={lockIconUrl}
                    value={password}
                    onChange={onPasswordChange}
                    onBlur={onPasswordTouched}
                    error={touchedFields.password ? formErrors.password : undefined}
                />
                <CheckBox
                    label="Запомнить данные"
                    name="isSave"
                    checked={isSave}
                    onChange={toggleIsSave}
                />
                <Button className="w-full" disabled={isSubmitting}>Войти</Button>
                <Delimiter title="или" />
                <div className="text-gray-600 text-center">Нет аккаунта? <Link title="Создать" to="#"></Link></div>
            </form>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={notificationMessage !== null}
                autoHideDuration={3000}
                onClose={() => setNotificationMessage(null)}
                message={notificationMessage}
            />
        </>
    )
}
