import React from 'react';

/**
 * Shimmer/Skeleton Component - TraceVenue Design System
 * 
 * Placeholder for loading states
 */

const Shimmer = ({
    width = '100%',
    height = '1rem',
    rounded = 'md',
    className = '',
    animated = true,
    ...props
}) => {
    const roundedStyles = {
        none: 'rounded-none',
        sm: 'rounded',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
        pill: 'rounded-[30px]',
    };

    return (
        <div
            className={`
                ${animated ? 'shimmer' : 'bg-[#e0e0e0]'}
                ${roundedStyles[rounded]}
                ${className}
            `.replace(/\s+/g, ' ').trim()}
            style={{ width, height }}
            {...props}
        />
    );
};

// Text Shimmer - Multiple lines
Shimmer.Text = ({ lines = 3, className = '' }) => (
    <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
            <Shimmer
                key={i}
                height="0.875rem"
                width={i === lines - 1 ? '60%' : '100%'}
                rounded="md"
            />
        ))}
    </div>
);

// Card Shimmer
Shimmer.Card = ({ className = '' }) => (
    <div className={`p-5 border border-[#d7d9da] rounded-[30px] ${className}`}>
        <Shimmer height="1.5rem" width="60%" rounded="md" className="mb-3" />
        <Shimmer.Text lines={2} />
        <div className="flex gap-2 mt-4">
            <Shimmer height="2rem" width="5rem" rounded="pill" />
            <Shimmer height="2rem" width="5rem" rounded="pill" />
        </div>
    </div>
);

// Avatar Shimmer
Shimmer.Avatar = ({ size = 40, className = '' }) => (
    <Shimmer
        width={size}
        height={size}
        rounded="full"
        className={className}
    />
);

// Button Shimmer
Shimmer.Button = ({ width = '8rem', className = '' }) => (
    <Shimmer height="2.5rem" width={width} rounded="pill" className={className} />
);

export default Shimmer;
