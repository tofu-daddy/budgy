# BUDGY

A minimalist brutalist-style budget tracker web application for managing your personal finances.

## Features

- **Starting Balance**: Set and track your initial balance
- **Income & Expense Tracking**: Add, edit, and delete financial transactions
- **Real-time Calculations**: Automatically calculates total income, expenses, and current balance
- **Category Management**: Organize transactions by categories (Housing, Transportation, Food, etc.)
- **Local Storage**: All data persists locally in your browser
- **Edit Functionality**: Modify existing transactions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Brutalist UI**: Clean, bold design with sharp borders and shadows

## Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom brutalist styling with grid layout
- **Vanilla JavaScript**: No frameworks or dependencies
- **LocalStorage API**: Client-side data persistence

## Project Structure

```
budgy/
├── index.html          # Main HTML structure
├── styles/
│   └── main.css       # Brutalist styling
├── js/
│   └── logic.js       # Application logic and state management
└── README.md          # This file
```

## Getting Started

1. Clone or download this repository
2. Open `index.html`
3. Start tracking your budget!

No build process or dependencies required.

## Usage

### Setting Your Starting Balance

1. Enter your initial balance in the "Starting Balance" section
2. Click "Set Starting Balance"
3. This serves as your baseline for all calculations

### Adding Transactions

1. Fill in the transaction details:
   - **Description**: Brief description of the transaction (e.g., "Rent payment")
   - **Amount**: Transaction amount in dollars
   - **Type**: Choose between Expense or Income
   - **Category**: Select from 11 predefined categories
2. Click "Add" to save the transaction

### Editing Transactions

1. Click the "Edit" button on any transaction
2. Modify the details in the form
3. Click "Update" to save changes
4. Click "Cancel" to abort editing

### Deleting Transactions

Click the trash icon on any transaction to remove it permanently.

## Categories

- Housing
- Transportation
- Food
- Utilities
- Insurance
- Healthcare
- Savings
- Entertainment
- Personal
- Debt
- Other

## Data Privacy

All data is stored locally in your browser's localStorage. No data is sent to any server or third party.

## Credits

Made by [Toni Romero](https://x.com/madebylipsum)

## License

This project is open source and available for personal and educational use.
