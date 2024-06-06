import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { getImage, setData } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Upload({ setfile, setScale, setEnhance }) {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const { img, loading } = useSelector((state) => state.getImage);

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

  const onDrop = useCallback((acceptedFiles) => {
    const maxSize = 8388608; // 8MB in bytes

    // Filter out files larger than 8MB
    const validFiles = acceptedFiles.filter((file) => file.size <= maxSize);

    if (validFiles.length === 0) {
      notify(
        "error",
        "Please select files smaller than 8MB."
      );
      return;
    }

    setImage(acceptedFiles);
    setScale(2);
    setEnhance(false);

    setfile(acceptedFiles[0]);

    const newForm = new FormData();

    newForm.append("image", acceptedFiles[0]);
    newForm.append("scale", 2);
    newForm.append("enhance", false);

    dispatch(getImage(newForm));
  }, []);

  useEffect(() => {
    if (img !== "" && image) {
      const newData = {
        id: uuidv4(),
        name: image[0].name,
        originalimage: URL.createObjectURL(image[0]),
        enhancedimage: img,
      };
      dispatch(setData(newData));
    }
    // Cleanup blob URL
    if (image) {
      image.forEach((file) => URL.revokeObjectURL(file.preview));
    }
  }, [img]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    disabled: loading, // Disable dropzone when loading is true
  });

  return (
    <div
      className={`upload_box ${loading ? "disabled" : "enable"}`}
      {...getRootProps()}
    >
      <input {...getInputProps()} disabled={loading} />
      <div className="btn">
        <button type="button" disabled={loading}>
          Choose Files <i className="fa-solid fa-image"></i>
        </button>
      </div>
      <div className="text-center">
        {isDragActive ? (
          <p className="dropzone-content">Release to drop the files here</p>
        ) : (
          <p className="dropzone-content">or drop it here</p>
        )}
        <p className="policy">
          By continuing, you accept our Terms of Service and acknowledge receipt
          of our Privacy & Cookie Policy
        </p>
      </div>
    </div>
  );
}

export default Upload;
