# Waza-Senior Software Engineer Assessment

## Requirements
- NodeJS (Tested on v20)

## Setup

1. Clone the repository.
2. Install the required dependencies:
    ```bash
    npm install
    ```
3. Start the CLI App:
    ```bash
    npm start
    ```
4. To run tests:
    ```bash
    npm test
    ```

## Operations

### 1. Create Account
Command:
```
createAccount>"Name","AccountType",Balance,"Currency"
```
**Note**: Please use double quotes only.

Example:
```bash
createAccount>"John Neil","Savings",700,"USD"
```

### 2. Transfer Funds
Command:
```
transferFunds>"SourceID","DestID",Amount
```
Example:
```bash
transferFunds>"opxqs91cs","fri8voce4",100
```

### 3. Get Transaction History
Command:
```
getTransactionHistory>"AccountID"
```
Example:
```bash
getTransactionHistory>"7owoz6062"
```

### 4. Get Account Details
Command:
```
getAccount>"AccountID"
```
Example:
```bash
getAccount>"7owoz6062"
```

### 5. Exit the CLI
Command:
```
exit
```
```
