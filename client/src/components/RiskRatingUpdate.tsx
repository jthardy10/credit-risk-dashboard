import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, Paper } from '@mui/material';
import axios from 'axios';

interface Counterparty {
  _id: string;
  name: string;
  riskRating: number;
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

interface Props {
  counterparty: Counterparty;
  onUpdate: () => void;
}

const RiskRatingUpdate: React.FC<Props> = ({ counterparty, onUpdate }) => {
  const [financialData, setFinancialData] = useState(counterparty.financialData);
  const [qualitativeFactors, setQualitativeFactors] = useState(counterparty.qualitativeFactors);

  const handleFinancialDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFinancialData({ ...financialData, [event.target.name]: parseFloat(event.target.value) });
  };

  const handleQualitativeFactorsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQualitativeFactors({ ...qualitativeFactors, [event.target.name]: parseInt(event.target.value) });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/counterparties/${counterparty._id}/update-risk`, {
        financialData,
        qualitativeFactors
      });
      onUpdate();
    } catch (error) {
      console.error('Error updating risk rating:', error);
    }
  };

  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h6">Update Risk Rating for {counterparty.name}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Financial Data</Typography>
          <TextField
            name="currentRatio"
            label="Current Ratio"
            type="number"
            value={financialData.currentRatio}
            onChange={handleFinancialDataChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="debtToEquityRatio"
            label="Debt to Equity Ratio"
            type="number"
            value={financialData.debtToEquityRatio}
            onChange={handleFinancialDataChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="returnOnAssets"
            label="Return on Assets"
            type="number"
            value={financialData.returnOnAssets}
            onChange={handleFinancialDataChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="netProfitMargin"
            label="Net Profit Margin"
            type="number"
            value={financialData.netProfitMargin}
            onChange={handleFinancialDataChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Qualitative Factors</Typography>
          <TextField
            name="industryRisk"
            label="Industry Risk (1-5)"
            type="number"
            value={qualitativeFactors.industryRisk}
            onChange={handleQualitativeFactorsChange}
            fullWidth
            margin="normal"
            inputProps={{ min: 1, max: 5 }}
          />
          <TextField
            name="countryRisk"
            label="Country Risk (1-5)"
            type="number"
            value={qualitativeFactors.countryRisk}
            onChange={handleQualitativeFactorsChange}
            fullWidth
            margin="normal"
            inputProps={{ min: 1, max: 5 }}
          />
          <TextField
            name="managementQuality"
            label="Management Quality (1-5)"
            type="number"
            value={qualitativeFactors.managementQuality}
            onChange={handleQualitativeFactorsChange}
            fullWidth
            margin="normal"
            inputProps={{ min: 1, max: 5 }}
          />
          <TextField
            name="marketPosition"
            label="Market Position (1-5)"
            type="number"
            value={qualitativeFactors.marketPosition}
            onChange={handleQualitativeFactorsChange}
            fullWidth
            margin="normal"
            inputProps={{ min: 1, max: 5 }}
          />
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
        Update Risk Rating
      </Button>
    </Paper>
  );
};

export default RiskRatingUpdate;
