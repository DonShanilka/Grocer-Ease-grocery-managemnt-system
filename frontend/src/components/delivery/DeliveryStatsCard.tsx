"use client";
import React from "react";
import {
  Package,
  Truck,
  XCircle,
  RotateCcw,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Delivery } from "../../types/Delivery";

export interface DeliveryStats {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  color: string;
}

export interface Props {
  delivery: Delivery[];
}

const DeliveryStatsCard = ({ delivery }: Props) => {
  const total = delivery.length;

  const completed = delivery.filter(
    (d: any) => d.delivery_status === "COMPLETED"
  ).length;
  const onDelivery = delivery.filter(
    (d: any) => d.delivery_status === "OUT_FOR_DELIVERY"
  ).length;
  const cancelDelivery = delivery.filter(
    (d: any) => d.delivery_status === "CANCELLED"
  ).length;
  const returnDelivery = delivery.filter(
    (d: any) => d.delivery_status === "RETURNED"
  ).length;

  const status = [
    {
      label: "Total Delivered",
      value: total,
      change: "+2.00%",
      isPositive: true,
      icon: <Package className="w-6 h-6 text-white" />,
      color: "bg-blue-500",
    },
    {
      label: "On Delivery",
      value: onDelivery,
      change: "-11.08%",
      isPositive: false,
      icon: <Truck className="w-6 h-6 text-white" />,
      color: "bg-green-500",
    },
    {
      label: "Cancel Delivery",
      value: cancelDelivery,
      change: "+10.05%",
      isPositive: true,
      icon: <XCircle className="w-6 h-6 text-white" />,
      color: "bg-pink-500",
    },
    {
      label: "Return Delivery",
      value: returnDelivery,
      change: "-0.03%",
      isPositive: false,
      icon: <RotateCcw className="w-6 h-6 text-white" />,
      color: "bg-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 px-6">
      {status.map((stat) => (
        <div
          key={stat.label}
          className="bg-white p-4 rounded-lg border border-gray-50"
        >
          <div className="flex items-start justify-between">
            <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>

            <div className="flex items-center gap-1 mt-2">
              {stat.isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={`text-sm font-medium ${
                  stat.isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-gray-500 text-sm">vs last month</span>
            </div>

            <div
              className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mt-4`}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeliveryStatsCard;
