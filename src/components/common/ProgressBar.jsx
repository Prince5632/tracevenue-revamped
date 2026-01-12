import React from 'react';

/**
 * ProgressBar Component - TraceVenue Design System
 * 
 * @param {number} value - Current progress (0-100)
 * @param {boolean} showLabel - Show percentage text
 * @param {string} variant - 'default' | 'gradient'
 */

const ProgressBar = ({
    value = 0,
    showLabel = false,
    variant = 'gradient',
    height = 6,
    className = '',
    ...props
}) => {
    const clampedValue = Math.min(Math.max(value, 0), 100);

    const variants = {
        default: 'bg-[#ff4000]',
        gradient: 'bg-gradient-to-r from-[#f08e45] to-[#ee5763]',
        success: 'bg-[#15b076]',
    };

    return (
        <div className={`relative ${className}`} {...props}>
            {/* Track */}
            <div
                className="w-full bg-[#e0e0e0] rounded-full overflow-hidden"
                style={{ height }}
            >
                {/* Progress */}
                <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${variants[variant]}`}
                    style={{ width: `${clampedValue}%` }}
                />
            </div>

            {/* Label */}
            {showLabel && (
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#060606]">
                    {Math.round(clampedValue)}%
                </span>
            )}
        </div>
    );
};

/**
 * Circular Progress
 */
ProgressBar.Circle = ({
    value = 0,
    size = 80,
    strokeWidth = 8,
    showLabel = true,
    className = '',
}) => {
    const clampedValue = Math.min(Math.max(value, 0), 100);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (clampedValue / 100) * circumference;

    return (
        <div className={`relative inline-flex items-center justify-center ${className}`}>
            <svg width={size} height={size} className="-rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#e0e0e0"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="url(#progressGradient)"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="transition-all duration-500 ease-out"
                />
                <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f08e45" />
                        <stop offset="100%" stopColor="#ee5763" />
                    </linearGradient>
                </defs>
            </svg>
            {showLabel && (
                <span className="absolute text-lg font-bold bg-gradient-to-r from-[#f08e45] to-[#ee5763] bg-clip-text text-transparent">
                    {Math.round(clampedValue)}%
                </span>
            )}
        </div>
    );
};

export default ProgressBar;
