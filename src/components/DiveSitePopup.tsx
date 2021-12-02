import { Popup } from 'react-leaflet'
import React from 'react'
import { Marker as LeafletMarker } from 'leaflet'
import { SubsurfaceDive } from '../model/model'

interface DiveSitePopupProps {
  marker: LeafletMarker
  dives: SubsurfaceDive[]
}

const DiveSitePopup = ({ marker, dives }: DiveSitePopupProps): React.ReactElement => {
  return (
    <Popup>
      <h2 className="text-lg mb-2">{marker.options.title}</h2>
      <div className="text-base">{`${dives.length} ${dives.length !== 1 ? 'dives' : 'dive'}`}</div>
    </Popup>
  )
}

export default DiveSitePopup
