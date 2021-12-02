import { SubsurfaceDive } from '../model/model'

export const countDivesInSite = (dives: SubsurfaceDive[], siteId?: string): number => {
  if (!siteId) {
    return 0
  }

  return dives.filter((d) => d.$.divesiteid === siteId).length
}
