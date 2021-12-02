import React from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { Map as LeafletMap } from 'leaflet'

export const MAX_ZOOM = 17
export const MIN_ZOOM = 2
export const DEFAULT_ZOOM = 13

const defaultLatLng: L.LatLngTuple = [0, 0]

const Map = (): React.ReactElement => {
  const [, setMap] = React.useState<LeafletMap | null>(null)
  const [position, setPosition] = React.useState<L.LatLngTuple | null>(null)

  React.useEffect(() => {
    try {
      if (!position) {
        navigator.geolocation.getCurrentPosition((geolocation) => {
          const location: L.LatLngTuple = [
            geolocation.coords.latitude,
            geolocation.coords.longitude,
          ]
          setPosition(location)
        })
      }
    } catch (e) {
      setPosition(defaultLatLng)
    }
  }, [])

  return (
    <div className="relative">
      {position && (
        <MapContainer center={position} zoom={DEFAULT_ZOOM} whenCreated={setMap}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {position && <Marker position={position} />}
        </MapContainer>
      )}
    </div>
  )
}

export default Map
