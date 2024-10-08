"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { videoDB } from '../../../firebase/Config'; // Import the correct storage instance for videos
import Image from 'next/image'; // Import Image from next/image
import ClientReview from '../../../models/ClientReviewModel';
import axios from 'axios'; // Import axios for HTTP requests

// Modal Component for Video Recording
interface VideoModalProps {
  isVisible: boolean;
  onClose: () => void;
  startRecording: () => void;
  stopRecording: () => void;
  isRecording: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isVisible,
  onClose,
  startRecording,
  stopRecording,
  isRecording,
  videoRef,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-md">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-black text-center">Video Recording</h2>
        <div className="flex justify-center mb-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline // Ensures inline playback on mobile
            className="border w-full h-auto max-h-64"
          ></video>
        </div>
        <div className="flex justify-center mb-4">
          {!isRecording ? (
            <button className="btn btn-primary text-black" onClick={startRecording}>
              Start Recording
            </button>
          ) : (
            <button className="btn btn-danger text-black" onClick={stopRecording}>
              Stop Recording
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Page: React.FC = () => {
  const { spaceName } = useParams();

  interface FormData {
    spaceName: string;
    spaceLogo: string;
    headerTitle: string;
    customField: string;
    collectionType: string;
    imgUrl: string;
    questions: string[]; // Define questions as an array of strings
  }

  const [formData, setFormData] = useState<FormData | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientEmail, setClientEmail] = useState<string>(''); // New state for email input
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('formData');
    if (data) {
      setFormData(JSON.parse(data)); // Parse JSON data
    }
  }, []); // Runs once on component mount

  const startRecording = async () => {
    try {
      setError(null); // Clear any existing errors
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play(); // Ensure the video element plays the stream
      }

      const options: MediaRecorderOptions = { mimeType: 'video/webm' };
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      recordedChunksRef.current = [];

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = handleStop;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing media devices.', error);
      setError('Error accessing media devices. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    if (videoRef.current && videoRef.current.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
    }
  };

  const handleStop = async () => {
    const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
    const file = new File([blob], 'recorded-video.webm', { type: 'video/webm' });

    try {
      setIsUploading(true);
      const storageRef = ref(videoDB, `videos/${file.name}`); // Use videoDB for video storage
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Monitor upload progress if needed
        },
        (error) => {
          console.error('Upload failed:', error);
          setError('Upload failed. Please try again.');
          setIsUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setDownloadUrl(downloadURL);
          setIsUploading(false);
          await saveClientReview(downloadURL); // Save the client review after upload
        }
      );
    } catch (error) {
      console.error('Upload failed:', error);
      setError('Upload failed. Please try again.');
      setIsUploading(false);
    }
  };

  const saveClientReview = async (videoUrl: string) => {
    try {
      const response = await axios.post('/api/clientReview', {
        clientEmail: clientEmail,
        spaceName: spaceName,
        videoUrl: videoUrl
      });
      console.log('Client review saved:', response.data);
    } catch (error) {
      console.error('Error saving client review:', error);
      setError('Error saving client review. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="border rounded-md p-4 max-w-screen-lg mx-auto">
        <div>
          {/* {downloadUrl && (
            <Image
              src={downloadUrl}
              alt="Video thumbnail"
              width={96}
              height={96}
              className="w-24 mx-auto mb-4"
            />
          )} */}
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">{spaceName}</h1>
        </div>
        <div className="text-center mb-4 text-xl sm:text-2xl font-bold">
          {formData ? formData.customField : 'Loading...'}
        </div>
        <div className="text-center mb-4 text-lg sm:text-2xl font-bold">QUESTIONS</div>
        <div className="text-center mb-4 text-base sm:text-xl font-semibold">
          <h1>{formData?.questions[0]}</h1>
          <h2>{formData?.questions[1]}</h2>
        </div>
        <div className='flex justify-center mb-2 text-black'>
          <input 
            type="email" 
            value={clientEmail} 
            onChange={(e) => setClientEmail(e.target.value)} // Handle email input change
            placeholder='Enter your email' 
          />
        </div>

        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        <div className="flex justify-center mb-4">
          <button className="btn btn-primary" onClick={() => setIsModalVisible(true)}>
            Start Recording
          </button>
        </div>

        {isUploading && (
          <div className="text-center text-gray-500">Uploading...</div>
        )}

        {downloadUrl && (
          <div className="text-center text-blue-500 mt-4">
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
              Download or View Uploaded Video
            </a>
          </div>
        )}
      </div>

      <VideoModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        startRecording={startRecording}
        stopRecording={stopRecording}
        isRecording={isRecording}
        videoRef={videoRef}
      />
    </div>
  );
};

export default Page;
