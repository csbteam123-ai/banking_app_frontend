// RequestPage.jsx
import React, { useState } from "react";
import {
  Send,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  Zap,
  CreditCard,
  DollarSign,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Request_money } from "../../API/Request.money";

const FastPaymentSection = () => {
  // ekhane useState initialize korchi
  const [selectedFastPayment, setSelectedFastPayment] = useState("epay");
  const user = useSelector((state) => state.Calluser.user);

  const token = localStorage.getItem("token");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const sendRequst = async () => {
    if (selectedFastPayment === "epay") {
      const res = await Request_money(user.name,email,amount,token)
      if(res?.data){
        window.location.replace(res?.data.url)
      }
    
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white mb-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5" />
        Fast Payment
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {/* e-pay Option */}
        <button
          onClick={() => setSelectedFastPayment("epay")}
          className={`bg-white p-4 rounded-xl transition-all transform hover:scale-105 ${
            selectedFastPayment === "epay" ? "ring-4 ring-yellow-400" : ""
          }`}
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-3 shadow-lg">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <span className="text-gray-800 font-bold text-lg">e-pay</span>
            <span className="text-xs text-gray-500 mt-1">Instant Payment</span>
          </div>
        </button>

        {/* USDT Pay Option */}
        <button
          onClick={() => setSelectedFastPayment("usdt")}
          className={`bg-white p-4 rounded-xl transition-all transform hover:scale-105 ${
            selectedFastPayment === "usdt" ? "ring-4 ring-yellow-400" : ""
          }`}
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <span className="text-gray-800 font-bold text-lg">USDT Pay</span>
            <span className="text-xs text-gray-500 mt-1">Crypto Payment</span>
          </div>
        </button>
      </div>

      {/* Fast Payment Form */}
      <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-xl p-4">
        <div className="flex items-center gap-3 mb-4">
          {selectedFastPayment === "epay" ? (
            <>
              <CreditCard className="w-6 h-6 text-yellow-300" />
              <span className="font-medium">e-pay Quick Transfer</span>
            </>
          ) : (
            <>
              <DollarSign className="w-6 h-6 text-yellow-300" />
              <span className="font-medium">USDT Instant Transfer</span>
            </>
          )}
        </div>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Enter email or phone number"
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <span className="absolute left-4 top-3 text-white/80">
              {selectedFastPayment === "epay" ? "৳" : "$"}
            </span>
            <input
              type="number"
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2" 
          onClick={sendRequst}
          >
            <Zap className="w-5 h-5" />
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

const RequestPage = () => {
  const user = useSelector((state) => state.Calluser.user);
  const token = localStorage.getItem("token");
  const [requestType, setRequestType] = useState("send");
  const [selectedFastPayment, setSelectedFastPayment] = useState("epay");

  // const PaymentRequestForm = () => (
  //   <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  //     <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
  //       <Send className="w-5 h-5 text-blue-600" />
  //       {requestType === 'send' ? 'Request Payment' : 'Send Payment'}
  //     </h3>

  //     <div className="flex gap-4 mb-6">
  //       <button
  //         onClick={() => setRequestType('send')}
  //         className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
  //           requestType === 'send'
  //             ? 'border-blue-500 bg-blue-50 text-blue-700'
  //             : 'border-gray-200 hover:border-gray-300 text-gray-600'
  //         }`}
  //       >
  //         <ArrowUpRight className="w-5 h-5 inline mr-2" />
  //         Request Money
  //       </button>
  //       <button
  //         onClick={() => setRequestType('receive')}
  //         className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
  //           requestType === 'receive'
  //             ? 'border-blue-500 bg-blue-50 text-blue-700'
  //             : 'border-gray-200 hover:border-gray-300 text-gray-600'
  //         }`}
  //       >
  //         <ArrowDownLeft className="w-5 h-5 inline mr-2" />
  //         Send Money
  //       </button>
  //     </div>

  //     <form className="space-y-4">
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">
  //           {requestType === 'send' ? "Recipient's Email/Phone" : "Payer's Email/Phone"}
  //         </label>
  //         <input
  //           type="text"
  //           placeholder="Enter email or phone number"
  //           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
  //         />
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">
  //           Amount (BDT)
  //         </label>
  //         <div className="relative">
  //           <span className="absolute left-4 top-3 text-gray-500">৳</span>
  //           <input
  //             type="number"
  //             placeholder="0.00"
  //             className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
  //           />
  //         </div>
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">
  //           Description
  //         </label>
  //         <textarea
  //           rows="3"
  //           placeholder="Enter payment description"
  //           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
  //         ></textarea>
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">
  //           Due Date
  //         </label>
  //         <input
  //           type="date"
  //           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
  //         />
  //       </div>

  //       <button
  //         type="submit"
  //         className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
  //       >
  //         <Send className="w-5 h-5" />
  //         {requestType === 'send' ? 'Send Request' : 'Send Payment'}
  //       </button>
  //     </form>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Payment Requests
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Create new payment requests and make fast payments
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Fast Payment Section with e-pay and USDT */}
            <FastPaymentSection selectedFastPayment={selectedFastPayment} />

            {/* Regular Payment Request Form */}
            {/* <PaymentRequestForm /> */}
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Your Balances
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <span> Balance</span>
                  </div>
                  <span className="text-xl font-bold">৳{user.ammount}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Fast Transfer</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Today's Rates
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">1 USDT to BDT</span>
                  <span className="font-medium">৳110.50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">1 BDT to USDT</span>
                  <span className="font-medium">$0.0091</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestPage;
