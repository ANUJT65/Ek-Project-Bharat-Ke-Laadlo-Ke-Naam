import React, { useState, useEffect } from 'react';
import TeacherSidebar from '../components/TeacherSidebar';
import Navbar2 from '../components/Navbar2';
import { useParams } from 'react-router-dom';
import VideoMCQs from '../components/VideoMCQs';
import VideoNotes from '../components/VideoNotes';
import VideoMindmap from './VideoMindmap';
import VideoTranscript from './VideoTranscript';
import axios from 'axios';

const SingleResourcePage = () => {
    const { id } = useParams();
    const [videoDetails, setVideoDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://backendfianlsih.azurewebsites.net/dy_db/get_video_details/${id}`);
                setVideoDetails(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching video details:', error);
                setError('Failed to load video details');
            } finally {
                setLoading(false);
            }
        };

        fetchVideoDetails();
    }, [id]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    if (!videoDetails) {
        return <div className="flex justify-center items-center h-screen">No video details found</div>;
    }

    return (
        <div className="font-inter flex h-screen">
            <TeacherSidebar />
            <div className="flex flex-col w-full overflow-auto">
                <Navbar2 type="Teacher" />

                <div className="p-4 bg-gray-200 h-full overflow-auto">
                    <div className="bg-white rounded-lg p-4 mb-4">
                        <h1 className="text-xl font-bold ">Resource: {id}</h1>
                        <div className="text-md text-gray-800">
                            Video URL: 
                            <a 
                                href={videoDetails.video_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 ml-2"
                            >
                                {videoDetails.video_url}
                            </a>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 mb-4">
                        <h2 className="text-xl font-bold">MCQs</h2>
                        <div className="grid grid-cols-3 gap-4">
                            <VideoMCQs type="Easy" videoId={id} />
                            <VideoMCQs type="Medium" videoId={id} />
                            <VideoMCQs type="Hard" videoId={id} />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 mb-4">
                        <h2 className="text-xl font-bold">Resources</h2>
                        <div className="grid grid-cols-3 gap-4">
                            <VideoNotes 
                                pdfUrl={JSON.parse(videoDetails.notes).pdf_url}
                                title={id}
                            />
                            <VideoMindmap 
                                mindMapUrls={videoDetails.mind_map.urls}
                            />
                            <VideoTranscript videoId={id} />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                        <h2 className="text-xl font-bold">Image Links</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {Object.entries(videoDetails.image_links).map(([key, url]) => (
                                <div 
                                    key={key} 
                                    className="flex flex-col items-center bg-gray-50 rounded-lg p-4"
                                >
                                    <h3 className="text-lg font-bold mb-2">{key}</h3>
                                    <img 
                                        src={url} 
                                        alt={key} 
                                        className="w-full h-48 object-cover rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleResourcePage;
