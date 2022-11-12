import Image from 'next/image'

import {LargeCard} from '../types/home'

function LargeCard({img, title, description, buttonText}: LargeCard) {
  return (
    <section className='relative mt-16'>
      <div className='relative h-96 min-w-[300px]'>
        <Image className='rounded-2xl' src={img} alt={title} layout='fill' objectFit='cover' />
      </div>

      <div className='absolute top-16 left-12'>
        <h3 className='text-4xl mb-3 w-64'>{title}</h3>
        <p>{description}</p>

        <button className='cursor-pointer text-sm text-white bg-gray-900 px-4 py-2 rounded-lg mt-5 hover:scale-105 transition transform duration:300 ease-out'>{buttonText}</button>
      </div>
    </section>
  )
}

export default LargeCard