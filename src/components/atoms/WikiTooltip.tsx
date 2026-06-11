import React, { useState } from 'react';
import classNames from 'classnames';

interface WikiTooltipProps {
    children: React.ReactNode;
    title: string;
    description: string;
    url: string;
}

export default function WikiTooltip({ children, title, description, url }: WikiTooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <span className="relative inline-block">
            <span
                className="underline decoration-dotted cursor-help text-primary"
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
                {children}
            </span>
            {isVisible && (
                <div
                    className={classNames(
                        'absolute',
                        'z-50',
                        'w-80',
                        'p-4',
                        'bg-white',
                        'border',
                        'border-gray-300',
                        'rounded-lg',
                        'shadow-xl',
                        'text-sm',
                        'left-1/2',
                        '-translate-x-1/2',
                        'bottom-full',
                        'mb-2',
                        'pointer-events-none'
                    )}
                    style={{
                        animation: 'fadeIn 0.2s ease-in'
                    }}
                >
                    <div className="font-bold text-base mb-2 text-gray-900">{title}</div>
                    <div className="text-gray-700 mb-3 leading-relaxed">{description}</div>
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-xs pointer-events-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        En savoir plus sur Wikipedia →
                    </a>
                    <div
                        className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
                        style={{
                            borderLeft: '8px solid transparent',
                            borderRight: '8px solid transparent',
                            borderTop: '8px solid white',
                            filter: 'drop-shadow(0 2px 1px rgba(0,0,0,0.1))'
                        }}
                    />
                </div>
            )}
        </span>
    );
}
