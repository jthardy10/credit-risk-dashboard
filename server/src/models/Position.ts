import mongoose, { Schema, Document } from 'mongoose';

export interface IPosition extends Document {
  counterpartyId: mongoose.Types.ObjectId;
  instrumentType: string;
  amount: number;
  currency: string;
  valueDate: Date;
  lastUpdated: Date;
}

const PositionSchema: Schema = new Schema({
  counterpartyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Counterparty', required: true },
  instrumentType: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  valueDate: { type: Date, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model<IPosition>('Position', PositionSchema);
