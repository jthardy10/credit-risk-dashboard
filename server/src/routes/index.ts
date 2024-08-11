import express from 'express';
import counterpartyRoutes from './counterparty';
import positionRoutes from './position';
import { getPortfolioAnalysis } from '../services/portfolioAnalysisService';

const router = express.Router();

router.use('/counterparties', counterpartyRoutes);
router.use('/positions', positionRoutes);

router.get('/portfolio-analysis', async (req, res) => {
  try {
    const analysis = await getPortfolioAnalysis();
    res.json(analysis);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

export default router;
