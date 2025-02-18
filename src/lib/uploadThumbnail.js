import { apiFetch } from "./apiFetch";

export async function createThumbnail({ file, courseID, goalID }) {
  return await apiFetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/goals/courses/create-thumb`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseID,
        goalID,
        fileName: file.name,
        fileType: file.type,
      }),
    }
  );
}

export async function uploadThumbnailToS3({
  file,
  fileData,
  setProgress,
  setResponseMessage,
  setUploading,
  setProgressVariant,
  setCourse,
}) {
  setProgressVariant("determinate");

  const data = fileData.data;
  const fileStream = file.stream();
  const reader = fileStream.getReader();
  let uploadedBytes = 0;

  const uploadChunk = async (chunk) => {
    const response = await fetch(data.url, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: chunk,
    });

    if (!response.ok) throw new Error("Upload failed");

    uploadedBytes += chunk.length;
    const percent = Math.round((uploadedBytes / file.size) * 100);
    setProgress(percent);
    setResponseMessage(`Uploading ${percent}%`);
  };

  const readChunks = async () => {
    try {
      const { done, value } = await reader.read();
      if (done) {
        setResponseMessage("Upload completed");
        setUploading(false);
        setCourse((prev) => ({ ...prev, thumbnail: data.url }));
        return;
      }
      await uploadChunk(value);
      readChunks(); // Continue uploading next chunk
    } catch (error) {
      setResponseMessage("Error during upload");
      console.error("Upload error:", error);
      setUploading(false);
    }
  };

  readChunks(); // Start uploading
}
