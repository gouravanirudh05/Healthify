import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  LocalUser,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUsers,
} from 'agora-rtc-react';

const LiveVideo = () => {
  const appId = 'cb83088f36f2417cb0f2e8677dd5913e';
  const { channelName } = useParams();

  const [activeConnection, setActiveConnection] = useState(true);

  // Track the mic/video state
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);

  // Get local video and mic tracks
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  const navigate = useNavigate();

  // Join the channel
  useJoin(
    {
      appid: appId,
      channel: channelName,
      token: null,
    },
    activeConnection
  );

  usePublish([localMicrophoneTrack, localCameraTrack]);

  // Remote users
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  // Play the remote user audio tracks
  audioTracks.forEach((track) => track.play());

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center">
        {remoteUsers.map((user) => (
          <div key={user.uid} className="remote-video-container w-64 h-48 bg-black">
            <RemoteUser user={user} />
          </div>
        ))}
      </div>

      <div className="local-video-container w-64 h-48 bg-black mt-4">
        <LocalUser
          audioTrack={localMicrophoneTrack}
          videoTrack={localCameraTrack}
          cameraOn={cameraOn}
          micOn={micOn}
          playAudio={micOn}
          playVideo={cameraOn}
          className="w-full h-full object-cover"
        />
        <div className="flex justify-between mt-2">
          <div className="flex gap-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setMic((prev) => !prev)}
            >
              Mic
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setCamera((prev) => !prev)}
            >
              Camera
            </button>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setActiveConnection(false);
              navigate('/');
            }}
          >
            Disconnect
          </button>
        </div>
      </div>
    </>
  );
};

export default LiveVideo;
