import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface AnalysisData {
  riskDistribution: { _id: number; count: number; totalCreditLimit: number }[];
  industryExposure: { _id: string; totalExposure: number }[];
  topCounterparties: { _id: string; name: string; totalExposure: number; riskRating: number }[];
}

const PortfolioAnalysis: React.FC = () => {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/portfolio-analysis`);
        setAnalysisData(response.data);
      } catch (error) {
        console.error('Error fetching portfolio analysis data:', error);
      }
    };

    fetchAnalysisData();
  }, []);

  if (!analysisData) {
    return <Typography>Loading analysis...</Typography>;
  }

  const riskDistributionData = {
    labels: analysisData.riskDistribution.map(item => `Risk Level ${item._id}`),
    datasets: [
      {
        label: 'Number of Counterparties',
        data: analysisData.riskDistribution.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const industryExposureData = {
    labels: analysisData.industryExposure.map(item => item._id),
    datasets: [
      {
        data: analysisData.industryExposure.map(item => item.totalExposure),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
        ],
      },
    ],
  };

  return (
    <div>
      <Typography variant="h5">Portfolio Analysis</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6">Risk Distribution</Typography>
            <Bar
              data={riskDistributionData}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6">Industry Exposure</Typography>
            <Pie data={industryExposureData} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6">Top 10 Counterparties by Exposure</Typography>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Total Exposure</th>
                  <th>Risk Rating</th>
                </tr>
              </thead>
              <tbody>
                {analysisData.topCounterparties.map(counterparty => (
                  <tr key={counterparty._id}>
                    <td>{counterparty.name}</td>
                    <td>${counterparty.totalExposure.toLocaleString()}</td>
                    <td>{counterparty.riskRating.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default PortfolioAnalysis;
