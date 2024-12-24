import React, { useState, useEffect, useRef } from 'react';
import { Camera, Mic, MicOff, Video, VideoOff, PhoneOff, Copy, CheckCheck } from 'lucide-react';

const VideoCall = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [error, setError] = useState(null);
  const [localCode, setLocalCode] = useState('');
  const [remoteCode, setRemoteCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isCallInitiator, setIsCallInitiator] = useState(false);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const videoTrackRef = useRef(null);

  const configuration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
    ],
  };

  useEffect(() => {
    generateLocalCode();
    initializeLocalStream();
    return () => {
      stopMediaTracks();
    };
  }, []);

  const generateLocalCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setLocalCode(code);
  };

  const initializeLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      videoTrackRef.current = stream.getVideoTracks()[0];
      
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      setConnectionStatus('Ready to connect');
    } catch (err) {
      setError('Failed to access camera/microphone: ' + err.message);
      setConnectionStatus('Failed');
    }
  };

  const createPeerConnection = () => {
    const peerConnection = new RTCPeerConnection(configuration);
    
    if (localStream) {
      localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
      });
    }

    peerConnection.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    peerConnection.oniceconnectionstatechange = () => {
      setConnectionStatus(peerConnection.iceConnectionState);
    };

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        // In a real app, send this to signaling server
        console.log('New ICE candidate:', event.candidate);
      }
    };

    return peerConnection;
  };

  const startCall = async () => {
    if (!remoteCode) {
      setError('Please enter the remote user\'s code');
      return;
    }

    try {
      setIsCallInitiator(true);
      const peerConnection = createPeerConnection();
      peerConnectionRef.current = peerConnection;

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      // In a real app, send this offer to the signaling server with the remote code
      console.log('Call initiated to:', remoteCode);
      console.log('Offer:', offer);
      
      setConnectionStatus('Calling...');
    } catch (err) {
      setError('Failed to start call: ' + err.message);
      setConnectionStatus('Failed');
    }
  };

  const answerCall = async (offer) => {
    try {
      const peerConnection = createPeerConnection();
      peerConnectionRef.current = peerConnection;

      await peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      // In a real app, send this answer back through the signaling server
      console.log('Call answered');
      console.log('Answer:', answer);
      
      setConnectionStatus('Connected');
    } catch (err) {
      setError('Failed to answer call: ' + err.message);
      setConnectionStatus('Failed');
    }
  };

  const toggleVideo = async () => {
    try {
      if (isVideoOff) {
        // Turn camera back on
        const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoTrack = newStream.getVideoTracks()[0];
        
        videoTrackRef.current = videoTrack;
        
        if (localStream) {
          const audioTrack = localStream.getAudioTracks()[0];
          const newLocalStream = new MediaStream([videoTrack, audioTrack]);
          setLocalStream(newLocalStream);
          
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = newLocalStream;
          }
          
          if (peerConnectionRef.current) {
            const senders = peerConnectionRef.current.getSenders();
            const videoSender = senders.find(sender => sender.track?.kind === 'video');
            if (videoSender) {
              videoSender.replaceTrack(videoTrack);
            }
          }
        }
      } else {
        // Turn camera off
        if (videoTrackRef.current) {
          videoTrackRef.current.stop();
          videoTrackRef.current = null;
          
          if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            const newLocalStream = new MediaStream([audioTrack]);
            setLocalStream(newLocalStream);
            
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = newLocalStream;
            }
            
            if (peerConnectionRef.current) {
              const senders = peerConnectionRef.current.getSenders();
              const videoSender = senders.find(sender => sender.track?.kind === 'video');
              if (videoSender) {
                videoSender.replaceTrack(null);
              }
            }
          }
        }
      }
      setIsVideoOff(!isVideoOff);
    } catch (err) {
      setError('Failed to toggle video: ' + err.message);
    }
  };

  const toggleMute = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isMuted;
        setIsMuted(!isMuted);
      }
    }
  };

  const copyCodeToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(localCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy code');
    }
  };

  const endCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    stopMediaTracks();
    setRemoteStream(null);
    setConnectionStatus('Disconnected');
    setRemoteCode('');
    setIsCallInitiator(false);
    initializeLocalStream();
  };

  const stopMediaTracks = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    if (videoTrackRef.current) {
      videoTrackRef.current.stop();
      videoTrackRef.current = null;
    }
    setLocalStream(null);
    setRemoteStream(null);
  };

  return (
    <div className="w-full h-screen bg-gray-900 p-4">
      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      <div className="relative h-full flex gap-4">
        {/* Remote video */}
        <div className="relative w-3/4 h-full bg-gray-800 rounded-lg overflow-hidden">
          {remoteStream ? (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-white text-lg">Waiting for connection...</p>
            </div>
          )}
        </div>

        {/* Local video and controls */}
        <div className="w-1/4 space-y-4">
          <div className="relative w-full aspect-video bg-gray-800 rounded-lg overflow-hidden">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>

          {/* Code sharing section */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="mb-4">
              <label className="text-white text-sm block mb-2">Your Code:</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={localCode}
                  readOnly
                  className="bg-gray-700 text-white px-3 py-2 rounded-lg flex-grow"
                />
                <button
                  onClick={copyCodeToClipboard}
                  className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  {isCopied ? (
                    <CheckCheck className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-white text-sm block mb-2">Connect to:</label>
              <input
                type="text"
                value={remoteCode}
                onChange={(e) => setRemoteCode(e.target.value.toUpperCase())}
                placeholder="Enter remote code"
                maxLength={6}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg"
              />
            </div>

            <button
              onClick={startCall}
              disabled={connectionStatus === 'connected' || !remoteCode}
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 
                disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              Start Call
            </button>
          </div>

          {/* Media controls */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-center space-x-4">
              <button
                onClick={toggleMute}
                className={`p-3 rounded-full ${
                  isMuted ? 'bg-red-500' : 'bg-gray-700'
                } hover:bg-opacity-80 transition-colors`}
              >
                {isMuted ? (
                  <MicOff className="w-6 h-6 text-white" />
                ) : (
                  <Mic className="w-6 h-6 text-white" />
                )}
              </button>

              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full ${
                  isVideoOff ? 'bg-red-500' : 'bg-gray-700'
                } hover:bg-opacity-80 transition-colors`}
              >
                {isVideoOff ? (
                  <VideoOff className="w-6 h-6 text-white" />
                ) : (
                  <Video className="w-6 h-6 text-white" />
                )}
              </button>

              <button 
                onClick={endCall}
                className="p-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
              >
                <PhoneOff className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Connection status */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm">Status</span>
              <span className="text-white text-sm">{connectionStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;