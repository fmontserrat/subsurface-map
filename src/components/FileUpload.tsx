import React from 'react'
import xml2js from 'xml2js'
import { useDropzone } from 'react-dropzone'

interface FileUploadProps {
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>
}

const FileUpload = (props: FileUploadProps): React.ReactElement => {
  const [loading, setLoading] = React.useState(false)

  const onChange = async (files: File[]): Promise<void> => {
    const file = files[0]

    if (!file) {
      return
    }

    setLoading(true)
    const reader = new FileReader()
    reader.onload = async (e: ProgressEvent<FileReader>): Promise<void> => {
      if (!e.target?.result) {
        return
      }

      const text = e.target.result.toString()

      xml2js.parseString(text, async (err, result) => {
        if (err) {
          throw err
        }

        await props.onUpload(result)
        setLoading(false)
      })
    }

    reader.readAsText(file)
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onChange,
    maxFiles: 1,
    disabled: loading,
  })

  return (
    <div
      {...getRootProps({ className: 'dropzone' })}
      className="m-4 bg-white max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
      <div className="space-y-1 text-center">
        <img src="/subsurface-icon.png" alt="subsurface" className="mx-auto mb-4 h-12 w-12" />
        <div className="flex text-sm text-gray-600">
          <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            <span>Upload a file</span>
            <input {...getInputProps()} />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500">Subsurface XML file</p>
      </div>
    </div>
  )
}

export default FileUpload
