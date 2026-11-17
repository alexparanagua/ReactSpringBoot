'use client'

import { Template, ImageCard } from '@/components'
import { Image } from '@/resources/image/image.resource'
import { useImageService } from '@/resources/image/image.service'
import { useState } from 'react'
import Link from 'next/link'

export default function GaleriaPage() {

  const useService = useImageService();
  const [images, setImages] = useState<Image[]>([])
  const [query, setQuery] = useState<string>('')
  const [extension, setExtesion] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  async function searchImage(){
    setLoading(true)
    const result = await useService.buscar(query, extension);
    setImages(result);
    await sleep(1000); // Espera 1 segundo
    setLoading(false)
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
          <input type='text' className='border px-5 py-2 rounded-lg text-gray-900' value={query} onChange={event => setQuery(event.target.value)}/>
          <select className='border px-4 py-2 rounded-lg text-gray-900' value={extension} onChange={event => setExtesion(event.target.value)}>
            <option value="">All Formats</option>
            <option value="PNG">.png</option>
            <option value="GIF">.gif</option>
            <option value="JPEG">.jpeg</option>
          </select>
          <button className='bg-blue-800 text-white px-4 py-2 rounded-lg border hover:bg-gray-800' onClick={searchImage}>Search</button>
          <button className='bg-blue-600 text-white px-4 py-2 rounded-lg border hover:bg-gray-400' onClick={()=> {setQuery(''); setExtesion('')}}>Limpar</button>
          <Link href="/formulario">
            <button className='bg-blue-400 text-white px-4 py-2 rounded-lg border hover:bg-gray-200'>Add New</button>
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