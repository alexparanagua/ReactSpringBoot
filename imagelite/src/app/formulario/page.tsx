'use client'
import {Button, Input, Template, RenderIf} from '@/components'
import Link from 'next/link'
import { useFormik } from 'formik'
import React, { useState } from 'react';
import { useImageService } from '@/resources/image/image.service'

interface FormProps {
    name: string;
    tags: string;
    file: any;
}

const formScheme: FormProps = {name: '', tags: '', file: ''}

export default function FormularioPage() {

    const [imagePreview, setImagePreview] = useState<string>();
    const service = useImageService();

    const formik = useFormik<FormProps>({
        initialValues: formScheme,
        onSubmit : handleSubmit
        //onSubmit: (dados: FormProps) => {
          //  console.log(dados)
        //}
    })

    async function handleSubmit(dados: FormProps) {
        const formData = new FormData();
        formData.append("file",dados.file)
        formData.append("name",dados.name)
        formData.append("tags",dados.tags)
        
        await service.salvar(formData);
        formik.resetForm();
        setImagePreview('');
    }

    function onFileUpload(event : React.ChangeEvent<HTMLInputElement>) {
        if(event.target.files){
            const file = event.target.files[0];
            formik.setFieldValue("file",file);
            const imageURL = URL.createObjectURL(file);
            setImagePreview(imageURL);
        }
    }

    return (
        <Template>
            <section className='flex flex-col items-center justify-center my-5  text-gray-700'>
                <h5 className='mt-3 mb-10 text-3xl font-extrabold tracking-tighter'>Nova Imagem</h5>
                <form onSubmit={formik.handleSubmit}>
                    <div className='grid grid-cols-1'>
                        <label className='block text-sm font-medium leading-9'>Name: *</label>
                        <Input id="name" placeholder="type the image's name" style='w-68' onChange={formik.handleChange}/>
                    </div>
                     <div className='grid grid-cols-1'>
                        <label className='block text-sm font-medium leading-9'>Tags: *</label>
                        <Input id='tags' placeholder='type the tags comma separated' style='w-68' onChange={formik.handleChange}/>
                    </div>
                     <div className='grid grid-cols-1'>
                        <label className='block text-sm font-medium leading-9'>Image: *</label>
                        <div className='mt-2 justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 grid grid-cols-1 text-center'>
                            <RenderIf condition={!imagePreview}>
                                <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                </svg>
                            </RenderIf>
                            <label className='relative cursor-pointer rounded-b-md bg-white font-semibold text-indigo-600'>
                                <RenderIf condition={!imagePreview}>
                                    <span>Click to upload</span>
                                </RenderIf>
                                <RenderIf condition={!!imagePreview}>
                                    <img src={imagePreview} width={250} className='rounded-md'/>
                                </RenderIf>
                                <input type='file' className='sr-only' onChange={onFileUpload}></input>
                            </label>
                          
                        </div>
                    </div>
                    <div className='mt-6 flex items-center justify-center gap-x-10'>
                         <Button color='bg-blue-700' label='Save' type='submit'/>
                         <Link href="/galeria">
                            <Button color='bg-blue-500' label='Cancel'/>
                        </Link>
                    </div>
                </form>
            </section>
        </Template>
    )
}   