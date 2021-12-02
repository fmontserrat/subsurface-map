import React from 'react'
import './App.css'
import Map from './components/Map'
import { SubsurfaceDivelog } from './model/model'
import FileUpload from './components/FileUpload'

const App = (): React.ReactElement => {
  const [divelog, setDivelog] = React.useState<SubsurfaceDivelog | undefined>()

  const onLoadLogbook = async (result: unknown): Promise<void> => {
    // TODO some validation and error handling
    setDivelog(result as SubsurfaceDivelog)
  }

  return (
    <div className="relative">
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-50">
        <FileUpload onUpload={onLoadLogbook} />
      </div>
      <Map subsurfaceLog={divelog} />
    </div>
  )
}

export default App
