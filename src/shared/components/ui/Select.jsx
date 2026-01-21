import React, { useState, useRef, useEffect } from 'react';

/**
 * Select Component - TraceVenue Design System
 * 
 * Custom styled dropdown with:
 * - Search functionality
 * - Multi-select support
 * - Custom option rendering
 */

const Select = ({
    label,
    options = [],
    value,
    onChange,
    placeholder = 'Select an option',
    error,
    disabled = false,
    multiple = false,
    searchable = false,
    fullWidth = true,
    className = '',
    required = false,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const selectRef = useRef(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (selectRef.current && !selectRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = searchable
        ? options.filter(opt => opt.label.toLowerCase().includes(search.toLowerCase()))
        : options;

    const handleSelect = (option) => {
        if (multiple) {
            const isSelected = value?.some(v => v.value === option.value);
            const newValue = isSelected
                ? value.filter(v => v.value !== option.value)
                : [...(value || []), option];
            onChange?.(newValue);
        } else {
            onChange?.(option);
            setIsOpen(false);
        }
    };

    const removeTag = (e, option) => {
        e.stopPropagation();
        onChange?.(value.filter(v => v.value !== option.value));
    };

    const displayValue = multiple
        ? (value?.length ? `${value.length} selected` : placeholder)
        : (value?.label || placeholder);

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
        <div className={`${widthStyle} ${className}`} ref={selectRef}>
            {label && (
                <label className="block mb-2 text-sm font-semibold text-[#060606]">
                    {label}
                    {required && <span className="text-[#e74c3c] ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {/* Trigger */}
                <div
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    className={`
                        w-full px-5 py-3 pr-10
                        border rounded-[30px]
                        text-base font-medium
                        bg-white cursor-pointer
                        transition-all duration-300 ease-in-out
                        flex items-center justify-between
                        ${error ? 'border-[#e74c3c]' : 'border-[#d7d9da]'}
                        ${isOpen ? 'border-[#ff4000] shadow-[0_0_0_3px_rgba(255,64,0,0.1)]' : ''}
                        ${disabled ? 'opacity-50 cursor-not-allowed bg-[#f5f5f5]' : ''}
                    `.replace(/\s+/g, ' ').trim()}
                >
                    <span className={value ? 'text-[#060606]' : 'text-[#85878c]'}>
                        {displayValue}
                    </span>
                    <svg
                        className={`w-4 h-4 text-[#ff4000] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {/* Dropdown */}
                {isOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-white border border-[#d7d9da] rounded-[20px] shadow-lg overflow-hidden animate-slide-down">
                        {searchable && (
                            <div className="p-3 border-b border-[#eeeeee]">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full px-4 py-2 border border-[#d7d9da] rounded-[20px] text-sm focus:outline-none focus:border-[#ff4000]"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        )}
                        <div className="max-h-[300px] overflow-y-auto">
                            {filteredOptions.length === 0 ? (
                                <div className="px-5 py-4 text-center text-[#85878c]">No options</div>
                            ) : (
                                filteredOptions.map((option) => {
                                    const isSelected = multiple
                                        ? value?.some(v => v.value === option.value)
                                        : value?.value === option.value;
                                    return (
                                        <div
                                            key={option.value}
                                            onClick={() => handleSelect(option)}
                                            className={`
                                                px-5 py-3 cursor-pointer transition-all duration-200
                                                flex items-center justify-between
                                                ${isSelected ? 'bg-[#fff5f0] text-[#ff4000]' : 'hover:bg-[#f5f5f5]'}
                                            `.replace(/\s+/g, ' ').trim()}
                                        >
                                            <span className="font-medium">{option.label}</span>
                                            {isSelected && (
                                                <svg className="w-5 h-5 text-[#ff4000]" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Multi-select tags */}
            {multiple && value?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {value.map((v) => (
                        <span
                            key={v.value}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-[#ff4000] text-white text-sm font-medium rounded-full"
                        >
                            {v.label}
                            <button
                                onClick={(e) => removeTag(e, v)}
                                className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                            >
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {error && (
                <p className="mt-2 text-sm text-[#e74c3c]">{error}</p>
            )}
        </div>
    );
};

export default Select;
