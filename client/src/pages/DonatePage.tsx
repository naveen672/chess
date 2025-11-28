import { useState } from 'react';
import { Heart, Users, BookOpen, Globe, Check } from 'lucide-react';
import { useLocation } from 'wouter';
import { Footer } from '@/components/Footer';

export default function DonatePage() {
  const [, setLocation] = useLocation();
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [isMonthly, setIsMonthly] = useState(false);

  const presetAmounts = [10, 25, 50, 100];

  const impacts = [
    {
      amount: 10,
      icon: <BookOpen className="w-6 h-6" />,
      title: "Sponsor a Lesson",
      description: "Provides one complete chess lesson to a student in need"
    },
    {
      amount: 25,
      icon: <Users className="w-6 h-6" />,
      title: "Support a Learner",
      description: "Covers a month of premium features for an underprivileged student"
    },
    {
      amount: 50,
      icon: <Globe className="w-6 h-6" />,
      title: "Expand Globally",
      description: "Helps translate content for students in developing countries"
    },
    {
      amount: 100,
      icon: <Heart className="w-6 h-6" />,
      title: "Create New Content",
      description: "Funds development of new interactive lessons and puzzles"
    }
  ];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(0);
  };

  const getCurrentAmount = () => {
    return customAmount ? parseInt(customAmount) || 0 : selectedAmount;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Support Chess Education</h1>
          <p className="text-xl text-blue-100 mb-8">
            Help us make quality chess education accessible to learners around the world, 
            regardless of their economic circumstances.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Donation Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Make a Donation</h2>
            
            {/* Monthly/One-time Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                onClick={() => setIsMonthly(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  !isMonthly ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                One-time
              </button>
              <button
                onClick={() => setIsMonthly(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  isMonthly ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Monthly
              </button>
            </div>

            {/* Amount Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Choose an amount
              </label>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`p-4 border-2 rounded-lg font-semibold transition-colors ${
                      selectedAmount === amount
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Donation Summary */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center text-blue-900">
                <span className="font-medium">
                  {isMonthly ? 'Monthly' : 'One-time'} donation:
                </span>
                <span className="text-2xl font-bold">
                  ${getCurrentAmount()}
                </span>
              </div>
              {isMonthly && getCurrentAmount() > 0 && (
                <p className="text-blue-700 text-sm mt-2">
                  Total annual impact: ${getCurrentAmount() * 12}
                </p>
              )}
            </div>

            {/* Donate Button */}
            <button
              disabled={getCurrentAmount() === 0}
              className="w-full py-4 bg-yellow-400 text-blue-900 rounded-lg font-semibold text-lg hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Donate ${getCurrentAmount()} {isMonthly ? 'Monthly' : 'Now'}
            </button>

            <p className="text-gray-500 text-sm mt-4 text-center">
              Secure payment processed by Stripe. Tax-deductible in many countries.
            </p>
          </div>

          {/* Impact Information */}
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Your Impact</h2>
            
            <div className="space-y-6 mb-8">
              {impacts.map((impact, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    getCurrentAmount() >= impact.amount
                      ? 'border-green-400 bg-green-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      getCurrentAmount() >= impact.amount
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {impact.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">${impact.amount} - {impact.title}</h3>
                        {getCurrentAmount() >= impact.amount && (
                          <Check className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <p className="text-gray-600">{impact.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Why We Need Support */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Why Your Support Matters</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Provide free access to premium features for students who can't afford them</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Support teachers in underserved communities with classroom resources</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Fund translation of content into more languages</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Develop new adaptive learning technologies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center">Donor Impact Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🏫</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Rural School Program</h3>
              <p className="text-gray-600 text-sm">
                Thanks to donor support, we've brought chess education to 50 rural schools, 
                reaching over 2,000 students who previously had no access to quality chess instruction.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Global Translation</h3>
              <p className="text-gray-600 text-sm">
                Community contributions enabled us to translate our platform into 12 languages, 
                making chess accessible to non-English speaking communities worldwide.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Scholarship Fund</h3>
              <p className="text-gray-600 text-sm">
                Our scholarship program, funded entirely by donations, has provided premium 
                access to 500+ students from low-income families.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}