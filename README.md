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
### Accounts

#### Create Account

- **Endpoint:** `/api/accounts/`
- **Method:** `POST`
- **Request Body:**
```json
{
    "name": "Testing Account",
    "balance": "1000.00"
}
```

- **Response:**
```json
{"message":"Account created","createdAccounts":{"command":"INSERT","rowCount":1,"rows":[],"fields":[],"rowAsArray":false,"viaNeonFetch":true,"_parsers":[],"_types":{"_types":{"arrayParser":{},"builtins":{"BOOL":16,"BYTEA":17,"CHAR":18,"INT8":20,"INT2":21,"INT4":23,"REGPROC":24,"TEXT":25,"OID":26,"TID":27,"XID":28,"CID":29,"JSON":114,"XML":142,"PG_NODE_TREE":194,"SMGR":210,"PATH":602,"POLYGON":604,"CIDR":650,"FLOAT4":700,"FLOAT8":701,"ABSTIME":702,"RELTIME":703,"TINTERVAL":704,"CIRCLE":718,"MACADDR8":774,"MONEY":790,"MACADDR":829,"INET":869,"ACLITEM":1033,"BPCHAR":1042,"VARCHAR":1043,"DATE":1082,"TIME":1083,"TIMESTAMP":1114,"TIMESTAMPTZ":1184,"INTERVAL":1186,"TIMETZ":1266,"BIT":1560,"VARBIT":1562,"NUMERIC":1700,"REFCURSOR":1790,"REGPROCEDURE":2202,"REGOPER":2203,"REGOPERATOR":2204,"REGCLASS":2205,"REGTYPE":2206,"UUID":2950,"TXID_SNAPSHOT":2970,"PG_LSN":3220,"PG_NDISTINCT":3361,"PG_DEPENDENCIES":3402,"TSVECTOR":3614,"TSQUERY":3615,"GTSVECTOR":3642,"REGCONFIG":3734,"REGDICTIONARY":3769,"JSONB":3802,"REGNAMESPACE":4089,"REGROLE":4096}},"text":{},"binary":{}}}}
```

#### Fetch Account

- **Endpoint:** `/api/accounts`
- **Method:** `GET`
- **Response:**
  ```
  {"AccountsData":[{"id":1,"name":"Bk","balance":"1000.00"},{"id":3,"name":"Equity Savings","balance":"2000.00"},{"id":2,"name":"Mtn Mobile Money","balance":"540.00"},{"id":14,"name":"Sunzu Christian","balance":"720.00"},{"id":17,"name":"COA","balance":"150.00"},{"id":18,"name":"Testing Account","balance":"1000.00"}]}
  ```


### Transactions

#### Create Transactions

- **Endpoint:** `/api/transactions/`
- **Method:** `POST`
- **Request Body:**
```json
{
    "amount": "1010.00",
    "type": "Income",
    "accountId": 3,
    "category": "Salary"
}
```

- **Response:**
```
{
    "message": "Transaction created successfully",
}
```

#### Fetch Transactions
- **Endpoint:** `/api/accounts`
- **Method:** `GET`
- **Response:**

```
{"transactionsData":[{"id":10,"amount":"3777.00","type":"Income","accountId":2,"date":"2025-01-12 17:07:27.269035","category":"blessings"},{"id":6,"amount":"3111.00","type":"Income","accountId":1,"date":"2025-01-13 17:07:27.269035","category":"gift"},{"id":14,"amount":"3777.00","type":"Expense","accountId":1,"date":"2025-01-19 07:22:46.077","category":"Hosting"},{"id":15,"amount":"129.00","type":"Income","accountId":2,"date":"2025-01-19 00:00:00","category":"gifts"},{"id":12,"amount":"100.00","type":"Income","accountId":2,"date":"2025-01-15 00:00:00","category":"Payback"},{"id":11,"amount":"1232.00","type":"Expense","accountId":3,"date":"2025-01-14 00:00:00","category":"never"},{"id":9,"amount":"522.00","type":"Expense","accountId":1,"date":"2025-01-12 22:23:15.138","category":"Groceries"},{"id":13,"amount":"120.00","type":"Expense","accountId":1,"date":"2025-01-16 00:00:00","category":"Snacks"}]}
```

### Reports
#### Fetch Reports
- **Endpoint:** `/api/Reports/?startDate=2025-01-15&endDate=2025-01-19`
- **Method:** `GET`
- **Response:**

```
{"ReportsData":[{"id":15,"amount":"129.00","type":"Income","accountId":2,"date":"2025-01-19 00:00:00","category":"gifts"},{"id":12,"amount":"100.00","type":"Income","accountId":2,"date":"2025-01-15 00:00:00","category":"Payback"},{"id":13,"amount":"120.00","type":"Expense","accountId":1,"date":"2025-01-16 00:00:00","category":"Snacks"}]}

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

