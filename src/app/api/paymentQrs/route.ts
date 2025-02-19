import { NextResponse } from "next/server";
import QrsModel from "@/models/QrsModel";
import PaymentTypes from "@/models/paymentTypes";
import cloudinary from "@/utils/cloudinary";
import mongoose from "mongoose";
import connectdatabase from "@/lib/mongodb";

export async function POST(request: Request) {
    try {
        await connectdatabase();
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const paymentPlatform = formData.get("paymentPlatform") as string;
        const file = formData.get("image") as File | null;
        const status = formData.get("status") as string || "inactive";

        if (!name || !paymentPlatform || !file) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const existingQr = await QrsModel.findOne({ name, paymentPlatform });
        if (existingQr) {
            return NextResponse.json({ message: "A QR code with this name already exists for this payment platform." }, { status: 400 });
        }

        console.log("Uploading QR code to Cloudinary...");
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "qr_codes" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(buffer);
        });

        const imageUrl = (uploadResult as any).secure_url;
        console.log("Upload Success:", imageUrl);

        // ✅ Create new QR code entry
        const newQr = await QrsModel.create({ name, image: imageUrl, paymentPlatform, status });
        console.log("QR Code saved successfully:", newQr);

        // ✅ Attach QR to Payment Type
        const paymentType = await PaymentTypes.findOne({ name: paymentPlatform });

        if (!paymentType) {
            return NextResponse.json({ message: "Payment Platform not found" }, { status: 404 });
        }

        paymentType.qrs.push(newQr._id as mongoose.Types.ObjectId);
        await paymentType.save();

        console.log(`QR ID attached to ${paymentPlatform}`);

        return NextResponse.json(
            { message: "QR Code uploaded and linked successfully", data: newQr },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error in POST /api/paymentQrs:", error);
        return NextResponse.json({ message: "QR Code upload failed", error }, { status: 500 });
    }
}





export async function GET(request: Request) {
    try {
        await connectdatabase();

        const { searchParams } = new URL(request.url);
        const paymentTypeName = searchParams.get("paymentTypeName");
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const skip = (page - 1) * limit;

        let paymentTypes;

        if (paymentTypeName) {
            paymentTypes = await PaymentTypes.findOne({ name: paymentTypeName })
                .populate({
                    path: "Qrs",
                    model: "Qr", 
                    match: { status: "active" },
                    options: { skip, limit, strictPopulate: false }, 
                });

            if (!paymentTypes) {
                return NextResponse.json({ message: "PaymentType not found" }, { status: 404 });
            }

            return NextResponse.json(
                { message: "QR Codes fetched successfully", paymentTypes },
                { status: 200 }
            );
        }

        paymentTypes = await PaymentTypes.find()
            .populate({
                path: "Qrs",
                model: "Qr",  
                match: { status: "active" },
                options: { skip, limit, strictPopulate: false }, 
            });

        if (!paymentTypes.length) {
            return NextResponse.json({ message: "No payment types found, please add first" }, { status: 200 });
        }

        return NextResponse.json(
            {
                message: "All Payment Types with Active QR Codes fetched successfully",
                paymentTypes,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(paymentTypes.length / limit),
                    limit
                }
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in GET /api/paymentQrs:", error);
        return NextResponse.json({ message: "Fetching QR Codes failed", error }, { status: 500 });
    }
}




export async function PUT(request: Request) {
    try {
        await connectdatabase();

        const { searchParams } = new URL(request.url);
        const qrId = searchParams.get("id");

        if (!qrId || !mongoose.Types.ObjectId.isValid(qrId)) {
            return NextResponse.json({ message: "Valid QR ID is required" }, { status: 400 });
        }

        const formData = await request.formData();
        const name = formData.get("name") as string;
        const file = formData.get("image") as File | null;
        const status = formData.get("status") as string;

        if (!name) {
            return NextResponse.json({ message: "QR name is required" }, { status: 400 });
        }

        const existingQr = await QrsModel.findById(qrId);

        if (!existingQr) {
            return NextResponse.json({ message: "QR Code not found" }, { status: 404 });
        }

        let imageUrl = existingQr.image;

        if (file) {
            console.log("Uploading new QR code to Cloudinary...");
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "qr_codes" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(buffer);
            });

            imageUrl = (uploadResult as any).secure_url;
            const publicId = existingQr.image.split("/").pop()?.split(".")[0];
            if (publicId) {
                await cloudinary.uploader.destroy(`qr_codes/${publicId}`);
                console.log("Old QR image deleted from Cloudinary.");
            }
        }

        existingQr.name = name;
        existingQr.image = imageUrl;
        if (status) existingQr.status = status;
        await existingQr.save();

        return NextResponse.json(
            { message: "QR Code updated successfully", data: existingQr },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in PUT /api/paymentQrs:", error);
        return NextResponse.json({ message: "QR Code update failed", error }, { status: 500 });
    }
}


export async function DELETE(request: Request) {
    try {
        await connectdatabase()

        const { searchParams } = new URL(request.url);
        const qrId = searchParams.get("id");

        if (!qrId || !mongoose.Types.ObjectId.isValid(qrId)) {
            return NextResponse.json({ message: "Valid QR ID is required" }, { status: 400 });
        }

        const existingQr = await QrsModel.findById(qrId);

        if (!existingQr) {
            return NextResponse.json({ message: "QR Code not found" }, { status: 404 });
        }

        const publicId = existingQr.image.split("/").pop()?.split(".")[0];
        if (publicId) {
            await cloudinary.uploader.destroy(`qr_codes/${publicId}`);
            console.log("QR image deleted from Cloudinary.");
        }

        await PaymentTypes.updateMany(
            { Qrs: qrId },
            { $pull: { Qrs: qrId } }
        );

        await QrsModel.findByIdAndDelete(qrId);

        return NextResponse.json({ message: "QR Code deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error in DELETE /api/paymentQrs:", error);
        return NextResponse.json({ message: "QR Code deletion failed", error }, { status: 500 });
    }
}
