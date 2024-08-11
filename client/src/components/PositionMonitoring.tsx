import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import axios from 'axios';

interface Position {
  _id: string;
  counterpartyId: string;
  counterpartyName?: string;
  instrumentType: string;
  amount: number;
  currency: string;
  valueDate: string;
  lastUpdated: string;
}

interface Counterparty {
  _id: string;
  name: string;
}

const PositionMonitoring: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [counterparties, setCounterparties] = useState<Counterparty[]>([]);
  const [open, setOpen] = useState(false);
  const [newPosition, setNewPosition] = useState<Partial<Position>>({
    counterpartyId: '',
    instrumentType: '',
    amount: 0,
    currency: '',
    valueDate: new Date().toISOString().split('T')[0], // Set default to today's date
  });

  useEffect(() => {
    fetchPositions();
    fetchCounterparties();
  }, []);

  const fetchPositions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/positions`);
      setPositions(response.data);
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };

  const fetchCounterparties = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/counterparties`);
      setCounterparties(response.data);
    } catch (error) {
      console.error('Error fetching counterparties:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewPosition(prev => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/positions`, newPosition);
      handleClose();
      fetchPositions();
      // Reset newPosition state
      setNewPosition({
        counterpartyId: '',
        instrumentType: '',
        amount: 0,
        currency: '',
        valueDate: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      console.error('Error creating position:', error);
    }
  };

  return (
    <div>
      <Typography variant="h5">Position Monitoring</Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Position
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Counterparty</TableCell>
              <TableCell>Instrument Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Value Date</TableCell>
              <TableCell>Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {positions.map((position) => (
              <TableRow key={position._id}>
                <TableCell>{position.counterpartyName || 'Unknown'}</TableCell>
                <TableCell>{position.instrumentType}</TableCell>
                <TableCell>{position.amount}</TableCell>
                <TableCell>{position.currency}</TableCell>
                <TableCell>{new Date(position.valueDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(position.lastUpdated).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Position</DialogTitle>
        <DialogContent>
          <TextField
            select
            name="counterpartyId"
            label="Counterparty"
            fullWidth
            onChange={handleInputChange}
            value={newPosition.counterpartyId || ''}
            margin="normal"
          >
            {counterparties.map((counterparty) => (
              <MenuItem key={counterparty._id} value={counterparty._id}>
                {counterparty.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField name="instrumentType" label="Instrument Type" fullWidth onChange={handleInputChange} value={newPosition.instrumentType} margin="normal" />
          <TextField name="amount" label="Amount" type="number" fullWidth onChange={handleInputChange} value={newPosition.amount} margin="normal" />
          <TextField name="currency" label="Currency" fullWidth onChange={handleInputChange} value={newPosition.currency} margin="normal" />
          <TextField name="valueDate" label="Value Date" type="date" fullWidth onChange={handleInputChange} value={newPosition.valueDate} InputLabelProps={{ shrink: true }} margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PositionMonitoring;
