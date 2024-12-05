import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

const SinglePagePDFViewer = ({ pdfFile }) => {
  const [pageNumber, setPageNumber] = useState(1); // State for the page to display

  return (
    <div className="flex flex-col items-center">
      <Document
        file={pdfFile}
        onLoadSuccess={({ numPages }) =>
          console.log(`Loaded a document with ${numPages} pages.`)
        }
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="mt-4">
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber(pageNumber - 1)}
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {pageNumber}
        </span>
        <button
          onClick={() => setPageNumber(pageNumber + 1)}
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SinglePagePDFViewer;
