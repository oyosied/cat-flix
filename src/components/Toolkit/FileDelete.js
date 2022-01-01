import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../store/auth-context";
import { getMyVideos } from "../Toolkit/VideosDB";
const FileDelete = (props) => {
  const [myvideos, setmyvideos] = useState();
  const auth = useContext(AuthContext);
  useEffect(() => {
    const getdata = async () => {
      const fetchedVideo = await getMyVideos(auth.token);
      setmyvideos(fetchedVideo);
    };
    getdata();
    return () => {
      setmyvideos();
    };
  }, [auth.token]);
  console.log(myvideos)
  return (
    <React.Fragment>
      <h2>My uploaded videos</h2>
      {myvideos &&
        myvideos.map((videoInfo) => {
          return (
            <div key={videoInfo._id}>
              <img
                alt={videoInfo.description}
                style={{width:"15%",borderRadius:"50%"}}
                src={
                  "http://localhost:8000/cat-videos/videos/thumbnail/" +
                  videoInfo.ThumbnailFileID +
                  "?token=" +
                  auth.token
                }
              />
              <p >{videoInfo.name}</p>
            </div>
          );
        })}
        {(!myvideos || myvideos.length===0 )&& <p>No videos , upload some :)</p>}
    </React.Fragment>
  );
};

export default FileDelete;
