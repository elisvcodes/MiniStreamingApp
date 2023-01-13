import { useParams } from "react-router-dom";
import useFetchVideo from "../components/hooks/useFetchVideo";
import Player from "../components/Player/Player";

const Watch = () => {
  const { id } = useParams();
  const { video } = useFetchVideo({ id });
  if (!video) return <></>;

  return <Player video={video} />;
};

export default Watch;
