import { useRouter } from "next/router"
import {format} from 'date-fns'

import Footer from "../components/Footer"
import Header from "../components/Header"
import {SearchResults} from '../types/search'
import InfoCard from "../components/InfoCard"
import MapBox from "../components/MapBox"

interface Props {
  results: SearchResults[]
}

function Search({results}: Props) {
  const router = useRouter()
  const {location, startDate, endDate, guests} = router.query
  const formattedStartDate = format(new Date(startDate as string), 'dd MMMM yyyy')
  const formattedEndDate = format(new Date(endDate as string), 'dd MMMM yyyy')
  const range = `${formattedStartDate} - ${formattedEndDate}`

  return <div className="">             
    <Header placeholder={`${location} | ${range} | ${guests} guests`} />

    <main className="flex">
      <section className="flex-grow pt-14 px-6">
        <p className="text-xs">300+ Stays - {range} - for {guests} guests</p>
        <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>

        {/* Filters */}
        <div className="hidden lg:inline-flex mb-4 space-x-3 text-gray-800 whitespace-nowrap">
          <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 transition transform ease-out duration-100">Cancellation Policy</p>
          <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 transition transform ease-out duration-100">Type of Place</p>
          <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 transition transform ease-out duration-100">Price</p>
          <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 transition transform ease-out duration-100">Rooms and Beds</p>
          <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 transition transform ease-out duration-100">More Filters</p>
        </div>

        {results?.map(({img, location, title, description, star, price, total, long, lat}) => (
          <div key={img}>
            <InfoCard img={img} location={location} title={title} description={description} star={star} price={price} total={total} long={long} lat={lat} />
          </div>
        ))}
      </section>
    
      <section className="hidden xl:inline-flex lg:min-w-[450px] xl:min-w-[600px] cursor-grab">
        <MapBox results={results} />
      </section>
    </main>

    <Footer />
  </div>
}

export async function getServerSideProps() {
  const searchResults = await fetch(`${process.env.VERCEL_URL}/api/search`).then((result) => result.json())

  return {
    props: {
      results: searchResults
    }
  }
}

export default Search