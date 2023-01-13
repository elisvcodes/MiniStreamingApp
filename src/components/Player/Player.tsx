import { useCallback, useEffect, useState } from "react";
import { Video } from "../../types/video";
import Controllers from "./Controllers/Controllers";
import "./Player.css";

function Player({ video }: { video: Video }) {
  const media = video.assets[0].url
    .replace(".bin", "/file.mp4")
    .replace("http", "https")
    .replace("embed", "embed-ssl");

  const [videoNode, setVideoNode] = useState<HTMLVideoElement>();
  const [progress, setProgress] = useState<number>(
    Number(localStorage.getItem(video.hashed_id))
  );

  const videoRef = useCallback(
    (node: HTMLVideoElement) => setVideoNode(node),
    []
  );

  useEffect(() => {
    if (!localStorage.getItem(video.hashed_id)) {
      localStorage.setItem(video.hashed_id, "0");
    }
  }, [video]);

  const trackProgress = () => {
    if (!videoNode) return null;
    setProgress(videoNode.currentTime);
  };

  const onMouseLeave = () => {
    //  update last known video position
    localStorage.setItem(video.hashed_id, String(progress));
  };

  const onLoadStart = () => {
    if (progress > 0 && videoNode) {
      videoNode.currentTime = progress;
    }
  };

  return (
    <div className="player-container">
      <video
        ref={videoRef}
        src={`${media}`}
        onTimeUpdate={trackProgress}
        onMouseLeave={onMouseLeave}
        onLoadStart={onLoadStart}
      />

      <Controllers videoNode={videoNode} />
    </div>
  );
}

export default Player;
