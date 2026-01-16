import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Custom Time Picker Component
 * Cross-browser compatible with invisible scrollbars
 */
const CustomTimePicker = ({
    value = '06:30',
    onChange,
    disabled = false,
    minTime = '',
    className = '',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const containerRef = useRef(null);
    const hourColumnRef = useRef(null);
    const minuteColumnRef = useRef(null);

    // Parse 24-hour time to components
    const parseTime = (timeStr) => {
        if (!timeStr) return { hour: 6, minute: 30, period: 'PM' };

        const [hours, minutes] = timeStr.split(':').map(Number);
        const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
        const period = hours >= 12 ? 'PM' : 'AM';

        return { hour: hour12, minute: minutes, period };
    };

    // Convert 12-hour to 24-hour format
    const to24Hour = (hour, minute, period) => {
        let hour24 = hour;
        if (period === 'AM' && hour === 12) {
            hour24 = 0;
        } else if (period === 'PM' && hour !== 12) {
            hour24 = hour + 12;
        }
        return `${hour24.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    };

    const { hour, minute, period } = parseTime(value);

    // Generate hours (1-12)
    const hours = Array.from({ length: 12 }, (_, i) => i + 1);

    // Generate minutes (00, 05, 10, ... 55)
    const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

    // Periods
    const periods = ['AM', 'PM'];

    // Check if a specific time choice is disabled based on minTime
    const isOptionDisabled = (type, val) => {
        if (!minTime) return false;

        const [minH24, minM24] = minTime.split(':').map(Number);
        
        let targetHour = hour;
        let targetMinute = minute;
        let targetPeriod = period;

        if (type === 'hour') targetHour = val;
        if (type === 'minute') targetMinute = val;
        if (type === 'period') targetPeriod = val;

        // Convert target to 24h for comparison
        let h24 = targetHour;
        if (targetPeriod === 'AM' && targetHour === 12) h24 = 0;
        else if (targetPeriod === 'PM' && targetHour !== 12) h24 = targetHour + 12;

        if (h24 < minH24) return true;
        if (h24 === minH24 && targetMinute < minM24) return true;

        return false;
    };

    // Handle selection
    const handleSelect = (type, val) => {
        if (isOptionDisabled(type, val)) return;

        let newHour = hour;
        let newMinute = minute;
        let newPeriod = period;

        if (type === 'hour') newHour = val;
        if (type === 'minute') newMinute = val;
        if (type === 'period') newPeriod = val;

        const newTime = to24Hour(newHour, newMinute, newPeriod);
        onChange?.(newTime);
    };

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Scroll to selected values when opening
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                if (hourColumnRef.current) {
                    const selectedHour = hourColumnRef.current.querySelector('[data-selected="true"]');
                    if (selectedHour) {
                        hourColumnRef.current.scrollTop = selectedHour.offsetTop - 40;
                    }
                }
                if (minuteColumnRef.current) {
                    const selectedMin = minuteColumnRef.current.querySelector('[data-selected="true"]');
                    if (selectedMin) {
                        minuteColumnRef.current.scrollTop = selectedMin.offsetTop - 40;
                    }
                }
            }, 10);
        }
    }, [isOpen]);

    return (
        <>
            {/* CSS for invisible scrollbar */}
            <style>
                {`
                    .time-picker-column {
                        scrollbar-width: none; /* Firefox */
                        -ms-overflow-style: none; /* IE 10+ */
                    }
                    .time-picker-column::-webkit-scrollbar {
                        display: none; /* Chrome, Safari, Edge */
                        width: 0;
                        height: 0;
                    }
                    .time-picker-item:hover {
                        background-color: #fff7ed !important;
                        color: #ff4000 !important;
                    }
                    .time-picker-item[data-selected="true"] {
                         background: linear-gradient(135deg, #ff4000 0%, #ff6633 100%) !important;
                         color: #fff !important;
                         font-weight: 700 !important;
                         box-shadow: 0 2px 4px rgba(255, 64, 0, 0.2);
                    }
                    .time-picker-item[data-disabled="true"] {
                        opacity: 0.3 !important;
                        cursor: not-allowed !important;
                        background-color: transparent !important;
                        color: #9ca3af !important;
                    }
                `}
            </style>

            <div
                ref={containerRef}
                className={className}
                style={{ position: 'relative', display: 'inline-block', width: '100%' }}
            >
                <div
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '2px',
                        padding: '2px 0px',
                        border: 'none',
                        background: 'transparent',
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                        opacity: disabled ? 0.6 : 1,
                        height: 'auto',
                        minHeight: '28px',
                        width: '100%'
                    }}
                    onMouseEnter={(e) => !disabled && (e.currentTarget.style.color = '#ff4000')}
                    onMouseLeave={(e) => !disabled && (e.currentTarget.style.color = 'inherit')}
                >
                    <span style={{ 
                        fontSize: '13px', 
                        fontWeight: 600, 
                        color: '#1f2937',
                        fontFamily: "'Inter', sans-serif",
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        margin: 0,
                        lineHeight: 1,
                        whiteSpace: 'nowrap'
                    }}>
                        {hour.toString().padStart(2, '0')}:{minute.toString().padStart(2, '0')} 
                        <span style={{fontSize: '11px', color: '#ff4000', fontWeight: 700}}>{period}</span>
                    </span>
                    <ChevronDown size={12} color="#6b7280" />
                </div>

                {isOpen && (
                    <div
                        ref={dropdownRef}
                        style={{
                            position: 'absolute',
                            top: 'calc(100% + 8px)',
                            left: '0',
                            display: 'flex',
                            background: '#fff',
                            borderRadius: '16px',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                            zIndex: 9999,
                            overflow: 'hidden',
                            border: '1px solid #f3f4f6',
                            minWidth: '200px'
                        }}
                    >
                        {/* Hours */}
                        <div
                            ref={hourColumnRef}
                            className="time-picker-column"
                            style={{
                                height: '220px',
                                overflowY: 'scroll',
                                flex: 1,
                                borderRight: '1px solid #f9fafb',
                                padding: '8px 0',
                                background: '#fafafa'
                            }}
                        >
                            {hours.map((h) => (
                                <div
                                    key={h}
                                    data-selected={h === hour}
                                    data-disabled={isOptionDisabled('hour', h)}
                                    className="time-picker-item"
                                    onClick={() => handleSelect('hour', h)}
                                    style={{
                                        padding: '10px 0',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        color: '#4b5563',
                                        transition: 'all 0.1s',
                                        marginTop: '2px',
                                        marginBottom: '2px',
                                        borderRadius: '8px',
                                        margin: '4px 8px'
                                    }}
                                >
                                    {h.toString().padStart(2, '0')}
                                </div>
                            ))}
                        </div>

                        {/* Minutes */}
                        <div
                            ref={minuteColumnRef}
                            className="time-picker-column"
                            style={{
                                height: '220px',
                                overflowY: 'scroll',
                                flex: 1,
                                borderRight: '1px solid #f9fafb',
                                padding: '8px 0',
                                background: '#fafafa'
                            }}
                        >
                            {minutes.map((m) => (
                                <div
                                    key={m}
                                    data-selected={m === minute}
                                    data-disabled={isOptionDisabled('minute', m)}
                                    className="time-picker-item"
                                    onClick={() => handleSelect('minute', m)}
                                    style={{
                                        padding: '10px 0',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        color: '#4b5563',
                                        transition: 'all 0.1s',
                                        marginTop: '2px',
                                        marginBottom: '2px',
                                        borderRadius: '8px',
                                        margin: '4px 8px'
                                    }}
                                >
                                    {m.toString().padStart(2, '0')}
                                </div>
                            ))}
                        </div>

                        {/* AM/PM */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '60px',
                                padding: '8px',
                                gap: '8px',
                                justifyContent: 'center',
                                background: '#fff'
                            }}
                        >
                            {periods.map((p) => (
                                <div
                                    key={p}
                                    data-selected={p === period}
                                    data-disabled={isOptionDisabled('period', p)}
                                    onClick={() => handleSelect('period', p)}
                                    style={{
                                        padding: '12px 0',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        color: p === period ? '#fff' : '#ff4000',
                                        background: p === period 
                                            ? 'linear-gradient(135deg, #ff4000 0%, #ff6633 100%)' 
                                            : '#fff7ed',
                                        transition: 'all 0.2s',
                                        borderRadius: '10px',
                                        border: '1px solid #ffedd5',
                                        opacity: isOptionDisabled('period', p) ? 0.3 : 1,
                                        pointerEvents: isOptionDisabled('period', p) ? 'none' : 'auto'
                                    }}
                                >
                                    {p}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CustomTimePicker;
