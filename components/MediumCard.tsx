import Image from 'next/image'

import {Cards} from '../types/home'

function MediumCard({img, title}: Cards) {
  return (
    <div className='cursor-pointer hover:scale-105 transition transform duration:300 ease-out'>
      <div className='relative h-80 w-80'>
        <Image className='rounded-xl' src={img} layout="fill" alt={title} />
      </div>

      <h3 className='text-2xl mt-3'>{title}</h3>
    </div>
  )
}

export default MediumCard