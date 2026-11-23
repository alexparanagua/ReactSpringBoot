'use client'

import { Template, RenderIf, Input } from "@/components"
import { useState } from "react"

export default function Login(){
    const [loading, setLoading] = useState<boolean>(false);
    const [newUserState, setNewUserState] = useState<boolean>(true);

    return (
        <Template loading={loading}>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-gray-900 mt-10 text-center text-1xl font-bold leading-9 tracking-tight">
                        Login to your account
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-2">
                        <RenderIf condition={newUserState}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Name:</label>
                            </div>
                            <div className="mt-2">
                                <Input style="w-full" id="name"/>
                            </div>
                        </RenderIf>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Email:</label>
                        </div>
                        <div className="mt-2">
                            <Input style="w-full" id="email"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
                        </div>
                        <div className="mt-2">
                            <Input style="w-full" id="password" type="password"/>
                        </div>
                        <RenderIf condition={newUserState}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Re-Password:</label>
                            </div>
                            <div className="mt-2">
                                <Input style="w-full" id="passwordMatch" type="password"/>
                            </div>
                        </RenderIf>
                    </form>

                </div>
            </div>
        </Template>
    )
}