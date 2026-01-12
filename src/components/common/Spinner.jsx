import React from 'react';

/**
 * Spinner Component - TraceVenue Design System
 */

const Spinner = ({
    size = 'md',
    color = 'primary',
    className = '',
    ...props
}) => {
    const sizes = {
        sm: 'w-4 h-4 border-2',
        md: 'w-6 h-6 border-2',
        lg: 'w-10 h-10 border-[3px]',
        xl: 'w-14 h-14 border-4',
    };

    const colors = {
        primary: 'border-[#ff4000] border-t-transparent',
        white: 'border-white border-t-transparent',
        gray: 'border-[#85878c] border-t-transparent',
    };

    return (
        <div
            className={`${sizes[size]} ${colors[color]} rounded-full animate-spin ${className}`.replace(/\s+/g, ' ').trim()}
            {...props}
        />
    );
};

/**
 * PageLoader - Full page loading overlay
 */
export const PageLoader = ({ message = 'Loading...' }) => (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999]">
        <Spinner size="xl" />
        <p className="mt-4 text-[#5c5f62] font-medium">{message}</p>
    </div>
);

/**
 * InlineLoader - Inline loading state
 */
export const InlineLoader = ({ message, className = '' }) => (
    <div className={`flex items-center justify-center gap-3 py-8 ${className}`}>
        <Spinner size="md" />
        {message && <span className="text-[#5c5f62]">{message}</span>}
    </div>
);

/**
 * ButtonLoader - Loading inside button
 */
export const ButtonLoader = ({ className = '' }) => (
    <Spinner size="sm" color="white" className={className} />
);

export default Spinner;
