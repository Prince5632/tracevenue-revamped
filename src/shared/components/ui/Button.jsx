import React from 'react';

/**
 * Button Component - TraceVenue Design System
 * 
 * @param {string} variant - 'primary' | 'secondary' | 'gradient' | 'outline' | 'ghost'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} fullWidth - Makes button 100% width
 * @param {boolean} loading - Shows spinner
 * @param {ReactNode} leftIcon - Icon on left
 * @param {ReactNode} rightIcon - Icon on right
 */

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    loading = false,
    leftIcon,
    rightIcon,
    className = '',
    onClick,
    type = 'button',
    ...props
}) => {
    const baseStyles = `
        inline-flex items-center justify-center gap-2
        font-semibold cursor-pointer
        transition-all duration-300 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-[0.98]
    `;

    const sizes = {
        sm: 'px-4 py-2 text-sm rounded-[20px]',
        md: 'px-5 py-2.5 text-base rounded-[30px]',
        lg: 'px-6 py-3 text-lg rounded-[30px]',
    };

    const variants = {
        primary: `
            bg-[#ff4000] text-white border-none
           
        `,
        secondary: `
            bg-[#f0f0f4] text-[#5c5f62] border border-[#d7d9da]
            
        `,
        gradient: `
            bg-gradient-to-r from-[#f39c12] to-[#ee5763] text-white border-none
         
        `,
        outline: `
            bg-transparent text-[#ff4000] border border-[#ff4000]
          
        `,
        ghost: `
            bg-transparent text-[#5c5f62] border-none
          
        `,
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${widthStyle} ${className}`.replace(/\s+/g, ' ').trim()}
            {...props}
        >
            {loading ? (
                <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
                <>
                    {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
                    {children}
                    {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
                </>
            )}
        </button>
    );
};

export default Button;
