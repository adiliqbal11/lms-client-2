/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { useForm, Controller, SubmitHandler, } from 'react-hook-form'
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { User } from '../../../shared/types';
import Link from 'next/link';
import LoginHandler from '../../../context/server/user/auth/login';
import LoadingBar from 'react-top-loading-bar';
import { Toast } from 'primereact/toast';
import { verifyToken } from '../../../shared/common';
import { currentUser } from '../../../context/provider';
Toast
const Registration = () => {
    const toast = useRef<Toast>(null);
    const [pageLoading, setPageLoading] = useState<number>(0);
    const { layoutConfig } = useContext(LayoutContext);
    const { control, handleSubmit, reset, setValue, formState: { errors: UserErrors, isSubmitted, isValid, isDirty, isSubmitSuccessful, isSubmitting }, setError, clearErrors } = useForm<User>({
        mode: 'onBlur',
    });
    const router = useRouter();
    const showSuccess = (severity: "success" | "error" | "warn" | "info", summary: string, detail: string) => {
        toast?.current?.show({ severity, summary, detail, life: 3000 });
    }
    const submitForm: SubmitHandler<User> = async (user: User) => {
        setPageLoading(40);
        try {
            const response = await LoginHandler(user, "callback");
            setPageLoading(70);
            if (response?.status) {
                const lmsToken = response?.result?.data as string;
                localStorage.setItem('lms-token', lmsToken);
                const user = verifyToken(lmsToken) as User;
                currentUser?.setUser(user);
                setPageLoading(100);
                router.push('/');
            } else {
                setPageLoading(100);
                showSuccess('error', 'Error', response?.result?.message);
            }
        } catch (error: any) {
            setPageLoading(100);
            showSuccess('error', 'Error', error?.message);
        }
    }
    

    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });
    return (
        <div className={containerClassName}>
            <Toast ref={toast} />
            <LoadingBar
                color="#0000FF"
                progress={pageLoading}
                onLoaderFinished={() => setPageLoading(0)}
            />
            <div className="flex flex-column align-items-center justify-content-center">
            <img src={`/layout/images/logo.png`} alt='KOMRAS AI' className="mb-5 w-6rem flex-shrink-0" />
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <img src="/layout/images/logo.png" alt="Image" height="50" className="mb-3" />
                            <div className="text-900 text-3xl font-medium mb-3">Welcome, To LMS!</div>
                            <span className="text-600 font-medium">Sign Up to continue</span>
                        </div>

                        <div>
                            <div className="field p-fluid">

                                <Controller
                                    name='email'
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: "Invalid email address",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <>
                                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                                Email
                                            </label>
                                            <InputText className={UserErrors?.email?.message ? "p-invalid" : ""} value={field?.value} onChange={field.onChange} />
                                            <small id="username-help" className="p-error">
                                                {UserErrors?.email?.message}
                                            </small>
                                        </>
                                    )}
                                />
                            </div>

                            <div className="field p-fluid">
                                <Controller
                                    name='password'
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: "Password is required" }}
                                    render={({ field }) => (
                                        <>
                                            <label htmlFor="password" className="block text-900 text-xl font-medium mb-2">
                                                Password
                                            </label>
                                            <InputText type='password' className={UserErrors?.password?.message ? "p-invalid" : ""} value={field?.value} onChange={field.onChange} />
                                            <small id="username-help" className="p-error">
                                                {UserErrors?.password?.message}
                                            </small>
                                        </>
                                    )}
                                />

                            </div>
                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <div className="flex align-items-center">
                                    <Link href={`./registration`}>Register</Link>
                                </div>
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    Forgot password?
                                </a>
                            </div>
                            <Button label="Sign In" className="w-full p-3 text-xl" onClick={handleSubmit(submitForm)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
