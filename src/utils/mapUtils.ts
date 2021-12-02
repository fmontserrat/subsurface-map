import { SubsurfaceSiteModel } from '../model/model'
import { LatLngTuple } from 'leaflet'

export const getLatLong = (site: SubsurfaceSiteModel, fallback: LatLngTuple): LatLngTuple =>
  (site.gps?.split(' ').map((p) => Number(p)) as LatLngTuple) || fallback
