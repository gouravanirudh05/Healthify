import React, { useEffect, useState } from "react";
import { useClient, useMicrophoneAndCameraTracks } from "./AgoraConfig"; // Adjust the path based on your project structure
import { useParams, useNavigate } from "react-router-dom";

const VideoCall = () => {
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const { channelName } = useParams();
  const navigate = useNavigate();

  // Fetch token for the channel
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(`http://localhost:5000/generateToken`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ channelName, uid: 1234 }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        console.error("Failed to fetch token:", error);
      }
    };

    if (channelName) {
      fetchToken();
    }
  }, [channelName]);

  // Initialize Agora client
  useEffect(() => {
    const initClient = async () => {
      if (!client || !token || !ready) return;

      try {
        // Handle remote user events
        client.on("user-published", async (user, mediaType) => {
          await client.subscribe(user, mediaType);
          if (mediaType === "video") {
            setUsers((prevUsers) => [...prevUsers, user]);
          }
        });

        client.on("user-unpublished", (user) => {
          setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
        });

        client.on("user-left", (user) => {
          setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
        });

        // Join the channel and publish local tracks
        await client.join("252142d27f2a41b083a166b76c41d881", channelName, token);
        if (tracks) await client.publish(tracks);
        console.log("Client successfully joined and published tracks");
      } catch (error) {
        console.error("Error initializing Agora client:", error);
      }
    };

    initClient();

    return () => {
      if (client) {
        client.leave();
        setUsers([]);
        console.log("Client left the channel");
      }
    };
  }, [client, token, ready, tracks, channelName]);

  // Leave the call and navigate back
  const handleLeave = async () => {
    if (client) {
      await client.leave();
      setUsers([]);
      navigate("/dashboard");
    }
  };

  return (
    <div className="video-call-container">
      <div className="local-stream">
        {ready && tracks && tracks[1] ? (
          <video
            autoPlay
            playsInline
            ref={(ref) => {
              if (ref) tracks[1].play(ref);
            }}
          />
        ) : (
          <p>Loading local video...</p>
        )}
      </div>
      <div className="remote-streams">
        {users.map((user) => (
          <div key={user.uid}>
            {user.videoTrack ? (
              <video
                autoPlay
                playsInline
                ref={(ref) => {
                  if (ref) user.videoTrack.play(ref);
                }}
              />
            ) : (
              <p>Loading remote video for user {user.uid}...</p>
            )}
          </div>
        ))}
      </div>
      <button onClick={handleLeave}>Leave</button>
    </div>
  );
};

export default VideoCall;
