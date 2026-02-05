import { MapPin, Navigation, Clock, Package } from 'lucide-react';

export default function DeliveryTracker() {
    const trackingData = {
        orderId: "ORD-2024-1547",
        status: "In Transit",
        estimatedDelivery: "Today, 2:30 PM",
        currentLocation: "Distribution Center - Colombo",
        progress: 65
    };

    const trackingSteps = [
        { label: "Order Placed", time: "10:30 AM", completed: true },
        { label: "Processing", time: "11:15 AM", completed: true },
        { label: "In Transit", time: "12:45 PM", completed: true, active: true },
        { label: "Out for Delivery", time: "Est. 2:00 PM", completed: false },
        { label: "Delivered", time: "Est. 2:30 PM", completed: false }
    ];

    return (
        <div className="bg-white w-full lg:w-7/12 rounded-lg border border-gray-50 p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-800">Live Delivery Tracking</h2>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {trackingData.status}
                </span>
            </div>

            {/* Order Info */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Package size={16} className="text-gray-600" />
                        <span className="text-xs font-semibold text-gray-800">{trackingData.orderId}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Clock size={14} />
                        <span>{trackingData.estimatedDelivery}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-gray-500" />
                    <span className="text-xs text-gray-600">{trackingData.currentLocation}</span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${trackingData.progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Tracking Steps */}
            <div className="space-y-3">
                {trackingSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.completed
                                ? 'bg-blue-500 text-white'
                                : step.active
                                    ? 'bg-blue-100 text-blue-600 border-2 border-blue-500'
                                    : 'bg-gray-200 text-gray-400'
                                }`}>
                                {step.completed ? (
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : step.active ? (
                                    <Navigation size={16} />
                                ) : (
                                    <div className="w-2 h-2 rounded-full bg-current"></div>
                                )}
                            </div>
                            {index < trackingSteps.length - 1 && (
                                <div className={`w-0.5 h-8 ${step.completed ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                            )}
                        </div>
                        <div className="flex-1 pb-2">
                            <p className={`text-sm font-semibold ${step.active ? 'text-blue-600' : step.completed ? 'text-gray-800' : 'text-gray-500'
                                }`}>
                                {step.label}
                            </p>
                            <p className="text-xs text-gray-500">{step.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
