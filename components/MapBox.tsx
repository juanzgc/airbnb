import { useState } from 'react'
import Map, {Marker, Popup} from 'react-map-gl'
import {getCenter} from 'geolib'

import {SearchResults} from '../types/search'

interface Props {
  results: SearchResults[]
}
const styleUrl = 'mapbox://styles/juanzgc/cladfgc3s000214s28cyt8d3k'

function MapBox({results}: Props) {
  const coordinates = results?.map(res => {
    return {
      latitude: res.lat,
      longitude: res.long
    }
  })

  const center = getCenter(coordinates)
  const [viewport, setViewport] = useState({
    latitude: typeof center !== 'boolean' ? center.latitude : results[0].lat,
    longitude: typeof center !== 'boolean' ? center.longitude : results[0].long,
    width: '100%',
    height: '100%',
    zoom: 11
  })

  return <Map
    {...viewport}
    mapStyle={styleUrl}
    mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    onViewportChange={(vp: any) => setViewport(vp)}
  >
    {
      results?.map(result => (
        <div key={result.long}>
          <Marker longitude={result.long} latitude={result.lat}>
            <p className='cursor-pointer text-2xl animate-bounce'>📌</p>
          </Marker>
        </div>
      ))
    }
  </Map>
}

export default MapBox