import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';
import RiskRatingUpdate from './RiskRatingUpdate';

interface Counterparty {
  _id: string;
  name: string;
  riskRating: number;
  industry: string;
  country: string;
  creditLimit: number;
  lastReviewDate: string;
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

const CounterpartyManagement: React.FC = () => {
  const [counterparties, setCounterparties] = useState<Counterparty[]>([]);
  const [selectedCounterparty, setSelectedCounterparty] = useState<Counterparty | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newCounterparty, setNewCounterparty] = useState({
    name: '',
    industry: '',
    country: '',
    creditLimit: 0,
    riskRating: 5, // Default risk rating
    financialData: {
      currentRatio: 1,
      debtToEquityRatio: 1,
      returnOnAssets: 0.05,
      netProfitMargin: 0.1
    },
    qualitativeFactors: {
      industryRisk: 3,
      countryRisk: 3,
      managementQuality: 3,
      marketPosition: 3
    }
  });

  useEffect(() => {
    fetchCounterparties();
  }, []);

  const fetchCounterparties = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/counterparties`);
      setCounterparties(response.data);
    } catch (error) {
      console.error('Error fetching counterparties:', error);
    }
  };

  const handleAddCounterparty = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/counterparties`, newCounterparty);
      setCounterparties([...counterparties, response.data]);
      setOpenDialog(false);
      setNewCounterparty({
        name: '',
        industry: '',
        country: '',
        creditLimit: 0,
        riskRating: 5,
        financialData: {
          currentRatio: 1,
          debtToEquityRatio: 1,
          returnOnAssets: 0.05,
          netProfitMargin: 0.1
        },
        qualitativeFactors: {
          industryRisk: 3,
          countryRisk: 3,
          managementQuality: 3,
          marketPosition: 3
        }
      });
    } catch (error) {
      console.error('Error adding counterparty:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewCounterparty(prev => ({
      ...prev,
      [name]: name === 'creditLimit' ? Number(value) : value
    }));
  };

  const handleSelectCounterparty = (counterparty: Counterparty) => {
    setSelectedCounterparty(counterparty);
  };

  const handleUpdateComplete = () => {
    fetchCounterparties();
    setSelectedCounterparty(null);
  };

  return (
    <div>
      <Typography variant="h5">Counterparty Management</Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)} style={{ marginBottom: '20px' }}>
        Add Counterparty
      </Button>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Risk Rating</TableCell>
              <TableCell>Industry</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Credit Limit</TableCell>
              <TableCell>Last Review Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {counterparties.map((counterparty) => (
              <TableRow key={counterparty._id}>
                <TableCell>{counterparty.name}</TableCell>
                <TableCell>{counterparty.riskRating}</TableCell>
                <TableCell>{counterparty.industry}</TableCell>
                <TableCell>{counterparty.country}</TableCell>
                <TableCell>{counterparty.creditLimit}</TableCell>
                <TableCell>{new Date(counterparty.lastReviewDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button onClick={() => handleSelectCounterparty(counterparty)}>Update Risk Rating</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Counterparty</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={newCounterparty.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="industry"
            label="Industry"
            type="text"
            fullWidth
            value={newCounterparty.industry}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="country"
            label="Country"
            type="text"
            fullWidth
            value={newCounterparty.country}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="creditLimit"
            label="Credit Limit"
            type="number"
            fullWidth
            value={newCounterparty.creditLimit}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddCounterparty} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {selectedCounterparty && (
        <RiskRatingUpdate counterparty={selectedCounterparty} onUpdate={handleUpdateComplete} />
      )}
    </div>
  );
};

export default CounterpartyManagement;
