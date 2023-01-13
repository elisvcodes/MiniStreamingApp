import Axios from "axios";
import { useEffect, useState } from "react";
import { Video } from "../types/video";

const useFecthVideo = ({ id }: { id?: string }) => {
  const [video, setVideo] = useState<Video>();
  const config = {
    headers: {
      Authorization: `Bearer 8a3b02e6c5d013342b08fe33d4cff4795c092a446c2fd1800af7b44eab838e2c`
    }
  };

  const fetchMyVideo = async () => {
    if (!id) return null;
    const res = await Axios.get(
      `https://api.wistia.com/v1/medias/${id}.json`,
      config
    );
    setVideo(res.data);
  };

  useEffect(() => {
    fetchMyVideo();
  }, []);

  return { video };
};

export default useFecthVideo;
