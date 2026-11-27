'use client'

import { Template, RenderIf, Input, Button, FieldError, useNotification } from "@/components"
import { useState } from "react"
import { LoginForm, formScheme, validationScheme } from './formScheme'
import { useFormik } from 'formik'
import { useAuth } from '@/resources'
import { useRouter } from 'next/navigation'
import { AccessToken, Credentials, User } from '@/resources/user/user.resource'

export default function Login(){
    const [loading, setLoading] = useState<boolean>(false);
    const [newUserState, setNewUserState] = useState<boolean>(false);

    const auth = useAuth();
    const notification = useNotification();
    const router = useRouter();

    const {values,handleChange,handleSubmit,errors, resetForm} = useFormik<LoginForm>({
        initialValues: formScheme,
        validationSchema: validationScheme,
        onSubmit: fOnSubmit
    })

    async function fOnSubmit(values:LoginForm) {
        if(!newUserState) {
            const credentials : Credentials = { email: values.email, password: values.password }
            try {
                const accessToken: AccessToken = await auth.authenticate(credentials);
                auth.initSession(accessToken);
                router.push('/galeria');
            } catch( error: any) {
                const message = error?.message;
                notification.notify(message, "error");
            }
        } else {
            const user: User = {email: values.email, name: values.name, password: values.password}
            try {
                await auth.save(user);
                notification.notify("Success on saving user!", "success");
                resetForm();
                setNewUserState(false);
            } catch(error:any) {
                const message = error?.message;
                notification.notify(message, "error")
            }
        }
    }

    return (
        <Template loading={loading}>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-gray-900 mt-10 text-center text-1xl font-bold leading-9 tracking-tight">
                        {newUserState ? 'Create New User' : 'Login to your account'}
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-2" onSubmit={handleSubmit}>
                        <RenderIf condition={newUserState}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Name:</label>
                            </div>
                            <div className="mt-2">
                                <Input style="w-full" id="name" value={values.name} onChange={handleChange}/>
                                <FieldError error={errors.name}/>
                            </div>
                        </RenderIf>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Email:</label>
                        </div>
                        <div className="mt-2">value={values.email}
                            <Input style="w-full" id="email" value={values.email} onChange={handleChange}/>
                            <FieldError error={errors.email}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
                        </div>
                        <div className="mt-2">
                            <Input style="w-full" id="password" type="password" value={values.password} onChange={handleChange}/>
                            <FieldError error={errors.password}/>
                        </div>
                        <RenderIf condition={newUserState}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Re-Password:</label>
                            </div>
                            <div className="mt-2">
                                <Input style="w-full" id="passwordMatch" type="password" value={values.passwordMatch} onChange={handleChange}/>
                                <FieldError error={errors.passwordMatch}/>
                            </div>
                        </RenderIf>
                        <div className="space-x-3 text-center">
                            <RenderIf condition={newUserState}>
                                <Button type="submit" style='bg-indigo-800 hover:bg-indigo-300' label="Save"/>
                                <Button type="button" style='bg-indigo-600 hover:bg-indigo-300' label="Cancel" onClick={event => setNewUserState(false)}/>
                            </RenderIf>
                            <RenderIf condition={!newUserState}>
                                <Button type="submit" style='bg-indigo-800 hover:bg-indigo-300' label="Login"/>
                                <Button type="button" style='bg-indigo-600 hover:bg-indigo-300' label="Sign Up" onClick={event => {setNewUserState(true)}}/>
                            </RenderIf>
                        </div>
                    </form>

                </div>
            </div>
        </Template>
    )
}