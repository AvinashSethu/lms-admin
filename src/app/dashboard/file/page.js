"use client";
import { useState } from "react";
import * as tus from "tus-js-client";

const UploadVideo = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) {
      setResponseMessage("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setResponseMessage("");
    uploadToS3(file, setResponseMessage);
    setUploading(false);

    // const upload = new tus.Upload(file, {
    //   endpoint: 'https://video.bunnycdn.com/tusupload',
    //   retryDelays: [0, 3000, 5000, 10000, 20000, 60000, 60000],
    //   headers: {
    //     AuthorizationSignature: "b77be140c28ba7e0dc628b9c040ad09eb2933b0114c8cdc67d77e9c07144ad54", // SHA256 signature (server-side generated)
    //     AuthorizationExpire: 1738230380, // Expiration time (Unix timestamp)
    //     VideoId: 'd174b55a-71af-4edb-8385-751f606145a8', // Video GUID
    //     LibraryId: 376973
    //     , // Your Bunny.net library ID
    //   },
    //   metadata: {
    //     filetype: file.type,
    //     title: 'Video Title',
    //     collection: 'collectionID',
    //   },
    //   onError: function (error) {
    //     setUploading(false);
    //     setResponseMessage('Error: ' + error.message);
    //   },
    //   onProgress: function (bytesUploaded, bytesTotal) {
    //     setProgress((bytesUploaded / bytesTotal) * 100);
    //   },
    //   onSuccess: function () {
    //     setUploading(false);
    //     setResponseMessage('Upload complete!');
    //   },
    // });

    // upload.findPreviousUploads().then(function (previousUploads) {
    //   if (previousUploads.length) {
    //     upload.resumeFromPreviousUpload(previousUploads[0]);
    //   }

    //   upload.start();
    // });
  };

  return (
    <div>
      <h1>Upload Video</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Video"}
      </button>
      {uploading && <div>Progress: {progress.toFixed(2)}%</div>}
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default UploadVideo;


async function uploadToS3(file, setResponseMessage) {
  // Request presigned URL from your backend
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/course-bank/resource/create-file`,
      {
        method: "POST",
        body: JSON.stringify({
          title: file.name,
          fileType: file.type,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      console.log(await response.json());

      setResponseMessage("Failed to get presigned URL");
      return;
      // throw new Error("Failed to get presigned URL");
    }

    const { url } = await response.json();

    const fileStream = file.stream();
    const reader = fileStream.getReader();
    let uploadedBytes = 0;

    const uploadChunk = async (value) => {
      const uploadResponse = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: value,
      });

      if (uploadResponse.ok) {
        uploadedBytes += value.length;
        const percent = ((uploadedBytes / file.size) * 100).toFixed(2);
        setResponseMessage(`Upload progress: ${percent}%`);
        console.log(`Upload progress: ${percent}%`);
      } else {
        setResponseMessage("Upload failed");
        console.error("Upload failed");
      }
    };

    const readChunks = async () => {
      const { done, value } = await reader.read();
      if (done) {
        setResponseMessage("Upload completed");
        console.log("Upload completed");
        return;
      }
      await uploadChunk(value);
      readChunks(); // Continue with the next chunk
    };

    readChunks(); // Start reading and uploading
  } catch (error) {
    setResponseMessage("Error during file upload");
    console.error("Error during file upload:", error);
  }
}
