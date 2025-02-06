import { apiFetch } from "./apiFetch";

export async function createFile({ file, title, bankID }) {
  const json = await apiFetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bank/resource/create-file`,
    {
      method: "POST",
      body: JSON.stringify({
        title: "hello",
        fileName: file.name,
        fileType: file.type,
        bankID: bankID,
      }),
      headers: { "Content-Type": "application/json" },
    }
  );
  return json;
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
  const data = fileData.data;
  console.log(data);

  const fileStream = file.stream();
  const reader = fileStream.getReader();
  let uploadedBytes = 0;

  const uploadChunk = async (value) => {
    const uploadResponse = await fetch(data.url, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: value,
    });

    if (!uploadResponse) throw new Error("Upload failed");

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
          setProgressVariant,
          data.path
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
  setProgressVariant,
  path
) {
  setProgressVariant("indeterminate");
  setResponseMessage("Verifying File...");

  try {
    const data = await apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/bank/resource/verify-file`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resourceID,
          path,
        }),
      }
    );
    setResponseMessage("File verified");
    setUploading(false);
  } catch (error) {
    setResponseMessage("Error verifying file.");
  }
}
