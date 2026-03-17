import React, { useEffect, useState } from 'react';
import { 
  Search,
  Send,
  Clock,
  CheckCircle,
  Download,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Eye,
  EyeOff,
  ArrowDownRight,
  Filter,
  X
} from 'lucide-react';
import { getTransaction } from '../../API/send.money';
import { useSelector } from 'react-redux';

const TransactionHistory = () => {
  const user = useSelector((state) => state.Calluser.user);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [hideAmounts, setHideAmounts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [transactions, settransactions] = useState([])
  const token = localStorage.getItem("token")
  const itemsPerPage = 5;
  useEffect(() => {
    const fn = async () => {
      const res = await getTransaction(token)
      console.log(res)
      settransactions(res.data.transactions.Transactions)
    }
      fn()

  },[])

  // Your exact data structure
  // const transactions = [
  //   {
  //     _id: "69b9c2aa122e03b4c3c5b163",
  //     userId: "69b9c258122e03b4c3c5b151",
  //     senderId: "69b9c268122e03b4c3c5b159",
  //     amount: 50,
  //     date: "2026-03-17T21:07:54.943Z",
  //     category: "send money",
  //     TransactionID: "TXN-20260318-030754-508699",
  //     senderName: "John Smith",
  //     status: "completed",
  //     __v: 0
  //   },
  //   {
  //     _id: "69b9c2aa122e03b4c3c5b164",
  //     userId: "69b9c258122e03b4c3c5b151",
  //     senderId: "69b9c268122e03b4c3c5b160",
  //     amount: 1200,
  //     date: "2026-03-16T14:30:00.943Z",
  //     category: "receive money",
  //     TransactionID: "TXN-20260316-193000-123456",
  //     senderName: "ABC Corp",
  //     status: "completed",
  //     __v: 0
  //   },
  //   {
  //     _id: "69b9c2aa122e03b4c3c5b166",
  //     userId: "69b9c258122e03b4c3c5b151",
  //     senderId: "69b9c268122e03b4c3c5b162",
  //     amount: 200,
  //     date: "2026-03-14T18:45:00.943Z",
  //     category: "send money",
  //     TransactionID: "TXN-20260314-234500-345678",
  //     senderName: "Mike Johnson",
  //     status: "pending",
  //     __v: 0
  //   },
  //   {
  //     _id: "69b9c2aa122e03b4c3c5b170",
  //     userId: "69b9c258122e03b4c3c5b151",
  //     senderId: "69b9c268122e03b4c3c5b166",
  //     amount: 500,
  //     date: "2026-03-10T15:20:00.943Z",
  //     category: "send money",
  //     TransactionID: "TXN-20260310-202000-789012",
  //     senderName: "Sarah Wilson",
  //     status: "failed",
  //     __v: 0
  //   },
  //   {
  //     _id: "69b9c2aa122e03b4c3c5b172",
  //     userId: "69b9c258122e03b4c3c5b151",
  //     senderId: "69b9c268122e03b4c3c5b168",
  //     amount: 1000,
  //     date: "2026-03-08T09:00:00.943Z",
  //     category: "receive money",
  //     TransactionID: "TXN-20260308-140000-901234",
  //     senderName: "Company Bonus",
  //     status: "completed",
  //     __v: 0
  //   }
  // ];

  // Filter transactions
  const filteredTransactions = transactions.filter(t => {
    if (activeFilter === 'send' && t.category !== 'send money') return false;
    if (activeFilter === 'receive' && t.category !== 'receive money') return false;
    if (searchTerm && !t.senderName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Format functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric'
      });
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getCategoryColor = (category) => {
    return transaction.userId === user._id ? 'bg-red-100' : 'bg-green-100';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <CheckCircle className="w-3 h-3" />;
      case 'pending':
        return <Clock className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setHideAmounts(!hideAmounts)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {hideAmounts ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Filter Tabs - Mobile Friendly */}
      <div className="bg-white px-4 py-3 border-b border-gray-200 sticky top-0 z-10">
        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
              activeFilter === 'all' 
                ? 'bg-gray-800 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('send')}
            className={`px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeFilter === 'send' 
                ? 'bg-red-600 text-white shadow-md' 
                : 'bg-red-50 text-red-600'
            }`}
          >
            <Send className="w-4 h-4" />
            Send
          </button>
          <button
            onClick={() => setActiveFilter('receive')}
            className={`px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeFilter === 'receive' 
                ? 'bg-green-600 text-white shadow-md' 
                : 'bg-green-50 text-green-600'
            }`}
          >
            <ArrowDownRight className="w-4 h-4" />
            Receive
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="px-4 py-4">
        <div className="space-y-3">
          {paginatedTransactions.length > 0 ? (
            paginatedTransactions.map((transaction) => (
              <div
                key={transaction._id}
                onClick={() => setSelectedTransaction(transaction)}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 active:scale-[0.99] transition-transform cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {/* Icon */}
                    <div className={`w-12 h-12 ${transaction.userId === user._id ? 'bg-red-100' : 'bg-green-100'} rounded-xl flex items-center justify-center`}>
                      {transaction.userId === user._id ? (
                        <Send className="w-6 h-6 text-red-500" />
                      ) : (
                        <ArrowDownRight className="w-6 h-6 text-green-500" />
                      )}
                    </div>
                    
                    {/* Details */}
                    <div>
                      <h3 className="font-semibold text-gray-800">{transaction.category}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          transaction.userId === user._id 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {transaction.userId === user._id ? 'SENT' : 'RECEIVED'}
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatTime(transaction.date)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="text-right">
                    <p className={`font-bold text-lg ${
                      transaction.userId === user._id
                        ? 'text-red-600' 
                        : 'text-green-600'
                    }`}>
                      {hideAmounts ? '••••' : (
                        <>
                          {transaction.userId === user._id ? '-' : '+'}
                          {formatCurrency(transaction.amount)}
                        </>
                      )}
                    </p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      {getStatusIcon(transaction.status)}
                      <span className={`text-xs ${getStatusColor(transaction.status).split(' ')[0]}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-400">
                    {formatDate(transaction.date)}
                  </p>
                  <p className="text-xs font-mono text-gray-300">
                    ID: {transaction.TransactionID.slice(-8)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium">No transactions found</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your search</p>
            </div>
          )}
        </div>

        {/* Pagination - Mobile Friendly */}
        {filteredTransactions.length > 0 && (
          <div className="flex items-center justify-between mt-6 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Transaction Details Modal - Mobile Optimized */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
          <div 
            className="bg-white rounded-t-2xl w-full p-5 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Transaction Details</h2>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Header with icon */}
              <div className={`p-4 rounded-xl ${
                selectedTransaction.category === 'send money' ? 'bg-red-50' : 'bg-green-50'
              } flex items-center gap-3`}>
                <div className={`w-14 h-14 rounded-full ${
                  selectedTransaction.category === 'send money' ? 'bg-red-100' : 'bg-green-100'
                } flex items-center justify-center`}>
                  {selectedTransaction.category === 'send money' ? (
                    <Send className="w-7 h-7 text-red-500" />
                  ) : (
                    <ArrowDownRight className="w-7 h-7 text-green-500" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-lg">{selectedTransaction.senderName}</p>
                  <p className="text-sm text-gray-600">
                    {selectedTransaction.category === 'send money' ? 'Money Sent' : 'Money Received'}
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Amount</p>
                  <p className={`text-xl font-bold ${
                    selectedTransaction.category === 'send money' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {selectedTransaction.category === 'send money' ? '-' : '+'}
                    {formatCurrency(selectedTransaction.amount)}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">sender</p>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(selectedTransaction.senderId)}
                    <span className={`text-sm font-medium ${getStatusColor(selectedTransaction.senderId).split(' ')[0]}`}>
                      {selectedTransaction.senderId}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Date</p>
                  <p className="text-sm font-medium">{formatDate(selectedTransaction.date)}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Time</p>
                  <p className="text-sm font-medium">{formatTime(selectedTransaction.date)}</p>
                </div>
              </div>

              {/* Transaction ID */}
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">Transaction ID</p>
                <p className="text-sm font-mono break-all">{selectedTransaction.TransactionID}</p>
              </div>

              {/* Action Button */}
              <button className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-medium">
                Download Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hide scrollbar style */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TransactionHistory;