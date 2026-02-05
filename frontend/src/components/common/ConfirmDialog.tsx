"use client";

import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    type?: "danger" | "warning" | "info";
}

export default function ConfirmDialog({
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    type = "danger"
}: ConfirmDialogProps) {
    const getTypeStyles = () => {
        switch (type) {
            case "danger":
                return {
                    iconBg: "bg-red-100",
                    iconColor: "text-red-600",
                    confirmBtn: "bg-red-600 hover:bg-red-700",
                    borderColor: "border-red-200"
                };
            case "warning":
                return {
                    iconBg: "bg-yellow-100",
                    iconColor: "text-yellow-600",
                    confirmBtn: "bg-yellow-600 hover:bg-yellow-700",
                    borderColor: "border-yellow-200"
                };
            case "info":
                return {
                    iconBg: "bg-blue-100",
                    iconColor: "text-blue-600",
                    confirmBtn: "bg-blue-600 hover:bg-blue-700",
                    borderColor: "border-blue-200"
                };
        }
    };

    const styles = getTypeStyles();

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in duration-200">
                {/* Header */}
                <div className="p-6 pb-4">
                    <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`${styles.iconBg} p-3 rounded-xl flex-shrink-0`}>
                            <AlertTriangle className={`${styles.iconColor}`} size={24} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{message}</p>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onCancel}
                            className="flex-shrink-0 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Close"
                        >
                            <X size={18} className="text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end border-t border-gray-100">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2.5 ${styles.confirmBtn} text-white rounded-lg transition-colors text-sm font-medium shadow-sm`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
