import React, { useState } from 'react'
import { CreditCard, ArrowLeft, ArrowRight, CheckCircle, XCircle } from 'lucide-react'

const PaymentContent = () => {
  const [cardNumber, setCardNumber] = useState('')
  const [cardNumberError, setCardNumberError] = useState('')
  const [isCardNumberValid, setIsCardNumberValid] = useState(false)

  const validateCardNumber = (value) => {
    // Remove all spaces and non-digits
    const cleanValue = value.replace(/\D/g, '')
    
    // Check if it's empty
    if (cleanValue === '') {
      setCardNumberError('')
      setIsCardNumberValid(false)
      return
    }
    
    // Check length (most cards are 13-19 digits)
    if (cleanValue.length < 13 || cleanValue.length > 19) {
      setCardNumberError('Card number must be between 13-19 digits')
      setIsCardNumberValid(false)
      return
    }
    
    // Luhn algorithm validation
    if (!luhnCheck(cleanValue)) {
      setCardNumberError('Invalid card number')
      setIsCardNumberValid(false)
      return
    }
    
    // If we get here, it's valid
    setCardNumberError('')
    setIsCardNumberValid(true)
  }

  const luhnCheck = (cardNumber) => {
    let sum = 0
    let isEven = false
    
    // Process digits from right to left
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i))
      
      if (isEven) {
        digit *= 2
        if (digit > 9) {
          digit -= 9
        }
      }
      
      sum += digit
      isEven = !isEven
    }
    
    return sum % 10 === 0
  }

  const formatCardNumber = (value) => {
    // Remove all non-digits
    const cleanValue = value.replace(/\D/g, '')
    
    // Add spaces every 4 digits
    const formatted = cleanValue.replace(/(\d{4})(?=\d)/g, '$1 ')
    
    return formatted
  }

  const handleCardNumberChange = (e) => {
    const value = e.target.value
    const formatted = formatCardNumber(value)
    setCardNumber(formatted)
    validateCardNumber(value)
  }

  return (
  <div className="p-6 border-2 border-gray-200 bg-white w-[100%] rounded-2xl shadow-lg">
   
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Payment Form */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-orange-500 p-2 !rounded-lg">
            <CreditCard className="text-white" size={20} />
          </div>
           <h3 className="text-xl font-[var(--font-filson-bold)] text-[var(--main-dark-color)]">Payment Information</h3>
        </div>
        
        <div className="space-y-4">
           <div>
             <label className="block text-gray-700 font-medium mb-2">Card Number</label>
             <div className="relative">
               <input
                 type="text"
                 value={cardNumber}
                 onChange={handleCardNumberChange}
                 placeholder="1234 5678 9012 3456"
                 maxLength="19"
                 className={`w-full bg-white border !rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                   cardNumberError 
                     ? 'border-red-500 focus:ring-red-500' 
                     : isCardNumberValid 
                       ? 'border-green-500 focus:ring-green-500' 
                       : 'border-gray-300 focus:ring-[var(--main-light-color)]'
                 }`}
               />
               <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                 {isCardNumberValid && (
                   <CheckCircle className="text-green-500" size={20} />
                 )}
                 {cardNumberError && (
                   <XCircle className="text-red-500" size={20} />
                 )}
               </div>
             </div>
             {cardNumberError && (
               <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                 <XCircle size={16} />
                 {cardNumberError}
               </p>
             )}
             {isCardNumberValid && (
               <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                 <CheckCircle size={16} />
                 Valid card number
               </p>
             )}
           </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full bg-white border border-gray-300 !rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full bg-white border border-gray-300 !rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--main-light-color)] focus:border-transparent transition-all"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Cardholder Name</label>
            <input
              type="text"
              placeholder="Enter name as on card"
              className="w-full bg-white border border-gray-300 !rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
         <h3 className="text-xl font-[var(--font-filson-bold)] text-[var(--main-dark-color)] mb-6">Payment Summary</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-gray-700">Visa Fee</span>
            <span className="font-semibold text-gray-800">$150.00</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-gray-700">Service Fee</span>
            <span className="font-semibold text-gray-800">$25.00</span>
          </div>
           <div className="flex justify-between items-center py-4 bg-[var(--main-light-color)] bg-opacity-10 !rounded-lg px-4">
             <span className="text-lg font-bold !text-white">Total</span>
             <span className="text-2xl font-bold !text-white">$175.00</span>
           </div>
        </div>
      </div>
    </div>

    {/* Security Information */}
    <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-green-500 p-2 !rounded-lg">
          <CreditCard className="text-white" size={20} />
        </div>
        <h4 className="text-lg font-[var(--font-filson-bold)] text-green-900">Secure Payment</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>SSL Encrypted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>PCI Compliant</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Fraud Protection</span>
        </div>
      </div>
    </div>

    {/* Navigation Buttons */}
    <div className="flex justify-between items-center mt-8">
      <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Application</span>
      </button>
      
      <button className="bg-[var(--main-light-color)] hover:bg-[var(--main-dark-color)] text-white px-8 py-3 !rounded-lg font-[var(--font-filson-bold)] flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg">
        <span>Process Payment</span>
        <ArrowRight size={20} />
      </button>
    </div>
  </div>
  )
  }


export default PaymentContent
