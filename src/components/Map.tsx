import React from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { FeatureGroup, LatLngTuple, Map as LeafletMap, Marker as LeafletMarker } from 'leaflet'
import { MapMarker, SubsurfaceDivelog } from '../model/model'
import { getLatLong } from '../utils/mapUtils'
import { filterDivesBySite } from '../utils/logbookUtils'
import DiveSiteMarker from './DiveSiteMarker'

const DEFAULT_ZOOM = 13
const DEFAULT_LAT_LONG: LatLngTuple = [0, 0]

interface MapProps {
  subsurfaceLog?: SubsurfaceDivelog
}

const Map = (props: MapProps): React.ReactElement => {
  const [map, setMap] = React.useState<LeafletMap | null>(null)
  const [position, setPosition] = React.useState<LatLngTuple | null>(null)
  const [markers, setMarkers] = React.useState<MapMarker[]>([])

  React.useEffect(() => {
    if (props.subsurfaceLog) {
      const newMarkers = props.subsurfaceLog.divelog.divesites[0].site.map((s) => {
        const marker: MapMarker = new LeafletMarker(getLatLong(s.$, DEFAULT_LAT_LONG), {
          title: s.$.name,
        })
        marker.subsurfaceId = s.$.uuid
        return marker
      })

      setMarkers(newMarkers)
      fitAll(newMarkers)
    }
  }, [props.subsurfaceLog])

  const fitAll = (markers: LeafletMarker[]): void => {
    if (map && markers.length) {
      const group = new FeatureGroup()
      markers.forEach((marker: LeafletMarker) => marker.addTo(group))
      map.fitBounds(group.getBounds())
    }
  }

  React.useEffect(() => {
    try {
      if (!position) {
        navigator.geolocation.getCurrentPosition((geolocation) => {
          const location: LatLngTuple = [geolocation.coords.latitude, geolocation.coords.longitude]
          setPosition(location)
        })
      }
    } catch (e) {
      setPosition(DEFAULT_LAT_LONG)
    }
  }, [])

  return (
    <div className="relative z-10">
      {position && (
        <MapContainer center={position} zoom={DEFAULT_ZOOM} whenCreated={setMap}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {position && <Marker position={position} />}
          {props.subsurfaceLog &&
            markers.map((m) => (
              <DiveSiteMarker
                key={m.getElement()?.id}
                marker={m}
                dives={filterDivesBySite(
                  props.subsurfaceLog?.divelog.dives[0].dive || [],
                  m.subsurfaceId
                )}
              />
            ))}
        </MapContainer>
      )}
    </div>
  )
}

export default Map
