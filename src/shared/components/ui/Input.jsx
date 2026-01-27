import React from 'react';

/**
 * Input Component - TraceVenue Design System
 * 
 * Features:
 * - Left/Right icons
 * - Error state with red border
 * - Label and helper text
 * - Mobile responsive
 */

const Input = ({
    type = 'text',
    label,
    placeholder,
    value,
    onChange,
    error,
    helperText,
    leftIcon,
    rightIcon,
    disabled = false,
    fullWidth = true,
    className = '',
    inputClassName = '',
    required = false,
    id,
    name,
    ...props
}) => {
    const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseInputStyles = `
        w-full px-5 py-3
        border rounded-[30px]
        text-base font-medium text-[#060606]
        placeholder:text-[#85878c] placeholder:font-medium
        bg-white
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-0
    `;

    const stateStyles = error
        ? 'border-[#e74c3c] focus:border-[#e74c3c] focus:shadow-[0_0_0_3px_rgba(231,76,60,0.1)]'
        : 'border-[#d7d9da] focus:border-[#ff4000] focus:shadow-[0_0_0_3px_rgba(255,64,0,0.1)]';

    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed bg-[#f5f5f5]' : '';
    const paddingLeft = leftIcon ? 'pl-12' : 'px-5';
    const paddingRight = rightIcon ? 'pr-12' : 'px-5';
    const widthStyle = fullWidth ? 'w-full' : '';

    return (
        <div className={`${widthStyle} ${className}`}>
            {label && (
                <label htmlFor={inputId} className="block mb-2 text-sm font-semibold text-[#060606]">
                    {label}
                    {required && <span className="text-[#e74c3c] ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {leftIcon && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ff4000]">
                        {leftIcon}
                    </span>
                )}

                <input
                    id={inputId}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    className={`${baseInputStyles} ${stateStyles} ${disabledStyles} ${paddingLeft} ${paddingRight} ${inputClassName}`.replace(/\s+/g, ' ').trim()}
                    {...props}
                />

                {rightIcon && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#85878c]">
                        {rightIcon}
                    </span>
                )}
            </div>

            {(error || helperText) && (
                <p className={`mt-2 text-sm ${error ? 'text-[#e74c3c]' : 'text-[#85878c]'}`}>
                    {error || helperText}
                </p>
            )}
        </div>
    );
};

export default Input;
