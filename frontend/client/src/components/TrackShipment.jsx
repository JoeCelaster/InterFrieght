import React, { useState } from 'react';
import { FaShippingFast, FaMapMarkerAlt, FaBoxOpen, FaCheckCircle, FaRegClock } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import UserNavbar from './UserNavbar';


const TrackShipment = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  
  const TRACKING_REGEX = /^[A-Z]{3}\d{8}$/;

  const handleTrack = (e) => {
    e.preventDefault();
    setError("");
    setShipment(null);
    if (!TRACKING_REGEX.test(trackingNumber)) {
      setError("Tracking number must be 3 uppercase letters followed by 8 digits (e.g., ABC12345678)");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setShipment(MOCK_SHIPMENT);
      setError("");
      setLoading(false);
    }, 1200);
  };
  
  const MOCK_SHIPMENT = {
    trackingNumber: trackingNumber,
    status: 'In Transit',
    origin: 'Mumbai, India',
    destination: 'Hamburg, Germany',
    estimatedDelivery: '2025-08-15',
    milestones: [
      { label: 'Booked', date: '2025-08-01', icon: <FaBoxOpen className="text-blue-600" /> },
      { label: 'Picked Up', date: '2025-08-02', icon: <FaShippingFast className="text-blue-600" /> },
      { label: 'In Transit', date: '2025-08-04', icon: <FaMapMarkerAlt className="text-blue-600" /> },
      { label: 'Arrived', date: null, icon: <FaCheckCircle className="text-gray-400" /> },
      { label: 'Delivered', date: null, icon: <FaCheckCircle className="text-gray-400" /> },
    ],
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center py-16 px-2 font-serif ">
      <UserNavbar/>
      <h1 className="text-2xl font-light tracking-wide text-black mb-2 text-center mt-8 underline underline-offset-4 font-serif text-center">Easily track your shipments in real-time and stay updated on every movement from origin to destination.</h1>
      <div className="w-full max-w-xl bg-white rounded-md shadow-md border-2 border-gray-300 p-8 mt-8">
        <h1 className="text-4xl font-light tracking-wider text-black mb-2 text-center">Track Your Shipment</h1>
        <p className="text-gray-500 text-center mb-8">Enter your tracking number to view shipment status and details.</p>
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <div className="flex-1 w-full">
            <input
              type="text"
              className="w-full border-2 border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:border-blue-500 font-serif"
              placeholder="Enter Tracking Number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
              maxLength={11}
              pattern="[A-Z]{3}\d{8}"
              required
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white tracking-wide px-6 py-3 rounded-xl transition-all duration-150 shadow font-serif"
            disabled={loading}
          >
            <AiOutlineSearch className="text-xl" />
            {loading ? 'Tracking...' : 'Track'}
          </button>
        </form>
        {error && <div className="text-red-500 text-center mb-4 font-serif">{error}</div>}
        {shipment && (
          <div className="mt-6">
            <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Tracking Number</span>
                  <span className="text-xl font-light tracking-wide  text-blue-700 font-serif">{shipment.trackingNumber}</span>
                </div>
                <div className="flex flex-col md:items-end">
                  <span className="text-gray-500 text-sm">Status</span>
                  <span className="text-lg font-light tracking-wide text-green-700 font-serif">{shipment.status}</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between gap-2">
                <div>
                  <span className="text-gray-500 text-sm">Origin</span>
                  <div className="flex items-center gap-2 text-lg font-serif">
                    <FaMapMarkerAlt className="text-blue-400" /> {shipment.origin}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Destination</span>
                  <div className="flex items-center gap-2 text-lg font-serif">
                    <FaMapMarkerAlt className="text-blue-400" /> {shipment.destination}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Est. Delivery</span>
                  <div className="flex items-center gap-2 text-lg font-serif">
                    <FaRegClock className="text-blue-400" /> {shipment.estimatedDelivery}
                  </div>
                </div>
              </div>
            </div>
            {/* Timeline */}
            <div className="mb-6">
              <h2 className="text-2xl font-light tracking-wide text-blue-700 mb-4 font-serif">Shipment Progress</h2>
              <div className="flex flex-col gap-4">
                {shipment.milestones.map((m, idx) => (
                  <div key={m.label} className="flex items-center gap-4">
                    <div className={`rounded-full p-2 ${m.date ? 'bg-blue-100' : 'bg-gray-100'} border-2 ${m.date ? 'border-blue-300' : 'border-gray-300'}`}>{m.icon}</div>
                    <div className="flex-1">
                      <span className={`text-lg font-serif ${m.date ? 'text-blue-900 font-light tracking-wider' : 'text-gray-400'}`}>{m.label}</span>
                      {m.date && <span className="ml-4 text-gray-500 text-sm font-serif">{m.date}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackShipment;
