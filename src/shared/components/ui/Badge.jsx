import React from 'react';

/**
 * Badge Component - TraceVenue Design System
 * 
 * @param {string} variant - 'primary' | 'success' | 'error' | 'warning' | 'outline' | 'gradient' | 'soft'
 * @param {string} size - 'sm' | 'md' | 'lg'
 */

const Badge = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-[30px]';

    const sizes = {
        sm: 'px-2.5 py-1 text-xs',
        md: 'px-4 py-1.5 text-sm',
        lg: 'px-5 py-2 text-base',
    };

    const variants = {
        primary: 'bg-[#ff4000] text-white',
        success: 'bg-[#15b076] text-white',
        error: 'bg-[#e74c3c] text-white',
        warning: 'bg-[#e67e22] text-white',
        info: 'bg-[#3498db] text-white',
        outline: 'bg-transparent text-[#5c5f62] border border-[#d7d9da]',
        gradient: 'bg-gradient-to-r from-[#f08e45] to-[#ee5763] text-white',
        soft: 'bg-[#fff5f0] text-[#ff4000]',
        softSuccess: 'bg-[#e8f8f2] text-[#15b076]',
        softError: 'bg-[#fef2f2] text-[#e74c3c]',
    };

    return (
        <span
            className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`.replace(/\s+/g, ' ').trim()}
            {...props}
        >
            {children}
        </span>
    );
};

export default Badge;
