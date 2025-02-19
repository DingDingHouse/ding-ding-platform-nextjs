import mongoose, { Schema, Document } from 'mongoose';

interface IQr extends Document {
    name: string;
    image: string;
    paymentPlatform: string;
    status: string;
    createdAt: Date;
}

const QrSchema: Schema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    paymentPlatform: { type: String, required: true },
    status: { type: String, required: true, default: 'inactive' },

},
    { timestamps: true });

const QrsModel = mongoose.models.Qr || mongoose.model<IQr>('Qr', QrSchema);

export default QrsModel;