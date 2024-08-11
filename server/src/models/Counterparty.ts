import mongoose, { Schema, Document } from 'mongoose';

export interface ICounterparty extends Document {
  name: string;
  riskRating: number;
  industry: string;
  country: string;
  creditLimit: number;
  lastReviewDate: Date;
  financialData: {
    currentRatio: number;
    debtToEquityRatio: number;
    returnOnAssets: number;
    netProfitMargin: number;
  };
  qualitativeFactors: {
    industryRisk: number;
    countryRisk: number;
    managementQuality: number;
    marketPosition: number;
  };
}

const CounterpartySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  riskRating: { type: Number, required: true, min: 1, max: 10 },
  industry: { type: String, required: true },
  country: { type: String, required: true },
  creditLimit: { type: Number, required: true, min: 0 },
  lastReviewDate: { type: Date, default: Date.now },
  financialData: {
    currentRatio: { type: Number, required: true },
    debtToEquityRatio: { type: Number, required: true },
    returnOnAssets: { type: Number, required: true },
    netProfitMargin: { type: Number, required: true }
  },
  qualitativeFactors: {
    industryRisk: { type: Number, required: true, min: 1, max: 5 },
    countryRisk: { type: Number, required: true, min: 1, max: 5 },
    managementQuality: { type: Number, required: true, min: 1, max: 5 },
    marketPosition: { type: Number, required: true, min: 1, max: 5 }
  }
});

export default mongoose.model<ICounterparty>('Counterparty', CounterpartySchema);
