import React from 'react';

/**
 * Avatar Component - TraceVenue Design System
 */

const Avatar = ({
    src,
    alt = '',
    name,
    size = 'md',
    className = '',
    ...props
}) => {
    const sizes = {
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-14 h-14 text-lg',
        xl: 'w-20 h-20 text-2xl',
    };

    const getInitials = (name) => {
        if (!name) return '?';
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const baseStyles = `
        rounded-full flex items-center justify-center
        font-semibold overflow-hidden
        border border-[#d7d9da]
    `;

    if (src) {
        return (
            <img
                src={src}
                alt={alt || name || 'Avatar'}
                className={`${sizes[size]} ${baseStyles} object-cover ${className}`.replace(/\s+/g, ' ').trim()}
                {...props}
            />
        );
    }

    return (
        <div
            className={`
                ${sizes[size]} ${baseStyles}
                bg-gradient-to-br from-[#f08e45] to-[#ee5763] text-white
                ${className}
            `.replace(/\s+/g, ' ').trim()}
            {...props}
        >
            {getInitials(name)}
        </div>
    );
};

/**
 * Avatar Group
 */
Avatar.Group = ({ children, max = 4, className = '' }) => {
    const avatars = React.Children.toArray(children);
    const visible = avatars.slice(0, max);
    const remaining = avatars.length - max;

    return (
        <div className={`flex -space-x-2 ${className}`}>
            {visible.map((avatar, i) => (
                <div key={i} className="relative ring-2 ring-white rounded-full">
                    {avatar}
                </div>
            ))}
            {remaining > 0 && (
                <div className="relative ring-2 ring-white rounded-full">
                    <Avatar name={`+${remaining}`} />
                </div>
            )}
        </div>
    );
};

export default Avatar;
