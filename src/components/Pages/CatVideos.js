import React, { useState, useEffect, useContext } from "react";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import { getVideosByCategory } from "../Toolkit/VideosDB";
import { AuthContext } from "../../store/auth-context";
import MLogoPic from "../../images/Main_cat.png";
import Spinner from "../UI/Spinner/Spinner";

const CatVideos = () => {
  const [videoList, setvideoList] = useState(null);
  const [showSpinner, setShowSpinner] = useState(true);
  const loadingHandler = () => {
    setShowSpinner((prevState) => !prevState);
  };
  const auth = useContext(AuthContext);
  useEffect(() => {
    const dataset = async () => {
      const data = await getVideosByCategory(auth.token);
      setvideoList(data);
      loadingHandler();
    };
    dataset();
    return () => {
      setvideoList(null);
    };
  }, [setvideoList, auth.token]);
  // const videoFinish = () => {
  //   console.log("done");
  // };
  return (
    <div>
      {showSpinner && (
        <div style={{ textAlign: "center", marginTop: "10%" }}>
          <Spinner img={MLogoPic} />
        </div>
      )}

      {videoList != null && (
        <React.Fragment>
          {videoList.map((category) => {
            return (
              <div key={Object.keys(category)}>
                <h2>{Object.keys(category)}</h2>
                {category[Object.keys(category)].map((video) => {
                  return (
                    <Video
                      key={video._id}
                      autoPlay
                      loop
                      muted
                      controls={[
                        "PlayPause",
                        "Seek",
                        "Time",
                        "Volume",
                        "Fullscreen",
                      ]}
                    >
                      <source
                        src={
                          "http://localhost:8000/cat-videos/videos/" +
                          video.VideoFileID +
                          "?token=" +
                          auth.token
                        }
                        type={video.contentType}
                      />
                    </Video>
                  );
                })}
              </div>
            );
          })}
        </React.Fragment>
      )}
    </div>
  );
};

export default CatVideos;
