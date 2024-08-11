import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import CounterpartyManagement from './CounterpartyManagement';
import PositionMonitoring from './PositionMonitoring';
import PortfolioAnalysis from './PortfolioAnalysis';

const Dashboard: React.FC = () => {
  return (
    <div>
      <Typography variant="h4">Credit Risk Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <CounterpartyManagement />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <PositionMonitoring />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <PortfolioAnalysis />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
