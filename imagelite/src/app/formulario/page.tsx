import {Template} from '@/components'
import Link from 'next/link'

export default function FormularioPage() {
    return (
        <Template>
            <Link href="/galeria">
            <button className='bg-blue-400 text-white px-4 py-2 rounded-lg border hover:bg-gray-200'>Voltar</button>
          </Link>

        </Template>
    )
}   