import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentResources = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('https://backendfianlsih.azurewebsites.net/doc_db/documents');
        setDocuments(response.data);
      } catch (err) {
        setError('Failed to fetch resources');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className='min-h-screen bg-white p-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold text-[#2F4550] mb-2'>Resources</h1>
        <p className='text-gray-600 mb-8'>Access your learning materials and documents</p>

        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#CE4760]'></div>
          </div>
        ) : error ? (
          <div className='bg-red-50 border-l-4 border-[#CE4760] p-4 mb-8'>
            <p className='text-[#CE4760]'>{error}</p>
          </div>
        ) : (
          <div className='bg-white rounded-xl shadow-xl overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead>
                  <tr className='bg-gradient-to-r from-[#2F4550] to-[#445c69]'>
                    <th className='px-6 py-4 text-left text-sm font-semibold text-white tracking-wider'>
                      Document Name
                    </th>
                    <th className='px-6 py-4 text-right text-sm font-semibold text-white tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {documents.map((doc, index) => (
                    <tr
                      key={index}
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        } `}
                    >
                      <td className='px-6 py-4'>
                        <div className='flex items-center'>
                          <svg
                            className='h-5 w-5 text-[#2F4550] mr-3'
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                          </svg>
                          <div>
                            <div className='text-sm font-medium text-[#2F4550]'>
                              {doc.document_id.replace(/-/g, ' ').replace('.pdf', '')}
                            </div>
                            <div className='text-sm text-gray-500'>
                              PDF Document
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 text-right'>
                        <button
                          onClick={() => window.open(doc.s3_url, '_blank')}
                          className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#CE4760] hover:bg-[#2F4550] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CE4760] transition-colors duration-150 ease-in-out'
                        >
                          <svg
                            className='-ml-1 mr-2 h-5 w-5'
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                            <path d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                          </svg>
                          View Document
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {documents.length === 0 && (
                <div className='text-center py-12'>
                  <svg
                    className='mx-auto h-12 w-12 text-[#2F4550]'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' />
                  </svg>
                  <h3 className='mt-2 text-sm font-medium text-[#2F4550]'>No documents</h3>
                  <p className='mt-1 text-sm text-gray-500'>No resources are available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentResources;