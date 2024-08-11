import express from 'express';
import Position, { IPosition } from '../models/Position';
import Counterparty from '../models/Counterparty';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const positions = await Position.find().populate('counterpartyId', 'name');
    res.json(positions);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

router.post('/', async (req, res) => {
  const position = new Position(req.body);
  try {
    const counterparty = await Counterparty.findById(position.counterpartyId);
    if (!counterparty) {
      return res.status(400).json({ message: 'Invalid counterparty ID' });
    }
    const newPosition = await position.save();
    res.status(201).json(newPosition);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
});

router.get('/counterparty/:id', async (req, res) => {
  try {
    const positions = await Position.find({ counterpartyId: req.params.id }).populate('counterpartyId', 'name');
    res.json(positions);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

export default router;
