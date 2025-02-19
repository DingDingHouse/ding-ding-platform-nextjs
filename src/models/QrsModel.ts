import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * Defines the structure of the Qrs document in MongoDB.
 */
export interface IQrs extends Document {
    name: string;
    image: string;
    paymentPlatform: string;
    createdAt: Date;
}

const QrsSchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        paymentPlatform: { type: String, required: true },
    },
    { timestamps: true }
);

const QrsModel: Model<IQrs> = mongoose.models.Qrs || mongoose.model<IQrs>("Qrs", QrsSchema);

export default QrsModel;
