// State
    let transactions = [];
    let editingId = null;
    let startingBalance = 0;

    // DOM Elements
    const transactionForm = document.getElementById('transaction-form');
    const startingBalanceForm = document.getElementById('starting-balance-form');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const typeSelect = document.getElementById('type');
    const categorySelect = document.getElementById('category');
    const submitBtn = document.getElementById('submit-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const formTitle = document.getElementById('form-title');
    const transactionsList = document.getElementById('transactions-list');
    const startingBalanceInput = document.getElementById('starting-balance-input');
    const startingBalanceDisplay = document.getElementById('starting-balance-display');
    const startingBalanceModalDisplay = document.getElementById('starting-balance-modal-display');
    const startingBalanceModal = document.getElementById('starting-balance-modal');
    const editStartingBalanceBtn = document.getElementById('edit-starting-balance-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const cancelModalBtn = document.getElementById('cancel-modal-btn');

    // Load data from localStorage
    function loadData() {
      const savedTransactions = localStorage.getItem('budgetTransactions');
      const savedStartingBalance = localStorage.getItem('budgetStartingBalance');
      
      if (savedTransactions) {
        try {
          transactions = JSON.parse(savedTransactions);
        } catch (e) {
          console.error('Failed to load transactions');
        }
      }
      
      if (savedStartingBalance) {
        startingBalance = parseFloat(savedStartingBalance);
      }
      
      updateStartingBalanceDisplay();
      updateUI();
    }

    // Save data to localStorage
    function saveData() {
      localStorage.setItem('budgetTransactions', JSON.stringify(transactions));
      localStorage.setItem('budgetStartingBalance', startingBalance.toString());
    }

    // Update starting balance display
    function updateStartingBalanceDisplay() {
      const formattedBalance = '$' + startingBalance.toFixed(2);
      startingBalanceDisplay.textContent = formattedBalance;
      startingBalanceModalDisplay.textContent = formattedBalance;
    }

    // Open modal
    function openModal() {
      startingBalanceModal.classList.add('active');
      startingBalanceInput.value = '';
      startingBalanceInput.focus();
    }

    // Close modal
    function closeModal() {
      startingBalanceModal.classList.remove('active');
      startingBalanceInput.value = '';
    }

    // Modal event listeners
    editStartingBalanceBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelModalBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    startingBalanceModal.addEventListener('click', (e) => {
      if (e.target === startingBalanceModal) {
        closeModal();
      }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && startingBalanceModal.classList.contains('active')) {
        closeModal();
      }
    });

    // Calculate totals
    function calculateTotals() {
      const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const balance = startingBalance + income - expenses;
      
      return { income, expenses, balance };
    }

    // Update UI
    function updateUI() {
      const totals = calculateTotals();

      // Update totals
      document.getElementById('total-income').textContent = '$' + totals.income.toFixed(2);
      document.getElementById('total-expenses').textContent = '$' + totals.expenses.toFixed(2);

      const balanceElement = document.getElementById('total-balance');

      balanceElement.textContent = '$' + totals.balance.toFixed(2);

      if (totals.balance >= 0) {
        balanceElement.className = 'balance-hero-amount text-green';
      } else {
        balanceElement.className = 'balance-hero-amount text-red';
      }

      // Update transactions list
      renderTransactions();
    }

    // Render transactions
    function renderTransactions() {
      if (transactions.length === 0) {
        transactionsList.innerHTML = `
          <div class="empty-state">
            <p>No transactions yet</p>
            <p>Add your first transaction above</p>
          </div>
        `;
        return;
      }

      transactionsList.innerHTML = transactions.map(transaction => `
        <div class="transaction-item">
          <div class="transaction-content">
            <div class="transaction-left">
              <div>
                <span class="category-pill">${transaction.category}</span>
                ${transaction.type === 'income' ? '<span class="category-pill income">INCOME</span>' : ''}
              </div>
              <p class="transaction-description">${transaction.description}</p>
              <p class="transaction-date">${formatDate(transaction.date)}</p>
            </div>
            
            <div class="transaction-right">
              <div class="transaction-amount ${transaction.type === 'income' ? 'text-green' : 'text-red'}">
                ${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}
              </div>
              
              <div class="transaction-actions">
                <button class="btn btn-secondary btn-small" onclick="editTransaction(${transaction.id})">
                  Edit
                </button>
                <button class="btn btn-danger btn-small" onclick="deleteTransaction(${transaction.id})">
                  <svg class="icon icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Format date
    function formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    // Handle starting balance form submit
    startingBalanceForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const value = parseFloat(startingBalanceInput.value);

      if (value >= 0) {
        startingBalance = value;
        updateStartingBalanceDisplay();
        saveData();
        updateUI();
        closeModal();
      }
    });

    // Handle transaction form submit
    transactionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const description = descriptionInput.value.trim();
      const amount = parseFloat(amountInput.value);
      const type = typeSelect.value;
      const category = categorySelect.value;
      
      if (!description || amount <= 0) {
        return;
      }

      const transaction = {
        id: editingId || Date.now(),
        description,
        amount,
        type,
        category,
        date: new Date().toISOString()
      };

      if (editingId) {
        const index = transactions.findIndex(t => t.id === editingId);
        transactions[index] = transaction;
        editingId = null;
        formTitle.textContent = 'ADD TRANSACTION';
        submitBtn.querySelector('span').textContent = 'Add';
        cancelBtn.style.display = 'none';
      } else {
        transactions.unshift(transaction);
      }

      // Reset form
      descriptionInput.value = '';
      amountInput.value = '';
      typeSelect.value = 'expense';
      categorySelect.value = 'Other';

      saveData();
      updateUI();
    });

    // Edit transaction
    window.editTransaction = (id) => {
      const transaction = transactions.find(t => t.id === id);
      
      if (transaction) {
        descriptionInput.value = transaction.description;
        amountInput.value = transaction.amount;
        typeSelect.value = transaction.type;
        categorySelect.value = transaction.category;
        editingId = id;
        
        formTitle.textContent = 'EDIT TRANSACTION';
        submitBtn.querySelector('span').textContent = 'Update';
        cancelBtn.style.display = 'inline-flex';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Delete transaction
    window.deleteTransaction = (id) => {
      transactions = transactions.filter(t => t.id !== id);
      saveData();
      updateUI();
    };

    // Cancel edit
    cancelBtn.addEventListener('click', () => {
      editingId = null;
      descriptionInput.value = '';
      amountInput.value = '';
      typeSelect.value = 'expense';
      categorySelect.value = 'Other';
      
      formTitle.textContent = 'ADD TRANSACTION';
      submitBtn.querySelector('span').textContent = 'Add';
      cancelBtn.style.display = 'none';
    });

    // Initialize
    loadData();