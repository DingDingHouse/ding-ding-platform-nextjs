import { NextResponse } from 'next/server';
import PaymentTypes from '@/models/paymentTypes';
import cloudinary from '@/utils/cloudinary';
import connectdatabase from "@/lib/mongodb";

export async function POST(request: Request) {
    try {
        await connectdatabase();

        const formData = await request.formData();
        const name = formData.get("name") as string;
        const file = formData.get("image") as File | null;

        if (!name) {
            return NextResponse.json({ message: "Name is required" }, { status: 400 });
        }

        const existingPlatform = await PaymentTypes.findOne({ name });
        if (existingPlatform) {
            return NextResponse.json(
                { message: "A payment platform with this name already exists." },
                { status: 400 }
            );
        }

        let thumbnail = "";

        if (file) {
            console.log("Received file:", file);
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            console.log("Uploading to Cloudinary...");
            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "payment_types" },
                    (error, result) => {
                        if (error) {
                            console.error("Cloudinary Upload Error:", error);
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
                uploadStream.end(buffer);
            });

            thumbnail = (uploadResult as any).secure_url;
            console.log("Upload Success:", thumbnail);
        }

        const newPlatformType = await PaymentTypes.create({ name, thumbnail, Qrs: [] });

        return NextResponse.json(
            { message: "Platform type created", data: newPlatformType },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error in POST /api/paymentTypes:", error);
        return NextResponse.json({ message: "Creation failed", error: error }, { status: 500 });
    }
}


export async function GET() {
    try {
        await connectdatabase()

        const platformTypes = await PaymentTypes.find();
        if (platformTypes.length === 0) {
            return NextResponse.json({ message: "No platform types available, please add first" }, { status: 200 });
        }
        return NextResponse.json({ platformTypes: platformTypes }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Fetching failed", error }, { status: 500 });
    }
}


export async function PUT(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const file = formData.get("image") as File | null;

    if (!id || !name) {
        return NextResponse.json({ message: "ID and name are required" }, { status: 400 });
    }

    try {
        await connectdatabase()

        const existingPlatformType = await PaymentTypes.findById(id);
        if (!existingPlatformType) {
            return NextResponse.json({ message: "Platform type not found" }, { status: 404 });
        }

        let thumbnail = existingPlatformType.thumbnail;

        if (file) {
            console.log("Uploading new file to Cloudinary...");

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "payment_types" },
                    (error, result) => {
                        if (error) {
                            console.error("Cloudinary Upload Error:", error);
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
                uploadStream.end(buffer);
            });

            thumbnail = (uploadResult as any).secure_url;

            if (existingPlatformType.thumbnail) {
                console.log("Deleting old file from Cloudinary...");
                const publicId = existingPlatformType.thumbnail.split("/").pop()?.split(".")[0];
                if (publicId) {
                    await cloudinary.uploader.destroy(`payment_types/${publicId}`);
                    console.log("Old file deleted from Cloudinary.");
                }
            }
        }

        const updatedPlatformType = await PaymentTypes.findByIdAndUpdate(
            id,
            { name, thumbnail },
            { new: true }
        );

        return NextResponse.json(
            { message: `Payment type updated`, data: updatedPlatformType },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in PUT /api/paymentTypes:", error);
        return NextResponse.json({ message: "Update failed", error }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    try {
        await connectdatabase()

        const existingPlatformType = await PaymentTypes.findById(id);
        if (!existingPlatformType) {
            return NextResponse.json({ message: "Platform type not found" }, { status: 404 });
        }

        if (existingPlatformType.thumbnail) {
            console.log("Deleting associated file from Cloudinary...");
            const publicId = existingPlatformType.thumbnail.split("/").pop()?.split(".")[0];
            if (publicId) {
                await cloudinary.uploader.destroy(`payment_types/${publicId}`);
                console.log("Image deleted from Cloudinary.");
            }
        }

        await PaymentTypes.findByIdAndDelete(id);

        return NextResponse.json({ message: "Platform type deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error in DELETE /api/paymentTypes:", error);
        return NextResponse.json({ message: "Deletion failed", error }, { status: 500 });
    }
}