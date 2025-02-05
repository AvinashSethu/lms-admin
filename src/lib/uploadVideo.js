export async function uploadToS3(file, setProgress,setResponseMessage) {
    // Request presigned URL from your backend
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/bank/resource/create-file`,
        {
          method: "POST",
          body: JSON.stringify({
            title: file.name,
            fileType: file.type,
            bankID:"a94fbab2-5eea-47a4-819b-e8f089c2d5ec"
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
  
      const { data } = await response.json();
  
      const fileStream = file.stream();
      const reader = fileStream.getReader();
      let uploadedBytes = 0;
  
      const uploadChunk = async (value) => {
        const uploadResponse = await fetch(data.url, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: value,
        });
  
        if (uploadResponse.ok) {
          uploadedBytes += value.length;
          const percent = ((uploadedBytes / file.size) * 100).toFixed(2);
          setResponseMessage(`Upload progress: ${percent}%`);
          setProgress(percent);
          console.log(`Upload progress: ${percent}%`);
        } else {
          setResponseMessage("Upload failed");
          console.error("Upload failed");
          return;
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
  
  export async function verifyFile(file) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/bank/resource/verify-file`,
          {
            method: "POST",
            body: JSON.stringify({ resourceID:"bank-resources/0cc070b7-831f-4e9d-a866-d637cf51d8c8-TEST.jpg" }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (response.ok && data.isValid) {
          return "File verified successfully.";
        } else {
          return "File verification failed: Invalid size.";
        }
      } catch (error) {
        return "Error verifying file.";
      }
    }