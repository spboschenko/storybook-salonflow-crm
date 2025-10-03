// src/components/CrmRadio/CrmRadio.tsx
import React from 'react';
import { Radio } from 'antd';
import type { RadioProps, RadioGroupProps } from 'antd/es/radio';
import './CrmRadio.css';

export interface CrmRadioProps extends Omit<RadioProps, 'size'> {
  /** Метка радиокнопки */
  label?: React.ReactNode;
  /** Текст описания */
  description?: React.ReactNode;
  /** Вариант отображения */
  variant?: 'default' | 'button' | 'card';
  /** Размер компонента */
  size?: 'small' | 'medium' | 'large';
  /** Дополнительный CSS класс */
  className?: string;
}

/**
 * Базовый компонент радиокнопки CRM системы
 * Расширяет стандартный Radio AntD с дополнительной функциональностью
 */
export const CrmRadio: React.FC<CrmRadioProps> = ({
  label,
  description,
  variant = 'default',
  size = 'medium',
  className = '',
  children,
  ...props
}) => {
  const radioClass = [
    'crm-radio',
    `crm-radio--${variant}`,
    `crm-radio--${size}`,
    className,
  ].filter(Boolean).join(' ');

  const radioId = props.id || `crm-radio-${Math.random().toString(36).substr(2, 9)}`;

  const radioContent = (
    <div className="crm-radio-content">
      <div className="crm-radio-label">{label || children}</div>
      {description && <div className="crm-radio-description">{description}</div>}
    </div>
  );

  return (
    <Radio
      id={radioId}
      className={radioClass}
      {...props}
    >
      {radioContent}
    </Radio>
  );
};

// Компонент для группы радиокнопок
export interface CrmRadioGroupProps extends Omit<RadioGroupProps, 'size'> {
  /** Массив опций для радиокнопок */
  options?: Array<{
    label: React.ReactNode;
    value: string | number;
    description?: React.ReactNode;
    disabled?: boolean;
  }>;
  /** Заголовок группы */
  title?: React.ReactNode;
  /** Текст ошибки для всей группы */
  error?: string;
  /** Текст подсказки для всей группы */
  helperText?: string;
  /** Направление расположения элементов */
  direction?: 'horizontal' | 'vertical';
  /** Вариант отображения всех элементов */
  variant?: 'default' | 'button' | 'card';
  /** Размер всех элементов */
  size?: 'small' | 'medium' | 'large';
  /** Обязательное поле */
  required?: boolean;
  /** Дополнительный CSS класс */
  className?: string;
}

/**
 * Компонент группы радиокнопок
 */
export const CrmRadioGroup: React.FC<CrmRadioGroupProps> = ({
  options = [],
  title,
  error,
  helperText,
  direction = 'vertical',
  variant = 'default',
  size = 'medium',
  required = false,
  className = '',
  children,
  ...props
}) => {
  const groupClass = [
    'crm-radio-group',
    `crm-radio-group--${direction}`,
    `crm-radio-group--${variant}`,
    error && 'crm-radio-group--error',
    props.disabled && 'crm-radio-group--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className="crm-radio-group-wrapper">
      {title && (
        <div className="crm-radio-group-title">
          {title}
          {required && <span className="crm-radio-group-required">*</span>}
        </div>
      )}
      <Radio.Group
        className={groupClass}
        {...props}
      >
        {options.length > 0 ? (
          options.map((option, index) => (
            <CrmRadio
              key={`${option.value}-${index}`}
              value={option.value}
              disabled={props.disabled || option.disabled}
              variant={variant}
              size={size}
              label={option.label}
              description={option.description}
            />
          ))
        ) : (
          children
        )}
      </Radio.Group>
      {error && <div className="crm-radio-group-error">{error}</div>}
      {helperText && !error && <div className="crm-radio-group-helper">{helperText}</div>}
    </div>
  );
};