# Credit Risk Dashboard

## Description
The Credit Risk Dashboard is a full-stack web application designed to help financial institutions manage and monitor credit risk. It provides tools for managing counterparties, monitoring positions, and analyzing portfolio risk.

## Features
- Counterparty Management
- Position Monitoring
- Risk Rating Calculation
- Portfolio Analysis

## Technology Stack
- Frontend: React.js with TypeScript
- Backend: Node.js with Express and TypeScript
- Database: MongoDB
- Containerization: Docker

## Prerequisites
- Docker and Docker Compose
- Node.js (for local development)

## Getting Started

### Running with Docker
1. Clone the repository:
   ```
   git clone https://github.com/jthardy10/credit-risk-dashboard.git
   cd credit-risk-dashboard
   ```

2. Start the application using Docker Compose:
   ```
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

### Local Development
1. Start MongoDB (ensure it's running on localhost:27017)

2. Set up the backend:
   ```
   cd server
   npm install
   npm run dev
   ```

3. Set up the frontend:
   ```
   cd client
   npm install
   npm start
   ```

## API Endpoints
- GET /api/counterparties - Fetch all counterparties
- POST /api/counterparties - Create a new counterparty
- POST /api/counterparties/:id/update-risk - Update risk rating for a counterparty
- GET /api/positions - Fetch all positions
- POST /api/positions - Create a new position
- GET /api/portfolio-analysis - Get portfolio analysis data

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
