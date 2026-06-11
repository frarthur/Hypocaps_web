import * as React from 'react';
import classNames from 'classnames';

import { iconMap } from '../../../svgs';
import type { SubmitButtonProps } from '../../../../types/stackbit';

export default function SubmitButtonFormControl(props: SubmitButtonProps) {
    const { elementId, className, label, showIcon, icon, iconPosition = 'right', style = 'primary', disabled } = props;
    const IconComponent = icon ? iconMap[icon] : null;
    const fieldPath = props['data-sb-field-path'];
    const annotations = fieldPath ? { 'data-sb-field-path': [fieldPath, `${fieldPath}.elementId#@id`].join(' ').trim() } : {};

    return (
        <button
            type="submit"
            id={elementId}
            disabled={disabled}
            className={classNames(
                'sb-component',
                'sb-component-block',
                'sb-component-button',
                {
                    'sb-component-button-primary': style === 'primary',
                    'sb-component-button-secondary': style === 'secondary',
                    'cursor-not-allowed opacity-60': disabled
                },
                className
            )}
            {...annotations}
        >
            {disabled && (
                <svg className="mr-2 inline h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            )}
            {label && <span {...(fieldPath && { 'data-sb-field-path': '.label' })}>{label}</span>}
            {showIcon && IconComponent && (
                <IconComponent
                    className={classNames('shrink-0', 'fill-current', 'w-[1.25em]', 'h-[1.25em]', {
                        'order-first': iconPosition === 'left',
                        'mr-[0.5em]': label && iconPosition === 'left',
                        'ml-[0.5em]': label && iconPosition === 'right'
                    })}
                    {...(fieldPath && { 'data-sb-field-path': '.icon' })}
                />
            )}
        </button>
    );
}
