'use client'

import { Template, ImageCard } from '@/components'
import { useState } from 'react'

export default function GaleriaPage() {

  const image1 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsz86YiUuRFFln_SgGuw6zovzYpkXaJYrk4QYGQhGJOg&s=10';
  const image2 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRonGnzFxQkiNafzV7NnKvzWcn7PpikmaCpTHEg6RJ8Rjn_5JdR8lz2Riki&s=10';
  const image3 = 'https://media.istockphoto.com/id/494543697/photo/baby-girl-in-nature.jpg?s=612x612&w=0&k=20&c=zk92DHEPwwHU3bsQbrenu0KLGgp5BU3H06HqNEC8zis='

  const nome1 = 'Arvores Dia';
  const nome2 = 'Arvores Noite';
  const nome3 = 'Criança Grama';

  const [codigoImage, setCodigoImage] = useState<number>(1);
  const [urlImage, setUrlImage] = useState<string>(image1);
  const [nomeImage, setNomeImage] = useState<string>(nome1);

  function mudarImagem(){
    if(codigoImage ==1) {
      setCodigoImage(2)
      setUrlImage(image2)
      setNomeImage(nome2)
    } else {
      if (codigoImage ==2) {
        setCodigoImage(3)
        setUrlImage(image3)
        setNomeImage(nome3)
      } else {
        setCodigoImage(1)
        setUrlImage(image1)
        setNomeImage(nome1)
      }
    }
  }

  return (
    <Template>
      <div className='border-4'>
        <button className='bg-gray-500' onClick={mudarImagem}>Mudar Imagem</button>
      </div>
      <section className='grid grid-cols-4 gap-8'>

        <ImageCard nome={nomeImage} tamanho='46' dataUpload='01/11/1980' src={urlImage}/>
        <ImageCard nome={nomeImage} tamanho='46' dataUpload='01/11/1980' src={urlImage}/>
        <ImageCard nome={nomeImage} tamanho='46' dataUpload='01/11/1980' src={urlImage}/>
        <ImageCard nome={nomeImage} tamanho='46' dataUpload='01/11/1980' src={urlImage}/>
      </section>
    </Template>
  )
}