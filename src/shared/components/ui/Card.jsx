import React from 'react';

/**
 * Card Component - TraceVenue Design System
 * 
 * @param {string} variant - 'default' | 'gradient' | 'elevated' | 'bordered'
 * @param {string} padding - 'none' | 'sm' | 'md' | 'lg'
 * @param {boolean} hoverable - Adds hover lift effect
 */

const Card = ({
    children,
    variant = 'default',
    padding = 'md',
    className = '',
    onClick,
    hoverable = false,
    ...props
}) => {
    const baseStyles = 'transition-all duration-300 ease-in-out rounded-[30px]';

    const paddings = {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-5',
        lg: 'p-8',
    };

    const variants = {
        default: 'bg-white border border-[#d7d9da] shadow-[0_0_12px_3px_rgba(0,0,0,0.05)]',
        gradient: 'border border-[#d7d9da] bg-gradient-to-r from-[#fdeaed] via-[#fdeaed]/50 to-[#fff3ea]',
        elevated: 'bg-white border border-[#d7d9da] shadow-[0_4px_10px_0_rgba(0,0,0,0.05)]',
        bordered: 'bg-gradient-to-r from-[#fdeaed] to-[#fff3ea] border border-[#ff8359]',
        flat: 'bg-[#f0f0f4] border border-[#d7d9da]',
        borderless: 'bg-[#f0f0f9] border-0 shadow-none',
    };

    const hoverStyles = hoverable
        ? 'cursor-pointer hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)]'
        : '';

    const clickableStyle = onClick ? 'cursor-pointer' : '';

    return (
        <div
            onClick={onClick}
            className={`${baseStyles} ${paddings[padding]} ${variants[variant]} ${hoverStyles} ${clickableStyle} ${className}`.replace(/\s+/g, ' ').trim()}
            {...props}
        >
            {children}
        </div>
    );
};

// Card Header
Card.Header = ({ children, className = '' }) => (
    <div className={`mb-4 ${className}`}>{children}</div>
);

// Card Body
Card.Body = ({ children, className = '' }) => (
    <div className={className}>{children}</div>
);

// Card Footer
Card.Footer = ({ children, className = '' }) => (
    <div className={`mt-4 pt-4 border-t border-[#d7d9da] ${className}`}>{children}</div>
);

export default Card;
