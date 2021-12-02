import { Marker } from 'react-leaflet'
import React from 'react'
import { Marker as LeafletMarker } from 'leaflet'
import { SubsurfaceDive } from '../model/model'
import DiveSitePopup from './DiveSitePopup'

interface DiveSiteMarkerProps {
  marker: LeafletMarker
  dives: SubsurfaceDive[]
}

const DiveSiteMarker = ({ marker, dives }: DiveSiteMarkerProps): React.ReactElement => {
  return (
    <Marker position={marker.getLatLng()} title={marker.options.title}>
      <DiveSitePopup dives={dives} marker={marker} />
    </Marker>
  )
}

export default DiveSiteMarker
