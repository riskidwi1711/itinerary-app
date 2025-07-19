import React, { useState } from 'react';
import { MapPin, Calendar, Clock, User, Plus, Menu, Plane, Calculator, History, Settings, CheckCircle, Globe, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TravelItinerary = () => {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [showAddMenu, setShowAddMenu] = useState(false);

  const tabs = [
    { id: 'itinerary', icon: Plane, label: 'Itinerary' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'calculator', icon: Calculator, label: 'Calculator' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  const activities = [
    {
      id: 1,
      type: 'flight',
      title: 'Bismillah OTW Soetta',
      time: '09:00 - 09:26',
      location: 'Indonesia',
      price: 'Rp 150.000',
      originalPrice: '(Rp 150.000)',
      status: 'paid',
      note: 'Beli tiket kereta bandara',
      icon: '✈️'
    }
  ];

  const addActivityOptions = [
    { id: 'flight', label: 'Flight', icon: '✈️', color: 'blue' },
    { id: 'hotel', label: 'Hotel', icon: '', color: 'purple' },
    { id: 'restaurant', label: 'Restaurant', icon: '️', color: 'red' },
    { id: 'attraction', label: 'Attraction', icon: '', color: 'green' },
    { id: 'transport', label: 'Transport', icon: '', color: 'yellow' },
    { id: 'other', label: 'Other', icon: '', color: 'gray' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 w-full bg-white/70 backdrop-blur-lg border-b border-white border-opacity-60 shadow-lg z-10 flex items-center justify-between py-3 px-4 rounded-b-3xl"
      >
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Plane className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">Travel Itinerary</h1>
        </div>
        <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
          <User className="w-5 h-5 text-white" />
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto pt-20 pb-24 space-y-6"> {/* Adjusted padding-top for fixed header */}
        {/* Destination Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl shadow-2xl border border-white border-opacity-80"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-700/90 z-10"></div>
          <div 
            className="h-56 bg-cover bg-center relative"
            style={{
              backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1200 600\"%3E%3Cdefs%3E%3ClinearGradient id=\"bg\" x1=\"0%25\" y1=\"0%25\" x2=\"100%25\" y2=\"100%25\"%3E%3Cstop offset=\"0%25\" style=\"stop-color:%23667eea;stop-opacity:1\" /%3E%3Cstop offset=\"100%25\" style=\"stop-color:%23764ba2;stop-opacity:1\" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=\"1200\" height=\"600\" fill=\"url(%23bg)\"/%3E%3Cg opacity=\"0.3\"%3E%3Crect x=\"100\" y=\"400\" width=\"60\" height=\"200\" fill=\"white\" rx=\"4\"/%3E%3Crect x=\"200\" y=\"350\" width=\"45\" height=\"250\" fill=\"white\" rx=\"4\"/%3E%3Crect x=\"280\" y=\"380\" width=\"70\" height=\"220\" fill=\"white\" rx=\"4\"/%3E%3Crect x=\"380\" y=\"320\" width=\"55\" height=\"280\" fill=\"white\" rx=\"4\"/%3E%3Crect x=\"460\" y=\"360\" width=\"80\" height=\"240\" fill=\"white\" rx=\"4\"/%3E%3Crect x=\"570\" y=\"340\" width=\"50\" height=\"260\" fill=\"white\" rx=\"4\"/%3E%3Crect x=\"650\" y=\"370\" width=\"65\" height=\"230\" fill=\"white\" rx=\"4\"/%3E%3Crect x=\"740\" y=\"310\" width=\"75\" height=\"290\" fill=\"white\" rx=\"4\"/%3E%3Crect x=\"840\" y=\"350\" width=\"60\" height=\"250\" fill=\"white\" rx=\"4\"/%3E%3Crect x=\"920\" y=\"380\" width=\"45\" height=\"220\" fill=\"white\" rx=\"4\"/%3E%3Crect x=\"990\" y=\"320\" width=\"70\" height=\"280\" fill=\"white\" rx=\"4\"/%3E%3C/g%3E%3C/svg%3E')"
            }}
          >
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Singapore</h2>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">24 Juli 2025 - 28 Juli 2025</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trip Duration Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white border-opacity-60 p-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Your Trip</p>
                <p className="text-lg font-bold text-gray-800">24 Juli 2025 – 28 Juli 2025</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">4</p>
              <p className="text-xs text-gray-600">Days</p>
            </div>
          </div>
        </motion.div>

        {/* Add Activity Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative"
        >
          <button 
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="w-full bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-200 p-4 flex items-center justify-center space-x-3"
          >
            <Plus className="w-6 h-6" />
            <span className="text-lg font-semibold">Add Activity</span>
          </button>

          {/* Add Activity Menu */}
          <AnimatePresence>
            {showAddMenu && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-3 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white border-opacity-60 p-4 z-30"
              >
                <div className="grid grid-cols-2 gap-3">
                  {addActivityOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setShowAddMenu(false)}
                      className={`p-3 rounded-xl border transition-all hover:scale-105 shadow-sm flex flex-col items-center justify-center ${
                        option.color === 'blue' ? 'border-blue-200 bg-blue-50 hover:bg-blue-100' :
                        option.color === 'purple' ? 'border-purple-200 bg-purple-50 hover:bg-purple-100' :
                        option.color === 'red' ? 'border-red-200 bg-red-50 hover:bg-red-100' :
                        option.color === 'green' ? 'border-green-200 bg-green-50 hover:bg-green-100' :
                        option.color === 'yellow' ? 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100' :
                        'border-gray-200 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-2xl mb-1">{option.icon}</div>
                      <p className="text-sm font-medium text-gray-700">{option.label}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Activity List */}
        <div className="space-y-4">
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white border-opacity-60 p-5"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-xl">{activity.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-800 text-lg">{activity.title}</h3>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                      {activity.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{activity.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Globe className="w-4 h-4" />
                      <span className="font-medium">{activity.location}</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3 mb-3 border border-blue-100">
                    <p className="text-sm text-blue-800 font-medium">
                      <span className="text-blue-600"> Note:</span> {activity.note}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-bold text-green-600 text-lg">{activity.price}</span>
                      <span className="text-gray-400 text-sm">{activity.originalPrice}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-green-600 font-semibold text-sm">Confirmed</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trip Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white border-opacity-60 p-6 text-gray-800"
        >
          <h3 className="text-xl font-bold mb-4">Trip Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Total Spent</p>
              <p className="text-2xl font-bold text-blue-700">Rp 150K</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm">Activities</p>
              <p className="text-2xl font-bold text-blue-700">1</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm">Days Left</p>
              <p className="text-2xl font-bold text-blue-700">4</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.7 }}
        className="fixed bottom-0 left-0 right-0 w-full bg-white/70 backdrop-blur-lg border-t border-white border-opacity-60 shadow-2xl z-30 flex justify-around py-3 px-2 rounded-t-3xl"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center text-xs font-medium p-2 rounded-xl transition-all duration-300 relative group
                ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className={`mt-1 ${activeTab === tab.id ? 'font-bold text-blue-600' : 'text-gray-700 group-hover:text-blue-600'}`}>{tab.label}</span>
              {activeTab === tab.id && (
                <motion.span
                  layoutId="underline"
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 rounded-full"
                />
              )}
            </button>
          );
        })}
      </motion.nav>

      {/* Overlay for add menu */}
      <AnimatePresence>
        {showAddMenu && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-20"
            onClick={() => setShowAddMenu(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TravelItinerary;
