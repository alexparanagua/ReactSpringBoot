'use client'

import { Template, ImageCard, Button, Input, Select, SelectOption, useNotification } from '@/components'
import { Image } from '@/resources/image/image.resource'
import { useImageService } from '@/resources/image/image.service'
import { useState } from 'react'
import Link from 'next/link'

export default function GaleriaPage() {

  const useService = useImageService();
  const notification = useNotification();
  const [images, setImages] = useState<Image[]>([])
  const [query, setQuery] = useState<string>('')
  const [extension, setExtesion] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const formatOptions: SelectOption[] = [
    { value: "", label: "All Formats" },
    { value: "PNG", label: ".png" },
    { value: "GIF", label: ".gif" },
    { value: "JPEG", label: ".jpeg" },
  ];

  async function searchImage(){
    setLoading(true)
    const result = await useService.buscar(query, extension);
    setImages(result);
    await sleep(500); // Espera 1/2 segundo
    setLoading(false);

    if(!result.length){
      notification.notify('No result found!','warning')
    }
  }

  function renderImageCard(image: Image) {
    return (
      <ImageCard key={image.url} nome={image.name} tamanho={image.size} dataUpload={image.uploadDate} src={image.url} extension={image.extension}/>
    )
  }

  function renderImageCards() {
    return images.map(renderImageCard)
  }

  return (
    <Template loading={loading}>
      <section className='flex flex-col items-center justify-center my-5'>
        <div className='flex space-x-4'>
          <Input value={query} onChange={event => setQuery(event.target.value)} placeholder='Ditige nome ou tag'/>
          <Select options={formatOptions} value={extension} change={event => setExtesion(event.target.value)}/>
          <Button label='Search' onClick={searchImage} color='bg-blue-800'/>
          <Button label='Limpar' onClick={()=> {setQuery(''); setExtesion('')}} color='bg-blue-600'/>
          <Link href="/formulario">
            <Button label='New' onClick={()=>{}} color='bg-blue-400'/>
          </Link>
        </div>
      </section>
      <section className='grid grid-cols-4 gap-8'>
        {
          renderImageCards()
        }
      </section>
    </Template>
  )
}