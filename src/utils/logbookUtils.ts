import { SubsurfaceDive } from '../model/model'

export const filterDivesBySite = (dives: SubsurfaceDive[], siteId?: string): SubsurfaceDive[] => {
  if (!siteId) {
    return []
  }

  return dives.filter((d) => d.$.divesiteid === siteId)
}
