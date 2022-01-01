import FileUpload from "../Toolkit/FileUpload";
import FileDelete from "../Toolkit/FileDelete";
import React from "react";
const centereddiv = {
  marginLeft: "3rem",
  marginRight: "3rem",
  marginTop: "2rem",
  textAlign: "left",
  borderStyle: "solid",
  borderColor: "#4dbe20",
};
const VideoUpload = () => {
  return (
    <React.Fragment>
      <div style={centereddiv}>
        <FileUpload></FileUpload>
      </div>
      <div style={centereddiv}>
        <FileDelete></FileDelete>
      </div>
    </React.Fragment>
  );
};

export default VideoUpload;
