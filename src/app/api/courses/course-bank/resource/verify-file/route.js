import { verifyFile } from "@/src/util/courses/bank/uploadFile";

export async function POST(request) {
    const { resourceID } = await request.json();
    if (!resourceID) {
        return Response.json({ error: "Missing required fields" }, { status: 400 });
    }
    try {
        const response = await verifyFile(resourceID);
        return Response.json(response);
    } catch (error) {
        console.error("Failed to verify file:", error);
        return Response.json({ error: "Failed to verify file" }, { status: 500 });
    }
}