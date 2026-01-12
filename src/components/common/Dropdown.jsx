import React from 'react';

/**
 * Dropdown Component - TraceVenue Design System
 * 
 * Three dot menu dropdown
 */

const Dropdown = ({
    trigger,
    items = [],
    align = 'right',
    className = '',
    ...props
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef(null);

    // Close on outside click
    React.useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const alignStyles = {
        left: 'left-0',
        right: 'right-0',
        center: 'left-1/2 -translate-x-1/2',
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef} {...props}>
            {/* Trigger */}
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {trigger || (
                    <button className="p-2 rounded-lg hover:bg-[#f0f0f4] transition-colors">
                        <svg className="w-5 h-5 text-[#5c5f62]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Menu */}
            {isOpen && (
                <div
                    className={`
                        absolute z-50 mt-2 min-w-[150px]
                        bg-white border border-[#e5e7eb] rounded-lg
                        shadow-[0_8px_24px_rgba(0,0,0,0.12)]
                        overflow-hidden animate-slide-down
                        ${alignStyles[align]}
                    `.replace(/\s+/g, ' ').trim()}
                >
                    {items.map((item, index) => {
                        if (item.divider) {
                            return <div key={index} className="border-t border-[#e5e7eb] my-1" />;
                        }
                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    item.onClick?.();
                                    setIsOpen(false);
                                }}
                                className={`
                                    w-full flex items-center gap-3 px-4 py-2.5
                                    text-sm font-medium text-left
                                    transition-all duration-200
                                    ${item.danger
                                        ? 'text-[#e74c3c] hover:bg-[#fef2f2]'
                                        : 'text-[#374151] hover:bg-[#fff5f0] hover:text-[#ff4000]'
                                    }
                                    ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                                `.replace(/\s+/g, ' ').trim()}
                                disabled={item.disabled}
                            >
                                {item.icon && (
                                    <span className={item.danger ? 'text-[#e74c3c]' : 'text-[#ff4000]'}>
                                        {item.icon}
                                    </span>
                                )}
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
