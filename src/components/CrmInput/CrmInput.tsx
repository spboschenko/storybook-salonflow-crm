// src/components/CrmInput/CrmInput.tsx
import React from 'react';
import { Input, InputProps } from 'antd';
import './CrmInput.css';

export interface CrmInputProps extends InputProps {
  /** Метка поля */
  label?: string;
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
 * Базовый компонент поля ввода CRM системы
 * Расширяет стандартный Input AntD с дополнительной функциональностью
 */
export const CrmInput: React.FC<CrmInputProps> = ({
  label,
  error,
  helperText,
  required = false,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const inputClass = [
    'crm-input',
    error && 'crm-input--error',
    fullWidth && 'crm-input--full-width',
    className,
  ].filter(Boolean).join(' ');

  const inputId = props.id || `crm-input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="crm-input-wrapper">
      {label && (
        <label htmlFor={inputId} className="crm-input-label">
          {label}
          {required && <span className="crm-input-required">*</span>}
        </label>
      )}
      <Input
        id={inputId}
        className={inputClass}
        status={error ? 'error' : undefined}
        {...props}
      />
      {error && <div className="crm-input-error">{error}</div>}
      {helperText && !error && <div className="crm-input-helper">{helperText}</div>}
    </div>
  );
};