// src/components/CrmCheckbox/CrmCheckbox.tsx
import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd/es/checkbox';
import './CrmCheckbox.css';

export interface CrmCheckboxProps extends Omit<CheckboxProps, 'size'> {
  /** Метка чекбокса */
  label?: React.ReactNode;
  /** Текст описания */
  description?: React.ReactNode;
  /** Текст подсказки (алиас для description) */
  helperText?: React.ReactNode;
  /** Текст ошибки */
  error?: string;
  /** Размер компонента */
  size?: 'small' | 'medium' | 'large';
  /** Дополнительный CSS класс */
  className?: string;
}

/**
 * Тонкий базовый компонент чекбокса CRM системы
 * Использует CSS Grid 2x2 для размещения переключателя, label и description
 */
export const CrmCheckbox: React.FC<CrmCheckboxProps> = ({
  label,
  description,
  helperText,
  error,
  size = 'medium',
  className = '',
  children,
  ...props
}) => {
  const checkboxClass = [
    'crm-checkbox',
    `crm-checkbox--${size}`,
    error && 'crm-checkbox--error',
    className,
  ].filter(Boolean).join(' ');

  const checkboxId = props.id || `crm-checkbox-${Math.random().toString(36).substr(2, 9)}`;
  const displayLabel = label || children;
  const displayDescription = description || helperText;

  return (
    <div className="crm-checkbox-wrapper">
      <label className={checkboxClass} htmlFor={checkboxId}>
        <Checkbox
          id={checkboxId}
          className="crm-checkbox__input"
          {...props}
        />
        {displayLabel && (
          <span className="crm-checkbox__label">
            {displayLabel}
          </span>
        )}
        {displayDescription && (
          <span className="crm-checkbox__description">
            {displayDescription}
          </span>
        )}
      </label>
      {error && <div className="crm-checkbox-error">{error}</div>}
    </div>
  );
};