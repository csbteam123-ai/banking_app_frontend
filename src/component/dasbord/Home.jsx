import React from "react";
import {
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  TrendingUp,
  Wallet,
  PiggyBank,
  RefreshCw,
  MoreHorizontal,
  Send,
  Download,
  Plus,
} from "lucide-react";
import { useSelector } from "react-redux";

const Home = ({ setActivechat }) => {
  const user = useSelector((state) => state.Calluser.user);

  // Sample data - in real app, this would come from API/props
  const accountData = {
    name: "John Doe",
    accountNumber: "**** 4582",
    balance: 28450.75,
    currency: "USD",
  };

  const recentTransactions = [
    {
      id: 1,
      name: "Netflix Subscription",
      amount: -14.99,
      date: "2024-01-14",
      category: "Entertainment",
      type: "debit",
    },
    {
      id: 2,
      name: "Salary Deposit",
      amount: 4500.0,
      date: "2024-01-15",
      category: "Income",
      type: "credit",
    },
    {
      id: 3,
      name: "Whole Foods Market",
      amount: -87.32,
      date: "2024-01-13",
      category: "Groceries",
      type: "debit",
    },
    {
      id: 4,
      name: "Uber Ride",
      amount: -24.5,
      date: "2024-01-12",
      category: "Transport",
      type: "debit",
    },
    {
      id: 5,
      name: "Interest Earned",
      amount: 12.34,
      date: "2024-01-11",
      category: "Interest",
      type: "credit",
    },
  ];

  const cards = [
    {
      id: 1,
      type: "Visa",
      last4: "4582",
      expiry: "05/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "8912",
      expiry: "09/24",
      isDefault: false,
    },
  ];

  const spendingCategories = [
    {
      category: "Food & Dining",
      amount: 450,
      percentage: 30,
      color: "bg-blue-500",
    },
    {
      category: "Shopping",
      amount: 320,
      percentage: 22,
      color: "bg-green-500",
    },
    {
      category: "Transport",
      amount: 180,
      percentage: 12,
      color: "bg-yellow-500",
    },
    {
      category: "Entertainment",
      amount: 150,
      percentage: 10,
      color: "bg-purple-500",
    },
    {
      category: "Bills & Utilities",
      amount: 380,
      percentage: 26,
      color: "bg-red-500",
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: accountData.currency,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const totalSpending = spendingCategories.reduce(
    (sum, cat) => sum + cat.amount,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name || "Guest"}!
            </h1>
            <p className="text-gray-600 mt-1">
              Here's your financial overview for today
            </p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Main Content */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Account Balance Card */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-blue-100 text-sm">Total Balance</p>
                <h2 className="text-4xl font-bold mt-1">
                  {`${user?.ammount || "0"}.00`}
                </h2>
                <p className="text-blue-100 text-sm mt-2">
                  Account •• {user?.accout_number || "**** **** **** 0000"}
                </p>
              </div>
              <CreditCard className="w-8 h-8 text-blue-200" />
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4 mt-6">
              <button
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-xl"
                onClick={() => {
                  setActivechat("SEND MONEY");
                }}
              >
                <Send className="w-4 h-4" />
                <span className="text-sm">Send</span>
              </button>
              <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-xl">
                <Download className="w-4 h-4" />
                <span className="text-sm">Request</span>
              </button>
              <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-xl">
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add</span>
              </button>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Transactions
              </h3>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                View All
              </button>
            </div>

            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === "credit"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {transaction.type === "credit" ? (
                        <ArrowDownRight className="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.category} • {formatDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-semibold ${
                      transaction.type === "credit"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}
                    {formatCurrency(Math.abs(transaction.amount))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* My Cards */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">My Cards</h3>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                Manage
              </button>
            </div>

            <div className="space-y-3">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-gray-700" />
                      <span className="font-medium text-gray-900">
                        {card.type}
                      </span>
                    </div>
                    {card.isDefault && (
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">•••• {card.last4}</span>
                    <span className="text-gray-600">Expires {card.expiry}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 border-2 border-dashed border-gray-200 rounded-xl p-3 text-gray-500 hover:border-blue-300 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add New Card</span>
            </button>
          </div>

          {/* Spending Overview */}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">Monthly Income</p>
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(4500)}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                <PiggyBank className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">Savings</p>
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(12500)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
