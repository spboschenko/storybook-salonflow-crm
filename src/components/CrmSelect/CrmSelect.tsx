// src/components/CrmSelect/CrmSelect.tsx
import React from 'react';
import { Select, SelectProps } from 'antd';
import './CrmSelect.css';

export interface CrmSelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface CrmSelectProps extends Omit<SelectProps, 'options'> {
  /** Метка поля */
  label?: string;
  /** Опции для выбора */
  options: CrmSelectOption[];
  /** Текст ошибки */
  error?: string;
  /** Текст подсказки */
  helperText?: string;
  /** Обязательное поле */
  required?: boolean;
  /** Полная ширина */
  fullWidth?: boolean;
  /** Дополнительный CSS класс */
  className?: string;
}

/**
 * Базовый компонент выбора CRM системы
 * Расширяет стандартный Select AntD с дополнительной функциональностью
 */
export const CrmSelect: React.FC<CrmSelectProps> = ({
  label,
  options,
  error,
  helperText,
  required = false,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const selectClass = [
    'crm-select',
    error && 'crm-select--error',
    fullWidth && 'crm-select--full-width',
    className,
  ].filter(Boolean).join(' ');

  const selectId = props.id || `crm-select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="crm-select-wrapper">
      {label && (
        <label htmlFor={selectId} className="crm-select-label">
          {label}
          {required && <span className="crm-select-required">*</span>}
        </label>
      )}
      <Select
        id={selectId}
        className={selectClass}
        status={error ? 'error' : undefined}
        options={options}
        {...props}
      />
      {error && <div className="crm-select-error">{error}</div>}
      {helperText && !error && <div className="crm-select-helper">{helperText}</div>}
    </div>
  );
};