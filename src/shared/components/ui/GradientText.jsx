import React from 'react';

/**
 * GradientText Component - TraceVenue Design System
 * 
 * Renders text with the signature orange gradient
 */

const GradientText = ({
    children,
    as: Component = 'span',
    className = '',
    ...props
}) => {
    return (
        <Component
            className={`
                bg-gradient-to-r from-[#f08e45] to-[#ee5763]
                bg-clip-text text-transparent
                ${className}
            `.replace(/\s+/g, ' ').trim()}
            {...props}
        >
            {children}
        </Component>
    );
};

export default GradientText;
