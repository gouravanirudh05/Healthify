import AgoraRTC from "agora-rtc-sdk-ng";

// Create Agora client with the desired configurations
const client = AgoraRTC.createClient({
  mode: "rtc", // Real-Time Communication mode
  codec: "vp8", // Use VP8 codec
});

// Function to create microphone and camera tracks
const createMicrophoneAndCameraTracks = async () => {
  try {
    const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
    return { microphoneTrack, cameraTrack };
  } catch (error) {
    console.error("Failed to create microphone and camera tracks:", error);
    return { microphoneTrack: null, cameraTrack: null };
  }
};

// Export client and track creation function
export const useClient = () => client;
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks;
