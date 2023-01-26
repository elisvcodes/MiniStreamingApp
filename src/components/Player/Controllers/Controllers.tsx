import "./Controllers.css";
import {
  BsVolumeUpFill,
  BsFillPlayFill,
  BsFillSkipForwardFill,
  BsFillSkipBackwardFill,
  BsFillPauseFill,
  BsFillVolumeMuteFill
} from "react-icons/bs";
import { useCallback, useEffect, useState } from "react";
import convertSecondsToMinutes from "../../../utils/convertSecondsToMinutes";

const Controllers = ({
  videoNode
}: {
  videoNode: HTMLVideoElement | undefined;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mute, setMute] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoMetaData, setVideoMetaData] = useState({
    duration: 0
  });

  // load the video meta data
  useEffect(() => {
    if (!videoNode) return undefined;
    const handleMetaData = () => {
      setVideoMetaData({
        duration: videoNode.duration
      });
    };
    videoNode.addEventListener("loadedmetadata", handleMetaData);
    return () => {
      videoNode.removeEventListener("loadedmetadata", handleMetaData);
    };
  }, [videoNode, videoNode?.currentTime, videoNode?.duration]);

  // keep track of the progress bar
  useEffect(() => {
    if (!videoNode) return undefined;
    setProgress((videoNode.currentTime / videoMetaData.duration) * 100);
  }, [videoNode, videoNode?.currentTime, videoMetaData.duration]);

  const handleIsPlaying = useCallback(
    (
      e: KeyboardEvent | MouseEvent | React.MouseEvent<SVGElement, MouseEvent>
    ) => {
      e.stopPropagation();

      if (!videoNode) return null;
      setIsPlaying(videoNode.paused);
      if (!videoNode.paused) videoNode.pause();
      else videoNode.play();
    },
    [videoNode]
  );

  // start and pause video using spacebar
  useEffect(() => {
    const handleVideoPlay = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        handleIsPlaying(e);
      }
    };

    document.addEventListener("keydown", handleVideoPlay);
    document.addEventListener("click", handleIsPlaying);

    return () => {
      document.removeEventListener("keydown", handleVideoPlay);
      document.removeEventListener("click", handleIsPlaying);
    };
  }, [videoNode, handleIsPlaying]);

  const handleSkipForward = useCallback(
    (e: React.MouseEvent<SVGElement, MouseEvent>) => {
      e.stopPropagation();

      if (!videoNode) return null;
      videoNode.currentTime += 5;
    },
    [videoNode]
  );

  const handleSkipBackward = useCallback(
    (e: React.MouseEvent<SVGElement, MouseEvent>) => {
      e.stopPropagation();

      if (!videoNode) return null;
      videoNode.currentTime -= 5;
    },
    [videoNode]
  );

  const handleMute = useCallback(
    (e: React.MouseEvent<SVGElement, MouseEvent>) => {
      e.stopPropagation();

      if (!videoNode) return null;
      setMute(!mute);
      if (!mute) videoNode.muted = true;
      else videoNode.muted = false;
    },
    [mute, videoNode]
  );

  const handleProgressbarClick = (
    e: React.MouseEvent<HTMLProgressElement, MouseEvent>
  ) => {
    if (!videoNode) return undefined;
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const progressWidth = e.currentTarget.clientWidth;
    const progressValue = (x / progressWidth) * 100;
    setProgress(progressValue);

    const newCurrentTime = (videoMetaData.duration * progressValue) / 100;
    videoNode.currentTime = newCurrentTime;
  };

  if (!videoNode) return <></>;
  return (
    <div className="controllers-container">
      <div className="controllers">
        <div className="progress-container">
          <progress
            className="progress"
            max="100"
            value={`${progress}`}
            onClick={handleProgressbarClick}
          >
            Progress
          </progress>
          <div className="remaining">
            <span>
              {convertSecondsToMinutes(
                videoMetaData.duration - (videoNode.currentTime ?? 0)
              )}
            </span>
          </div>
        </div>
        <div className="controllers-actions">
          {isPlaying ? (
            <BsFillPauseFill
              color="white"
              size="25px"
              onClick={handleIsPlaying}
            />
          ) : (
            <BsFillPlayFill
              color="white"
              size="25px"
              onClick={handleIsPlaying}
            />
          )}
          <BsFillSkipBackwardFill
            color="white"
            size="25px"
            onClick={handleSkipBackward}
          />
          <BsFillSkipForwardFill
            color="white"
            size="25px"
            onClick={handleSkipForward}
          />

          {mute ? (
            <BsFillVolumeMuteFill
              color="white"
              size="25px"
              onClick={handleMute}
            />
          ) : (
            <BsVolumeUpFill color="white" size="25px" onClick={handleMute} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Controllers;
