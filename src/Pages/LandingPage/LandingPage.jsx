import { useEffect, useRef, useState } from "react";
import { message } from "antd";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Icons from "../../Components/Icons/icons";
import { Background, ButtonWithGlyphIcon, FullScreenLoader, InvertedPrimaryButton, NavBar, PrimaryButton } from "../../Components/index";
import InputField from "../../Components/InputField/InputField";
import "./LandingPage.scss"
import TagsFilter from "../../Components/TagsFilter/TagsFilter";
// import { generatePost } from "../../utils/api";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { languages } from "../../utils/constants";
import { Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { Skeleton } from "@mui/material";
import { generatePost, uploadImage } from "../../utils/api";
import ColumnGroup from "antd/es/table/ColumnGroup";
const { TextArea } = Input;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function LandingPage({ platform, setHideIntroPage }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [urlSearchInput, setUrlSearchInput] = useState("");
  const [description, setDescription] = useState("");
  const [recommendationNumber, setRecommendationNumber] = useState(3);
  const [wordsLimit, setWordsLimit] = useState(200);
  const [language, setLanguage] = useState("English");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const handleCancel = () => setPreviewOpen(false);
  const [contentPosition, setContentPosition] = useState("center")
  const [resultLoading, setResultLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showError, setShowError] = useState(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList)
    const formData = new FormData();
    formData.append('file', newFileList[0].originFileObj);
    const responseUrl = await uploadImage(formData)
    setUploadedImageUrl(responseUrl)
  };
  const uploadButton = (
    <div style={{ width: "100%" }}>
      <PlusOutlined />
      <div
        style={{
          marginTop: 5,
        }}
      >
        Upload Image
      </div>
    </div>
  );
  const asyncRequest = async ({ file, onSuccess }) => {
    const isPNG = file.type === 'image/png';
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg';

    if (!isPNG && !isJPG) {
      message.error({
        content: "Please select only PNG or JPG image!",
        style: {
          marginTop: "5vh",
        },
        duration: 1.5,
        maxCount: 1,
      });
      setFileList([])
    }
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  }



  const handleShowResults = async () => {
    setResultLoading(true)
    setShowError(false)
    setContentPosition("flex-start")
    setSearchResults([])
    try {
      let imageUrl;
      if (uploadedImageUrl) {
        imageUrl = uploadedImageUrl
      } else if (urlSearchInput) {
        imageUrl = urlSearchInput
      } else imageUrl = ""
      const response = await generatePost(imageUrl, description, recommendationNumber, wordsLimit, language, platform.toUpperCase())
      response === undefined ? setShowError(true) : setSearchResults(response);
      setResultLoading(false)


    } catch (error) {
      setShowError(true)
      setResultLoading(false)

    }
  }

  if (isLoading) {
    return <FullScreenLoader showLoader={isLoading} />;
  }

  function copyToClipboard(text) {
    const input = document.createElement('input');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }


  const getPlatformArr = () => {
    let arr;
    if (platform === "twitter") {
      arr = [100, 200, 280]
    } else arr = [100, 200, 300, 400, 500];

    return arr;
  }

  return (
    <>
      <div className="background-main" style={{ justifyContent: contentPosition }}>
        <Box className="background-content">
          <NavBar />
          <Box className="landing-page-body">

            <Box>
              <InputField
                inputLabel="Enter Image Url"
                placeholder="start typing"
                value={urlSearchInput}
                onChange={(e) => {
                  setUrlSearchInput(e.target.value);
                }}
                autoFocus
              />

              <Box className="upload-container">
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  customRequest={asyncRequest}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                  <img
                    alt="example"
                    style={{
                      width: '100%',
                    }}
                    src={previewImage}
                  />
                </Modal>
              </Box>

              <Box sx={{ marginTop: "10px" }}>
                <label style={{ marginBottom: "5px" }} htmlFor="input-field" className="input-label" >
                  Enter Description
                </label>
                <TextArea style={{ marginTop: "10px" }} rows={4} placeholder="start typing" onChange={(e) => {
                  setDescription(e.target.value);
                }} />
              </Box>

              <Box>
                <FormControl sx={{ minWidth: "45%", mt: 5, mr: "10%" }}>
                  <InputLabel id="demo-simple-select-helper-label">Recommendation number</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={recommendationNumber}
                    label="Recommendation Number"
                    onChange={(event) => setRecommendationNumber(event.target.value)}
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: "45%", mt: 5 }}>
                  <InputLabel id="demo-simple-select-helper-label">Words limit</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={wordsLimit}
                    label="Words limit"
                    onChange={(event) => setWordsLimit(event.target.value)}
                  >

                    {getPlatformArr().map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl sx={{ minWidth: "45%", mt: 5 }}>
                  <InputLabel id="demo-simple-select-helper-label">Select language</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={language}
                    label="Select language"
                    onChange={(event) => setLanguage(event.target.value)}
                  >
                    {languages.map((value) => (
                      <MenuItem value={value.name}>{value.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box className="showResultButton">
                <PrimaryButton label="Generate Post"
                  onClick={() => handleShowResults()}
                  disabled={description.length === 0}
                />
                <InvertedPrimaryButton
                  label="Change Platform"
                  onClick={() => setHideIntroPage(false)}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        {contentPosition !== "center" && <Box className="result-container">
          {resultLoading && <Box className="result-loading" >
            <Skeleton className="loading-img" key={1} sx={{ display: "flex", margin: "auto" }} variant="rounded" width={"300px"} height={150} />
            <Skeleton key={1} variant="rounded" width={"100%"} height={120} />
            <Skeleton key={2} variant="rounded" width={"100%"} height={120} />
            <Skeleton key={3} variant="rounded" width={"100%"} height={120} />
            <Skeleton key={4} variant="rounded" width={"100%"} height={120} />
          </Box>}
        
          {searchResults && <Box>
            {(uploadedImageUrl || urlSearchInput) && !showError && <img src={uploadedImageUrl ? uploadedImageUrl : urlSearchInput} />}
            <Box className="result-text">
              {searchResults.map((recommendation) => {
                return (
                  <Box className="recommendation" onClick={() => {
                    copyToClipboard(recommendation)
                    message.success({
                      content: "Copied to clipboard",
                      style: {
                        marginTop: "5vh",
                      },
                      duration: 1.5,
                      maxCount: 1,
                    })
                  }} >
                    <p>{recommendation}</p>
                  </Box>
                )
              })}

                {!showError && searchResults && !resultLoading && <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
            <button className="publish-but" disabled={true}>Publish using Phyllo  </button>
          </Box>}

              {showError &&
                <Box className="error-screen" >
                  <h1>Oops! Something went wrong</h1>
                  <p>We apologize for the inconvenience. Please try again later or choose a different image.</p>
                </Box>
              }
            </Box>
          </Box>}
        </Box>}

      </div>
    </>
  );
}


export default LandingPage;
