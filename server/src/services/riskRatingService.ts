interface FinancialData {
  currentRatio: number;
  debtToEquityRatio: number;
  returnOnAssets: number;
  netProfitMargin: number;
}

interface QualitativeFactors {
  industryRisk: number;
  countryRisk: number;
  managementQuality: number;
  marketPosition: number;
}

export const calculateRiskRating = (financialData: FinancialData, qualitativeFactors: QualitativeFactors): number => {
  const financialScore = (
    scoreCurrentRatio(financialData.currentRatio) +
    scoreDebtToEquity(financialData.debtToEquityRatio) +
    scoreReturnOnAssets(financialData.returnOnAssets) +
    scoreNetProfitMargin(financialData.netProfitMargin)
  ) / 4 * 0.6;

  const qualitativeScore = (
    qualitativeFactors.industryRisk +
    qualitativeFactors.countryRisk +
    qualitativeFactors.managementQuality +
    qualitativeFactors.marketPosition
  ) / 4 * 0.4;

  const totalScore = (financialScore + qualitativeScore) * 2;
  return Math.round(totalScore * 2) / 2;
};

const scoreCurrentRatio = (ratio: number): number => {
  if (ratio >= 2) return 5;
  if (ratio >= 1.5) return 4;
  if (ratio >= 1) return 3;
  if (ratio >= 0.5) return 2;
  return 1;
};

const scoreDebtToEquity = (ratio: number): number => {
  if (ratio <= 0.5) return 5;
  if (ratio <= 1) return 4;
  if (ratio <= 1.5) return 3;
  if (ratio <= 2) return 2;
  return 1;
};

const scoreReturnOnAssets = (ratio: number): number => {
  if (ratio >= 0.1) return 5;
  if (ratio >= 0.07) return 4;
  if (ratio >= 0.04) return 3;
  if (ratio >= 0.02) return 2;
  return 1;
};

const scoreNetProfitMargin = (ratio: number): number => {
  if (ratio >= 0.2) return 5;
  if (ratio >= 0.15) return 4;
  if (ratio >= 0.1) return 3;
  if (ratio >= 0.05) return 2;
  return 1;
};
