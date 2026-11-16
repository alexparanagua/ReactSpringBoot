'use client'

import { Template, ImageCard } from '@/components'
import { Image } from '@/resources/image/image.resource'
import { useImageService } from '@/resources/image/image.service'
import { useState } from 'react'

export default function GaleriaPage() {

  const useService = useImageService();
  const [images, setImages] = useState<Image[]>([])

  async function searchImage(){
    const result = await useService.buscar();
    setImages(result);
    console.table(images)
  }

  function renderImageCard(image: Image) {
    return (
      <ImageCard nome={image.name} tamanho={image.size} dataUpload={image.uploadDate} src={image.url}/>
    )
  }

  function renderImageCards() {
    return images.map(renderImageCard)
  }

  return (
    <Template>
      <div className='border-4'>
        <button className='bg-gray-500' onClick={searchImage}>Mudar Imagem</button>
      </div>
      <section className='grid grid-cols-4 gap-8'>

        {
          renderImageCards()
        }

      </section>
    </Template>
  )
}