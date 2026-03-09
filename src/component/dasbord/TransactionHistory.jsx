import React, { useState } from 'react';
import {
  History,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  FileText,
  TrendingUp,
  TrendingDown,
  Wallet,
  CreditCard,
  ShoppingBag,
  Home as HomeIcon,
  Car,
  Utensils,
  Gift,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';

const TransactionHistory = () => {
  const [filterType, setFilterType] = useState('all'); // all, income, expense
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('this_month');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [hideAmounts, setHideAmounts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const itemsPerPage = 10;

  // Sample transaction data
  const allTransactions = [
    {
      id: 1,
      type: 'debit',
      category: 'Shopping',
      description: 'Amazon Prime Purchase',
      amount: 89.99,
      date: '2024-01-15',
      time: '14:30',
      status: 'completed',
      merchant: 'Amazon.com',
      paymentMethod: 'Visa •• 4582',
      icon: ShoppingBag,
      color: 'purple',
    },
    {
      id: 2,
      type: 'credit',
      category: 'Salary',
      description: 'Monthly Salary Deposit',
      amount: 4500.00,
      date: '2024-01-14',
      time: '09:15',
      status: 'completed',
      merchant: 'ABC Corporation',
      paymentMethod: 'Direct Deposit',
      icon: Wallet,
      color: 'green',
    },
    {
      id: 3,
      type: 'debit',
      category: 'Groceries',
      description: 'Whole Foods Market',
      amount: 87.32,
      date: '2024-01-13',
      time: '18:45',
      status: 'completed',
      merchant: 'Whole Foods',
      paymentMethod: 'Debit Card •• 8912',
      icon: ShoppingBag,
      color: 'blue',
    },
    {
      id: 4,
      type: 'debit',
      category: 'Transport',
      description: 'Uber Ride - Airport',
      amount: 24.50,
      date: '2024-01-12',
      time: '22:20',
      status: 'completed',
      merchant: 'Uber',
      paymentMethod: 'Mastercard •• 8912',
      icon: Car,
      color: 'yellow',
    },
    {
      id: 5,
      type: 'credit',
      category: 'Interest',
      description: 'Interest Earned',
      amount: 12.34,
      date: '2024-01-11',
      time: '00:05',
      status: 'completed',
      merchant: 'Bank Interest',
      paymentMethod: 'Savings Account',
      icon: TrendingUp,
      color: 'green',
    },
    {
      id: 6,
      type: 'debit',
      category: 'Entertainment',
      description: 'Netflix Subscription',
      amount: 14.99,
      date: '2024-01-10',
      time: '10:30',
      status: 'completed',
      merchant: 'Netflix',
      paymentMethod: 'Visa •• 4582',
      icon: HomeIcon,
      color: 'red',
    },
    {
      id: 7,
      type: 'debit',
      category: 'Dining',
      description: 'The Cheesecake Factory',
      amount: 65.80,
      date: '2024-01-09',
      time: '19:15',
      status: 'completed',
      merchant: 'The Cheesecake Factory',
      paymentMethod: 'Mastercard •• 8912',
      icon: Utensils,
      color: 'orange',
    },
    {
      id: 8,
      type: 'credit',
      category: 'Transfer',
      description: 'Received from Sarah Johnson',
      amount: 150.00,
      date: '2024-01-08',
      time: '15:45',
      status: 'completed',
      merchant: 'Sarah Johnson',
      paymentMethod: 'Bank Transfer',
      icon: ArrowDownRight,
      color: 'green',
    },
    {
      id: 9,
      type: 'debit',
      category: 'Bills',
      description: 'Electricity Bill Payment',
      amount: 95.40,
      date: '2024-01-07',
      time: '11:20',
      status: 'pending',
      merchant: 'City Power & Light',
      paymentMethod: 'Automatic Payment',
      icon: HomeIcon,
      color: 'yellow',
    },
    {
      id: 10,
      type: 'debit',
      category: 'Shopping',
      description: 'Nike Store Online',
      amount: 129.99,
      date: '2024-01-06',
      time: '13:10',
      status: 'completed',
      merchant: 'Nike',
      paymentMethod: 'Visa •• 4582',
      icon: ShoppingBag,
      color: 'purple',
    },
    {
      id: 11,
      type: 'debit',
      category: 'Health',
      description: 'Pharmacy - CVS',
      amount: 45.67,
      date: '2024-01-05',
      time: '16:30',
      status: 'completed',
      merchant: 'CVS Pharmacy',
      paymentMethod: 'Debit Card •• 4582',
      icon: ShoppingBag,
      color: 'red',
    },
    {
      id: 12,
      type: 'credit',
      category: 'Refund',
      description: 'Amazon Return Refund',
      amount: 29.99,
      date: '2024-01-04',
      time: '14:50',
      status: 'completed',
      merchant: 'Amazon.com',
      paymentMethod: 'Visa •• 4582',
      icon: Gift,
      color: 'green',
    },
  ];

  // Get unique categories for filter
  const categories = ['all', ...new Set(allTransactions.map(t => t.category.toLowerCase()))];

  // Filter transactions
  const filteredTransactions = allTransactions.filter(transaction => {
    // Type filter
    if (filterType === 'income' && transaction.type !== 'credit') return false;
    if (filterType === 'expense' && transaction.type !== 'debit') return false;
    
    // Category filter
    if (filterCategory !== 'all' && transaction.category.toLowerCase() !== filterCategory) return false;
    
    // Search filter
    if (searchQuery && !transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !transaction.merchant.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Period filter (simplified - in real app would use actual date comparison)
    if (filterPeriod === 'today') {
      // Mock - just for demonstration
      return transaction.date === '2024-01-15';
    }
    
    return true;
  });

  // Calculate statistics
  const totalIncome = filteredTransactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = filteredTransactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const netBalance = totalIncome - totalExpense;

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <History className="w-8 h-8 text-white" />
              <h1 className="text-2xl md:text-3xl font-bold text-white">Transaction History</h1>
            </div>
            <button
              onClick={() => setHideAmounts(!hideAmounts)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              {hideAmounts ? <EyeOff className="w-5 h-5 text-white" /> : <Eye className="w-5 h-5 text-white" />}
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-lg">
              <p className="text-blue-100 text-sm mb-1">Total Income</p>
              <p className="text-2xl font-bold text-white">
                {hideAmounts ? '••••' : formatCurrency(totalIncome)}
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-lg">
              <p className="text-blue-100 text-sm mb-1">Total Expense</p>
              <p className="text-2xl font-bold text-white">
                {hideAmounts ? '••••' : formatCurrency(totalExpense)}
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-lg">
              <p className="text-blue-100 text-sm mb-1">Net Balance</p>
              <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                {hideAmounts ? '••••' : formatCurrency(Math.abs(netBalance))}
                {netBalance < 0 && ' (Deficit)'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transactions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                {filterType !== 'all' || filterCategory !== 'all' || filterPeriod !== 'this_month' ? '1' : '0'}
              </span>
            </button>

            {/* Download Button */}
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Transactions</option>
                  <option value="income">Income Only</option>
                  <option value="expense">Expenses Only</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="capitalize">
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Period Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                <select
                  value={filterPeriod}
                  onChange={(e) => setFilterPeriod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="today">Today</option>
                  <option value="this_week">This Week</option>
                  <option value="this_month">This Month</option>
                  <option value="last_month">Last Month</option>
                  <option value="this_year">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Table Header - Desktop */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
            <div className="col-span-5">Transaction</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-1">Status</div>
          </div>

          {/* Transactions */}
          <div className="divide-y divide-gray-200">
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((transaction) => {
                const Icon = transaction.icon;
                const isCredit = transaction.type === 'credit';
                
                return (
                  <div
                    key={transaction.id}
                    onClick={() => setSelectedTransaction(transaction)}
                    className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    {/* Mobile View */}
                    <div className="md:hidden">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full bg-${transaction.color}-100 flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 text-${transaction.color}-600`} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{transaction.description}</p>
                            <p className="text-sm text-gray-500">{transaction.merchant}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${isCredit ? 'text-green-600' : 'text-red-600'}`}>
                            {hideAmounts ? '••••' : (isCredit ? '+' : '-') + formatCurrency(transaction.amount)}
                          </p>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            {getStatusIcon(transaction.status)}
                            <span className="text-xs text-gray-500 capitalize">{transaction.status}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500 ml-13">
                        <div className="flex items-center gap-2">
                          <span className="capitalize">{transaction.category}</span>
                          <span>•</span>
                          <span>{transaction.paymentMethod}</span>
                        </div>
                        <span>{formatDate(transaction.date)} • {transaction.time}</span>
                      </div>
                    </div>

                    {/* Desktop View */}
                    <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-5 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-${transaction.color}-100 flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 text-${transaction.color}-600`} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{transaction.merchant}</p>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs capitalize">
                          {transaction.category}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-900">{formatDate(transaction.date)}</p>
                        <p className="text-xs text-gray-500">{transaction.time}</p>
                      </div>
                      <div className="col-span-2">
                        <p className={`font-bold ${isCredit ? 'text-green-600' : 'text-red-600'}`}>
                          {hideAmounts ? '••••' : (isCredit ? '+' : '-') + formatCurrency(transaction.amount)}
                        </p>
                        <p className="text-xs text-gray-500">{transaction.paymentMethod}</p>
                      </div>
                      <div className="col-span-1">
                        <div className="flex items-center gap-1">
                          {getStatusIcon(transaction.status)}
                          <span className="text-xs capitalize">{transaction.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-lg font-medium">No transactions found</p>
                <p className="text-sm">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredTransactions.length > 0 && (
            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                  {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Transaction Details Modal */}
        {selectedTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">Transaction Details</h3>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <XCircle className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className={`w-16 h-16 rounded-full bg-${selectedTransaction.color}-100 flex items-center justify-center`}>
                    <selectedTransaction.icon className={`w-8 h-8 text-${selectedTransaction.color}-600`} />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{selectedTransaction.description}</p>
                    <p className="text-gray-600">{selectedTransaction.merchant}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className={`text-xl font-bold ${selectedTransaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedTransaction.type === 'credit' ? '+' : '-'}{formatCurrency(selectedTransaction.amount)}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Status</p>
                    <div className="flex items-center gap-1 mt-1">
                      {getStatusIcon(selectedTransaction.status)}
                      <span className="capitalize font-medium">{selectedTransaction.status}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium">{formatDate(selectedTransaction.date)} at {selectedTransaction.time}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium capitalize">{selectedTransaction.category}</p>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                  <p className="font-medium">{selectedTransaction.paymentMethod}</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
                  <p className="font-mono text-sm">TXN-{selectedTransaction.id}-{Date.now().toString(36)}</p>
                </div>

                <div className="flex gap-3 mt-4">
                  <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Receipt
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                    Report Issue
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;