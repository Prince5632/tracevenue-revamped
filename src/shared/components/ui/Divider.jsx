import React from 'react';

/**
 * Divider Component - TraceVenue Design System
 */

const Divider = ({
    orientation = 'horizontal',
    variant = 'solid',
    text,
    className = '',
    ...props
}) => {
    const variants = {
        solid: 'border-[#d7d9da]',
        dashed: 'border-[#d7d9da] border-dashed',
        gradient: 'bg-gradient-to-r from-transparent via-[#d7d9da] to-transparent',
    };

    if (orientation === 'vertical') {
        return (
            <div
                className={`h-full w-px ${variant === 'gradient' ? variants.gradient : `border-l ${variants[variant]}`} ${className}`}
                {...props}
            />
        );
    }

    if (text) {
        return (
            <div className={`flex items-center gap-4 ${className}`} {...props}>
                <div className={`flex-1 h-px ${variants.gradient}`} />
                <span className="text-sm text-[#85878c] font-medium">{text}</span>
                <div className={`flex-1 h-px ${variants.gradient}`} />
            </div>
        );
    }

    return (
        <div
            className={`
                w-full
                ${variant === 'gradient' ? `h-px ${variants.gradient}` : `border-t ${variants[variant]}`}
                ${className}
            `.replace(/\s+/g, ' ').trim()}
            {...props}
        />
    );
};

export default Divider;
