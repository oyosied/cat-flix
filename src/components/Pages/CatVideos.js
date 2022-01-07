import React, { useState, useEffect, useContext } from "react";
import { getVideos } from "../Toolkit/VideosDB";
import { AuthContext } from "../../store/auth-context";
import MLogoPic from "../../images/Main_cat.png";
import Spinner from "../UI/Spinner/Spinner";
import VideoContainer from "../Toolkit/VideoContainer";

const CatVideos = () => {
  const [videoList, setvideoList] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const loadingHandler = () => {
    setShowSpinner((prevState) => !prevState);
  };
  const auth = useContext(AuthContext);
  useEffect(() => {
    const dataset = async () => {
      const data = await getVideos(auth.token);
      setvideoList(data);
      loadingHandler();
    };
    dataset();
    return () => {
      setvideoList([]);
    };
  }, [setvideoList, auth.token]);
  // const videoFinish = () => {
  //   console.log("done");
  // };
  return (
    <div>
      {showSpinner && !videoList && <Spinner img={MLogoPic} />}

      {videoList != null && videoList.length!==0 && (
        <React.Fragment>
          {videoList.map((category) => {
            return (
              <div key={Object.keys(category)}>
                <h2>{Object.keys(category)}</h2>
                {category[Object.keys(category)].map((video) => {
                  return (
                    <VideoContainer
                      key={video._id}
                      video={video}
                      token={auth.token}
                    ></VideoContainer>
                  );
                })}
                
              </div>
            );
          })}
        </React.Fragment>
      )}
      {(videoList.length===0 && !showSpinner) && (
        
        <p>No videos uploaded yet{console.log(videoList)}</p>
      )}
    </div>
  );
};

export default CatVideos;
