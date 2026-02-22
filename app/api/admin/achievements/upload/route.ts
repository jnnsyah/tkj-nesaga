import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "File is required" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const result = (await uploadImage(buffer, "achievements")) as {
            secure_url: string;
            public_id: string;
        };

        return NextResponse.json({
            imageUrl: result.secure_url,
            imagePublicId: result.public_id,
        });
    } catch (error: any) {
        console.error("Cloudinary upload error:", error);
        return NextResponse.json(
            { error: "Failed to upload image", details: error.message },
            { status: 500 }
        );
    }
}
