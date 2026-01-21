import React, { useState } from 'react';

/**
 * Tabs Component - TraceVenue Design System
 * 
 * @param {Array} tabs - Array of { id, label, content }
 * @param {string} defaultTab - ID of default active tab
 */

const Tabs = ({
    tabs = [],
    defaultTab,
    onChange,
    variant = 'default',
    className = '',
    ...props
}) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        onChange?.(tabId);
    };

    const variants = {
        default: {
            container: 'border-b border-[#e5e7eb] bg-[#fafafa]',
            tab: 'text-[#6b7280] hover:text-[#374151] hover:bg-[#f3f4f6]',
            activeTab: 'text-[#ff4000] font-semibold',
            indicator: 'bg-gradient-to-r from-[#f08e45] to-[#ee5763]',
        },
        pills: {
            container: 'gap-2 p-1 bg-[#f0f0f4] rounded-[30px]',
            tab: 'text-[#5c5f62] rounded-[25px]',
            activeTab: 'bg-white text-[#ff4000] shadow-sm',
            indicator: '',
        },
    };

    const style = variants[variant];

    return (
        <div className={className} {...props}>
            {/* Tab Headers */}
            <div className={`flex ${style.container}`}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`
                            flex-1 py-3 px-4 text-sm font-medium
                            transition-all duration-200 relative
                            ${style.tab}
                            ${activeTab === tab.id ? style.activeTab : ''}
                        `.replace(/\s+/g, ' ').trim()}
                    >
                        {tab.label}
                        {/* Indicator for default variant */}
                        {variant === 'default' && activeTab === tab.id && (
                            <span className={`absolute bottom-0 left-0 right-0 h-0.5 ${style.indicator} rounded-t`} />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="py-4">
                {tabs.find(tab => tab.id === activeTab)?.content}
            </div>
        </div>
    );
};

export default Tabs;
