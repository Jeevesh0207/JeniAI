import React, { useState, useEffect } from "react";
import "./StyleHome.css";
import Upload from "./Upload";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { getImage } from "../../redux/actions";
import { Loading } from "../index";
import { toast } from "react-toastify";

function Home() {
  const Dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.getImage);
  const { data } = useSelector((state) => state.getUploadData);

  const [file, setfile] = useState(null);
  const [scale, setScale] = useState(2);
  const [enhance, setEnhance] = useState(false);

  const notify = (type, msg) => {
    const baseOptions = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    };
    switch (type) {
      case "success":
        toast.success(msg, baseOptions);
        break;
      case "error":
        toast.error(msg, baseOptions);
        break;
      case "warning":
        toast.warn(msg, baseOptions);
        break;
      case "info":
      default:
        toast.info(msg, baseOptions);
        break;
    }
  };

  const handleDownload = (url, filename) => {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename || "enhanced-image.png";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  useEffect(() => {
    if (error !== null) {
      notify("error", "Something went wrong");
    }
  }, [error]);

  useEffect(() => {
    if (!loading && error === null && file !== null) {
      notify("success", "Image enhanced successfully");
    }
  }, [loading]);

  const handleConvert = () => {
    const newForm = new FormData();

    newForm.append("image", file);
    newForm.append("scale", scale);
    newForm.append("enhance", enhance);

    Dispatch(getImage(newForm));
  };

  return (
    <div className="Home">
      <div className="home_container">
        <div className="title">
          <h1>AI-Powered Photo Enhancement</h1>
          <h2>Transform Your Images with a Single Click</h2>
          <p>
            Experience the magic of Jeni's AI photo enhancer. Our cutting-edge
            technology allows you to instantly improve, sharpen, and clarify
            your media files with unparalleled ease.
          </p>
        </div>
        <div className="Upload">
          <Upload
            setfile={setfile}
            setScale={setScale}
            setEnhance={setEnhance}
          />
        </div>
        {file !== null && error === null && (
          <div className="enhance_items">
            <div className="item">
              <div className="details">
                <div className="left">
                  <div className="filename">
                    <span>Filename : </span>
                    <span className="name">{file?.name}</span>
                  </div>
                  <div className="scale">
                    <span>Scale : </span>
                    <span>
                      <Dropdown
                        onSelect={(eventKey) => setScale(parseInt(eventKey))}
                      >
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          {scale}x
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item eventKey="2">2x</Dropdown.Item>
                          <Dropdown.Item eventKey="4">4x</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </span>
                  </div>
                  <div className="enhance_bool">
                    <span>AI Enhance : </span>
                    <span>
                      <Dropdown
                        onSelect={(eventKey) => setEnhance(eventKey === "Yes")}
                      >
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          {enhance ? "Yes" : "No"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                          <Dropdown.Item eventKey="No">No</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </span>
                  </div>
                </div>
                <div className="right">
                  <button onClick={handleConvert} disabled={loading && true}>
                    Convert
                  </button>
                </div>
              </div>
              {loading && error === null ? (
                <div className="bothimage">
                  <Loading />
                </div>
              ) : (
                <div className="bothimage">
                  <div className="images">
                    <div className="left">
                      <div className="orig">
                        <h4>Original</h4>
                      </div>
                      <div className="orig-image">
                        {data?.originalimage && (
                          <img src={data?.originalimage} alt="png" />
                        )}
                      </div>
                    </div>
                    <div className="right">
                      <div className="orig">
                        <h4>Enhance</h4>
                      </div>
                      <div className="orig-image">
                        {data?.enhancedimage && (
                          <img src={data?.enhancedimage} alt="png" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="down-btn">
                    <button
                      onClick={() =>
                        handleDownload(data?.enhancedimage, data?.name)
                      }
                    >
                      Download
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
