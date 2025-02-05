import { apiFetch } from "./apiFetch";

async function postRequest(url, body) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!data.success) throw new Error("Request failed");
    return data;
  } catch (error) {
    console.error("Request error:", error);
    throw error;
  }
}

export async function createFile({ file, title, bankID }) {
  const json = await postRequest(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bank/resource/create-file`,
    {
      title: "hello", // Make sure this is dynamic if needed
      fileType: file.type,
      bankID: bankID,
    }
  );
  return json.data;
}

export async function uploadToS3(
  file,
  setProgress,
  setResponseMessage,
  fileData,
  setUploading,
  setProgressVariant,
  onClose,
  setFile
) {
  setProgressVariant("determinate");
  const data = fileData;
  const fileStream = file.stream();
  const reader = fileStream.getReader();
  let uploadedBytes = 0;

  const uploadChunk = async (value) => {
    const uploadResponse = await fetch(data.url, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: value,
    });

    if (!uploadResponse.ok) throw new Error("Upload failed");

    uploadedBytes += value.length;
    const percent = Math.round((uploadedBytes / file.size) * 100);
    setProgress(percent);
    setResponseMessage(`Uploading ${percent}%`);
  };

  const readChunks = async () => {
    try {
      const { done, value } = await reader.read();
      if (done) {
        setResponseMessage("Upload completed");
        await verifyFile(
          data.resourceID,
          setResponseMessage,
          setUploading,
          setProgressVariant
        );
        setFile(null);
        setResponseMessage("No file selected");
        onClose();
        return;
      }
      await uploadChunk(value);
      readChunks(); // Continue with the next chunk
    } catch (error) {
      setResponseMessage("Error during file upload");
      console.error("Error during file upload:", error);
      throw error;
    }
  };

  readChunks(); // Start reading and uploading
}

async function verifyFile(
  resourceID,
  setResponseMessage,
  setUploading,
  setProgressVariant
) {
  setProgressVariant("indeterminate");
  setResponseMessage("Verifying File...");

  try {
    const data = await postRequest(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/bank/resource/verify-file`,
      { resourceID }
    );
    setResponseMessage("File verified");
    setUploading(false);
  } catch (error) {
    setResponseMessage("Error verifying file.");
  }
}
