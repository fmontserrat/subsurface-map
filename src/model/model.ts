import { Marker as LeafletMarker } from 'leaflet'

export interface SubsurfaceDivelog {
  divelog: {
    dives: { dive: SubsurfaceDive[] }[]
    divesites: { site: SubsurfaceSite[] }[]
  }
}

export interface SubsurfaceDive {
  $: {
    date: string
    time: string
    duration: string
    visibility?: string
    tags?: string
    divesiteid: string
    number: number
  }
  weightsystem?: Weight | Weight[]
  notes?: string[]
  divecomputer: {
    $: {
      model: string
      diveid: string
    }
    depth: {
      $: {
        max: string
        mean: string
      }
    }[]
    temperature: {
      $: {
        air: string
        water: string
      }
    }[]
    event: DiveComputerEvent[]
    sample: DiveComputerSample[]
  }[]
}

export interface Weight {
  $: {
    weight: string
    description: string
  }
}

export interface DiveSampleModel {
  time: string
  depth: string
  temp?: string
}

export interface DiveSampleView {
  time: number
  depth: number
  temp?: number | null
}

export interface DiveEventModel {
  time: string
  type: string
  flags?: string
  name: string
  o2: string
  cylinder?: string
}

export interface DiveEventView {
  time: number
  type: string
  flags?: string
  name: string
  o2: string
  cylinder?: string
}

export interface DiveComputerEvent {
  $: DiveEventModel
}

export interface DiveComputerSample {
  $: DiveSampleModel
}

export interface DiveView {
  samples: DiveSampleView[]
  events: DiveEventView[]
}

export interface SubsurfaceSite {
  $: SubsurfaceSiteModel
}

export interface SubsurfaceSiteModel {
  uuid: string
  name: string
  gps: string
}

export interface MapMarker extends LeafletMarker {
  subsurfaceId?: string
}
