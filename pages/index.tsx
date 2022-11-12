import { InferGetStaticPropsType } from 'next'
import { GetStaticProps } from 'next'
import Head from 'next/head'

import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LargeCard from '../components/LargeCard'
import MediumCard from '../components/MediumCard'
import SmallCard from '../components/SmallCard'
import {Cards, Explore, Props} from '../types/home'


function Home({exploreData, cardsData}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Head>
        <title>Airbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      {/* Banner */}
      <Banner />

      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
        <section className='pt-6'>
          <h2 className='text-4xl font-semibold pb-5'>Explore nearby</h2>

          {/* Pull data from server */}
          <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {
              exploreData?.map(({img, location, distance}) => (
                <SmallCard img={img} location={location} distance={distance} key={img} />
              ))
            }
          </div>
        </section>

        <section>
          <h2 className='text-4xl font-semibold py-8'>Live Anywhere</h2>

          <div className='flex space-x-3 overflow-x-scroll scrollbar-hide p-3 -ml-3'>
          {
            cardsData?.map(({img, title}) => (
              <MediumCard key={img} img={img} title={title} />
            ))
          }
          </div>
        </section>

        <LargeCard 
          img='https://links.papareact.com/4cj'
          title='The Greatest Outdoors'
          description='Wishlists curated by Airbnb'
          buttonText='Get Inspired'
        />
      </main>

      <Footer />

    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  // const exploreData: Explore[] = await fetch(`https://${process.env.VERCEL_URL}/api/explore`)
  //   .then(res => res.json())

  // const cardsData: Cards[] = await fetch(`https://${process.env.VERCEL_URL}/api/cards`)
  //   .then(res => res.json())
  const exploreData: Explore[] = []
  const cardsData: Cards[] = []

  return {
    props: {
      exploreData,
      cardsData
    }
  }
}

export default Home
