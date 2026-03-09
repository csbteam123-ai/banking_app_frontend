import React, { useState } from 'react';
import { ArrowLeft, Send, CheckCircle, AlertCircle } from 'lucide-react';

const SendMoney = ({setActivechat}) => {
  const [step, setStep] = useState(1);
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const balance = 28450.75;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const handleNext = () => {
    if (step === 1) {
      if (!accountNumber) {
        setError('Please enter account number');
        return;
      }
      if (accountNumber.length < 8) {
        setError('Invalid account number');
        return;
      }
      setError('');
      setStep(2);
    } else if (step === 2) {
      if (!amount) {
        setError('Please enter amount');
        return;
      }
      if (parseFloat(amount) <= 0) {
        setError('Amount must be greater than 0');
        return;
      }
      if (parseFloat(amount) > balance) {
        setError('Insufficient balance');
        return;
      }
      setError('');
      setStep(3);
    }
  };

  const handleSend = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(4);
    }, 1500);
  };

  const handleReset = () => {
    setStep(1);
    setAccountNumber('');
    setAmount('');
    setError('');
  };

  // Step 1: Enter Account Number
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-gray-100 rounded-full" onClick={()=>{
            setActivechat("HOME")
        }}>
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-xl font-semibold">Send Money</h2>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Available Balance</p>
        <p className="text-2xl font-bold text-gray-900">{formatCurrency(balance)}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Account Number
        </label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="Enter account number"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <button
        onClick={handleNext}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Next
      </button>
    </div>
  );

  // Step 2: Enter Amount
  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => setStep(1)} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-xl font-semibold">Enter Amount</h2>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Sending to</p>
        <p className="font-medium">Account: {accountNumber}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full px-4 py-3 text-2xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          step="0.01"
        />
      </div>

      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="flex justify-between text-sm">
          <span>Your balance:</span>
          <span className="font-medium">{formatCurrency(balance)}</span>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <button
        onClick={handleNext}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Next
      </button>
    </div>
  );

  // Step 3: Confirm
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => setStep(2)} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-xl font-semibold">Confirm Transfer</h2>
      </div>

      <div className="bg-gray-50 rounded-lg p-5 space-y-3">
        <div className="flex justify-between pb-2 border-b">
          <span className="text-gray-600">Account:</span>
          <span className="font-medium">{accountNumber}</span>
        </div>
        <div className="flex justify-between pb-2 border-b">
          <span className="text-gray-600">Amount:</span>
          <span className="font-bold text-xl text-blue-600">{formatCurrency(parseFloat(amount))}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Fee:</span>
          <span className="text-green-600">Free</span>
        </div>
      </div>

      <div className="bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800">
        Please verify the account number before sending.
      </div>

      <button
        onClick={handleSend}
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <>Processing...</>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Money
          </>
        )}
      </button>
    </div>
  );

  // Step 4: Success
  const renderStep4 = () => (
    <div className="text-center space-y-6 py-8">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Success!</h2>
        <p className="text-gray-600">
          {formatCurrency(parseFloat(amount))} sent successfully
        </p>
        <p className="text-sm text-gray-500 mt-1">To: {accountNumber}</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg text-left">
        <p className="text-sm text-gray-600">Transaction ID</p>
        <p className="font-mono text-sm">TXN{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Send Another Payment
        </button>
        <button className="w-full text-gray-600 py-2 hover:text-gray-800 transition-colors text-sm">
          Back to Dashboard
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>
    </div>
  );
};

export default SendMoney;