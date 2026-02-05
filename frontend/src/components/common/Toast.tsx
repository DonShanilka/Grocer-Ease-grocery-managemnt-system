"use client";

import { useEffect } from "react";
import { X, CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

interface ToastProps {
    message: string;
    type: "success" | "error" | "warning" | "info";
    onClose: () => void;
    duration?: number;
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getToastStyles = () => {
        switch (type) {
            case "success":
                return {
                    bg: "bg-gradient-to-r from-green-50 to-emerald-50",
                    border: "border-green-200",
                    icon: <CheckCircle className="text-green-600" size={20} />,
                    iconBg: "bg-green-100",
                    textColor: "text-green-800",
                    progressBar: "bg-green-500"
                };
            case "error":
                return {
                    bg: "bg-gradient-to-r from-red-50 to-rose-50",
                    border: "border-red-200",
                    icon: <XCircle className="text-red-600" size={20} />,
                    iconBg: "bg-red-100",
                    textColor: "text-red-800",
                    progressBar: "bg-red-500"
                };
            case "warning":
                return {
                    bg: "bg-gradient-to-r from-yellow-50 to-amber-50",
                    border: "border-yellow-200",
                    icon: <AlertTriangle className="text-yellow-600" size={20} />,
                    iconBg: "bg-yellow-100",
                    textColor: "text-yellow-800",
                    progressBar: "bg-yellow-500"
                };
            case "info":
                return {
                    bg: "bg-gradient-to-r from-blue-50 to-cyan-50",
                    border: "border-blue-200",
                    icon: <Info className="text-blue-600" size={20} />,
                    iconBg: "bg-blue-100",
                    textColor: "text-blue-800",
                    progressBar: "bg-blue-500"
                };
        }
    };

    const styles = getToastStyles();

    return (
        <div className="fixed top-6 right-6 z-[9999] animate-in slide-in-from-top-2 fade-in duration-300">
            <div className={`${styles.bg} ${styles.border} border rounded-xl shadow-2xl overflow-hidden max-w-md min-w-[320px]`}>
                <div className="flex items-start gap-3 p-4">
                    {/* Icon */}
                    <div className={`${styles.iconBg} p-2 rounded-lg flex-shrink-0`}>
                        {styles.icon}
                    </div>

                    {/* Message */}
                    <div className="flex-1 pt-0.5">
                        <p className={`${styles.textColor} font-semibold text-sm leading-relaxed`}>
                            {message}
                        </p>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="flex-shrink-0 p-1.5 hover:bg-black/5 rounded-lg transition-colors"
                        aria-label="Close"
                    >
                        <X size={16} className="text-gray-600" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-black/5">
                    <div
                        className={`h-full ${styles.progressBar} animate-shrink-width`}
                        style={{ animationDuration: `${duration}ms` }}
                    />
                </div>
            </div>

            <style jsx>{`
        @keyframes shrink-width {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        .animate-shrink-width {
          animation: shrink-width linear forwards;
        }
      `}</style>
        </div>
    );
}
