import ReactPlayer from "react-player";
import { useState } from "react";
const VideoContainer = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="listItem"
      style={{ margin:"0 1rem 0 1rem",blockSize:"fit-content",display:"inline-block"}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isHovered && (
        <img
          alt={props.video.description}
          style={{ width: "200px" ,display:"inline-block"}}
          src={
            "http://localhost:8000/cat-videos/videos/thumbnail/" +
            props.video.ThumbnailFileID +
            "?token=" +
            props.token
          }
        />
      )}
      {isHovered && (
        <ReactPlayer
          key={props.video.VideoFileID}
          url={
            "http://localhost:8000/cat-videos/videos/" +
            props.video.VideoFileID +
            "?token=" +
            props.token
          }
          controls
          autoPlay={true}

        ></ReactPlayer>
      )}
    </div>
  );
};

export default VideoContainer;
