import Image from 'next/image'
import { useRouter } from 'next/router';
import { useState } from 'react'
import {MagnifyingGlassIcon, GlobeAltIcon, Bars3Icon, UserCircleIcon, UsersIcon} from '@heroicons/react/24/outline'
import { DateRangePicker, RangeKeyDict } from 'react-date-range';

import 'react-date-range/dist/styles.css'; // React Date Range: main css file
import 'react-date-range/dist/theme/default.css'; // React Date Range: theme css file

interface Props {
  placeholder?: string
}

function Header({placeholder}: Props) {
  const router = useRouter()

  const [numGuests, setNumGuests] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const selectionRange = {
    startDate,
    endDate,
    key: 'selection'
  }

  const handleDateSelect = (ranges: RangeKeyDict) => {
    setStartDate(ranges.selection.startDate as Date)
    setEndDate(ranges.selection.endDate as Date)
  }

  const handleCancel = () => {
    setNumGuests(1)
    setSearchInput('')
    setStartDate(new Date())
    setStartDate(new Date())
  }

  const handleSearch = () => {
    const url = 
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        guests: numGuests
      }
    })
  }

  return (
    <header className='sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10'>

      {/* Left - Logo */}
      <div onClick={() => router.push('/')} className='relative flex items-center h-10 cursor-pointer'>
        <Image src='https://links.papareact.com/qd3' alt='airbnb' layout='fill' objectFit='contain' objectPosition='left'/>
      </div>

      {/* Middle - Search */}
      <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm'>
        <input placeholder={placeholder || 'Start your search'} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className='flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder:text-gray-400' type='text'/>
        <MagnifyingGlassIcon className='hidden md:inline-flex h-8 bg-red-400 rounded-full text-white p-2 cursor-pointer md:mx-2' />
      </div>

      {/* Right */}
      <div className='flex items-center space-x-4 justify-end text-gray-500'>
        <p className='hidden md:inline-flex cursor-pointer'>Become a host</p>
        <GlobeAltIcon className='h-6 cursor-pointer' />
        <div className='flex items-center space-x-2 border-2 p-2 rounded-full'>
          <Bars3Icon className='h-6 cursor-pointer' />
          <UserCircleIcon className='h-6 cursor-pointer' />
        </div>
      </div>

      {searchInput && (
        <div className='flex flex-col col-span-3 mx-auto mt-2'>
          <DateRangePicker
            minDate={new Date()}
            ranges={[selectionRange]}
            rangeColors={["#FD5B61"]}
            onChange={handleDateSelect}
          />
          <div className='flex items-center border-b mb-4'>
            <h2 className='text-xl font-semibold flex-grow'>Number of Guests</h2>
            <UsersIcon className='h-5' />
            <input type="number" min={1} value={numGuests} onChange={(e) => setNumGuests(e.target.value as any)} className='w-12 pl-2 text-lg outline-none text-red-400'  />
          </div>
          <div className='flex justify-between mx-auto space-x-16'>
            <button onClick={handleCancel} className='text-white px-4 py-2 rounded-xl bg-red-400'>Cancel</button>
            <button onClick={handleSearch} className='text-white px-4 rounded-xl bg-red-400'>Search</button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header