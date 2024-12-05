import React from 'react'
import SinglePagePDFViewer from '../components/SinglePagePDFViewer'

const PDFTest = () => {
  return (
    <div>
      <h1 className="text-2xl text-center my-5">Single Page PDF Viewer</h1>
      <SinglePagePDFViewer pdfFile="/samplePDF.pdf" />
    </div>
  )
}

export default PDFTest