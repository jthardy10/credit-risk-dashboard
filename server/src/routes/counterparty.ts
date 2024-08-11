import express from 'express';
import Counterparty, { ICounterparty } from '../models/Counterparty';
import { calculateRiskRating } from '../services/riskRatingService';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const counterparties = await Counterparty.find();
    res.json(counterparties);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

router.post('/', async (req, res) => {
  const counterparty = new Counterparty(req.body);
  try {
    const newCounterparty = await counterparty.save();
    res.status(201).json(newCounterparty);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
});

router.post('/:id/update-risk', async (req, res) => {
  try {
    const counterparty = await Counterparty.findById(req.params.id);
    if (!counterparty) {
      return res.status(404).json({ message: 'Counterparty not found' });
    }
    counterparty.financialData = req.body.financialData;
    counterparty.qualitativeFactors = req.body.qualitativeFactors;
    const newRiskRating = calculateRiskRating(counterparty.financialData, counterparty.qualitativeFactors);
    counterparty.riskRating = newRiskRating;
    counterparty.lastReviewDate = new Date();
    const updatedCounterparty = await counterparty.save();
    res.json(updatedCounterparty);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
});

export default router;
