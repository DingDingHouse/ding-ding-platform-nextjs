import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * Defines the structure of the PaymentTypes document in MongoDB.
 */
export interface IPaymentTypes extends Document {
    name: string;
    thumbnail: string;
    qrs: mongoose.Types.ObjectId[];
    createdAt: Date;
}

const PaymentTypesSchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        thumbnail: { type: String, required: true },
        qrs: [{ type: mongoose.Schema.Types.ObjectId, ref: "qrs", default: [] }],
    },
    { timestamps: true }
);

const PaymentTypes: Model<IPaymentTypes> =
    mongoose.models.PaymentTypes || mongoose.model<IPaymentTypes>("PaymentTypes", PaymentTypesSchema);

export default PaymentTypes;
