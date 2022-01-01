// destination  /src/App.js

import { useState, useEffect, useContext } from "react";
import React from "react";
import { getCategories } from "../Toolkit/VideosDB";
//import axios from 'axios';
import { Select } from "antd";
import { uploadVideo } from "./VideosDB";
import { AuthContext } from "../../store/auth-context";
import "antd/dist/antd.css";

const FileUpload = () => {
  const auth = useContext(AuthContext);
  const [categories, setcategories] = useState();
  const [selectedCategory, setselectedCategory] = useState();
  const [thumbnail, setthumbnail] = useState();

  const { Option } = Select;
  useEffect(() => {
    const getdata = async () => {
      const fetchedCategories = await getCategories(auth.token);
      setcategories(fetchedCategories);
      setselectedCategory(fetchedCategories[0].category);
    };
    getdata();
    return () => {
      setcategories();
      setselectedCategory();
    };
  }, [auth.token]);
  const [file, setfile] = useState(null);
  const [description, setdescription] = useState("");
  const [videoName, setvideoName] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    uploadVideo(
      file,
      thumbnail,
      videoName,
      description,
      selectedCategory,
      auth.userId,
      auth.token
    );
  };
  const onVideoSelect = (e) => {
    setfile(e.target.files[0]);
  };
  const onImageSelect = (e) => {
    setthumbnail(e.target.files[0]);
  };
  const descChange = (e) => {
    setdescription(e.target.value);
  };
  const videoNameChange = (e) => {
    setvideoName(e.target.value);
  };
  const onSelectChange = (checkedValues) => {
    console.log(checkedValues);
    setselectedCategory(checkedValues);
  };
  return (
    <React.Fragment>
      {categories && (
        <form style={{ display: "block" }} onSubmit={onFormSubmit}>
          <h3>Choose category</h3>
          <Select
            defaultValue={categories[0].category}
            style={{ width: 120 }}
            onChange={onSelectChange}
          >
            {categories.map((category) => {
              return (
                <Option key={category._id} value={category.category}>
                  {category.category}
                </Option>
              );
            })}
          </Select>
          <br />
          <h3>Video name</h3>
          <input type="text" name="name" onChange={videoNameChange} />
          <h3>Description</h3>
          <input type="text" name="description" onChange={descChange} />
          <h3>Select a video</h3>
          <input type="file" name="file" onChange={onVideoSelect} />
          <h3>Select a thumbnail</h3>
          <input type="file" name="file" onChange={onImageSelect} />
          <button type="submit">Upload to DB</button>
        </form>
      )}
    </React.Fragment>
  );
};

export default FileUpload;
