# SyncWallet&#x20;

## Overview

a modern wallet that combines and manages all your finances into one platforms that is easy to use, It allows users to create budgets, track transactions, and visualize financial data through reports. This project was developed as part of a programming challenge for the Taskforce PRO 2.0 program.

---

## Features

- **Budget Management:**

  - Create and manage budgets categorized by user-defined categories.
  - Track spending against allocated budgets.
  - Visualize budget usage with progress bars.

- **Transaction Tracking:**

  - You can Create and View Transactions

- **Reporting and Visualization:**

  - Generate reports to summarize spending habits.
  - View Transaction in given period

- **User-Friendly Interface:**

  - Intuitive and modern design using React and Tailwind CSS.

---

## Tech Stack

- **Frontend:**

  - React with TypeScript
  - Tailwind CSS for styling

- **Backend:**

  - Next.js API routes
  - Drizzle ORM for database interactions

- **Database:**

  - Neon PostgreSQL

---

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sunzuchris204/syncwallet.git
   cd syncwallet
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     DATABASE_URL=<your-neon-database-url>
     NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
     ```

4. Run database migrations:

   ```bash
   npx drizzle-kit up
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the app in your browser:

   ```
   http://localhost:3000
   ```

---

## API Endpoints

### Budgets

#### Create Budget

- **Endpoint:** `/api/budgets`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
      "amount": "1000.00",
      "category": "Lunch",
      "spent": "540.5"
  }
  ```
- **Response:**
  ```json
  {"message":"Budget created successfully","budget":[{"id":6,"amount":"1000.00","category":"Lunch","spent":"540.5"}]}
  ```

#### Fetch Budgets

- **Endpoint:** `/api/budgets`
- **Method:** `GET`
- **Response:**
  ```json
  {"budgetsData":[{"id":1,"amount":"5000.00","category":"Monthly Budget","spent":"1240.5"},{"id":2,"amount":"1000.00","category":"Transaportation","spent":"240.5"},{"id":4,"amount":"600.00","category":"Healthcare","spent":"0"},{"id":6,"amount":"1000.00","category":"Lunch","spent":"540.5"}]}
  ```

---

## Future Improvements

- Add authentication and user accounts.
- Syncing All Transaction with Budgets and Accounts
- Implement notifications for budget overspending.
- Sorting Transactions based on selected Account

---

## Credits

This project was developed by NIYIGENA CHRISTIAN as part of the Taskforce PRO 2.0 program challenge.&#x20;

