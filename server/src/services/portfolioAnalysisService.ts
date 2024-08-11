import Counterparty from '../models/Counterparty';
import Position from '../models/Position';

export const getPortfolioAnalysis = async () => {
  const riskDistribution = await Counterparty.aggregate([
    {
      $group: {
        _id: { $floor: '$riskRating' },
        count: { $sum: 1 },
        totalCreditLimit: { $sum: '$creditLimit' }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const industryExposure = await Position.aggregate([
    {
      $lookup: {
        from: 'counterparties',
        localField: 'counterpartyId',
        foreignField: '_id',
        as: 'counterparty'
      }
    },
    { $unwind: '$counterparty' },
    {
      $group: {
        _id: '$counterparty.industry',
        totalExposure: { $sum: '$amount' }
      }
    },
    { $sort: { totalExposure: -1 } }
  ]);

  const topCounterparties = await Position.aggregate([
    {
      $lookup: {
        from: 'counterparties',
        localField: 'counterpartyId',
        foreignField: '_id',
        as: 'counterparty'
      }
    },
    { $unwind: '$counterparty' },
    {
      $group: {
        _id: '$counterpartyId',
        name: { $first: '$counterparty.name' },
        totalExposure: { $sum: '$amount' },
        riskRating: { $first: '$counterparty.riskRating' }
      }
    },
    { $sort: { totalExposure: -1 } },
    { $limit: 10 }
  ]);

  return {
    riskDistribution,
    industryExposure,
    topCounterparties
  };
};
