import { apiFetch } from "./apiFetch";

async function postRequest(url,body) {
  try{
    const data = await apiFetch(url,{
      method:"POST",
      body:JSON.stringify(body),
      headers:{"Content-Type": "application/json"},
    })
    if(!data.success) throw new Error("Request Failed");
    return data;
  }catch(error) {
    console.error("Request error:", error);
    throw error;
  }
}

export async function createVideo(title, bankID) {
  const json = await postRequest(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bank/resource/create-video`,
    {
      title:"",
      bankID:bankID,
    }
  );
  return json.data;
}

export async function uploadToS3(video,setProgress,
  setResponseMessage,
  videoData,
  setUploading,
  setProgressVariant,
  onClose,
  setVideo) {
  setProgressVariant("determinate");
  const data = videoData;
  const videoStream = video.stream();
  const reader = videoStream.getReader();
  let uploadBytes = 0;

  const uploadChunk = async (value) => {
    const uploadResponse = await apiFetch(data.url, {
      method:"PUT",
      headers:{"Content-Type": video.type},
      body:value,
    });
    if(!uploadResponse.ok) throw new Error ("Upload failed");

    uploadBytes += value.length;
    const percent = Math.round((uploadBytes/ video.size) * 100);
    setProgress(percent);
    setResponseMessage(`Uploading ${percent} %`);
  }

  const readChunks = async () => {
    try {
      const {done, value} = await reader.read();
      if(done) {
        setResponseMessage("Upload Completed");
        await verifyVideo(
          data.resourceID,

        )
      }
    } catch(error) {
      setResponseMessage()
    }
  };
  readChunks();
}

async function VerifyVideo(
  resourceID,
  videoID,
  bankID,
  setResponseMessage,
  setUploading,
  setProgressVariant
) {
  setProgressVariant("indeterminate");
  setResponseMessage("Verifying Video..");

  try {
    const data = await postRequest(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/bank/resource/verify-video`,
      {resourceID}
    );
    setResponseMessage("Video Verified");
    setUploading(false);
  }catch(error){
    setResponseMessage("Error verifying Video")
  }
}