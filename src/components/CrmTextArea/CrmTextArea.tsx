// src/components/CrmTextArea/CrmTextArea.tsx
import React from 'react';
import { Input } from 'antd';
import type { TextAreaProps } from 'antd/es/input';
import './CrmTextArea.css';

const { TextArea } = Input;

export interface CrmTextAreaProps extends Omit<TextAreaProps, 'size'> {
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
  /** Количество строк */
  rows?: number;
  /** Автоматическое изменение размера */
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  /** Дополнительный CSS класс */
  className?: string;
}

/**
 * Базовый компонент текстовой области CRM системы
 * Расширяет стандартный TextArea AntD с дополнительной функциональностью
 */
export const CrmTextArea: React.FC<CrmTextAreaProps> = ({
  label,
  error,
  helperText,
  required = false,
  fullWidth = true,
  rows = 4,
  autoSize = false,
  className = '',
  ...props
}) => {
  const textAreaClass = [
    'crm-textarea',
    error && 'crm-textarea--error',
    fullWidth && 'crm-textarea--full-width',
    className,
  ].filter(Boolean).join(' ');

  const textAreaId = props.id || `crm-textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="crm-textarea-wrapper">
      {label && (
        <label htmlFor={textAreaId} className="crm-textarea-label">
          {label}
          {required && <span className="crm-textarea-required">*</span>}
        </label>
      )}
      <TextArea
        id={textAreaId}
        className={textAreaClass}
        status={error ? 'error' : undefined}
        rows={rows}
        autoSize={autoSize}
        {...props}
      />
      {error && <div className="crm-textarea-error">{error}</div>}
      {helperText && !error && <div className="crm-textarea-helper">{helperText}</div>}
    </div>
  );
};