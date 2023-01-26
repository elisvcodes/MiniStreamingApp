import { Link } from "react-router-dom";
import useFecthVideos from "../components/hooks/useFetchVideos";

export default function Home() {
  const { videos } = useFecthVideos();
  return (
    <div>
      {videos?.map((video) => {
        return (
          <Link
            to={`/watch/${video.hashed_id}`}
            key={video.hashed_id}
            relative="path"
          >
            <img src={video.thumbnail.url} alt="" />
            <p>{video.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
