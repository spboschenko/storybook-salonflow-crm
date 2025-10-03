// src/components/CrmCheckbox/CrmCheckbox.tsx
import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd/es/checkbox';
import './CrmCheckbox.css';

export interface CrmCheckboxProps extends Omit<CheckboxProps, 'size'> {
  /** Метка чекбокса */
  label?: React.ReactNode;
  /** Текст ошибки */
  error?: string;
  /** Текст подсказки */
  helperText?: string;
  /** Вариант отображения */
  variant?: 'default' | 'button' | 'card';
  /** Размер компонента */
  size?: 'small' | 'medium' | 'large';
  /** Дополнительный CSS класс */
  className?: string;
}

/**
 * Базовый компонент чекбокса CRM системы
 * Расширяет стандартный Checkbox AntD с дополнительной функциональностью
 */
export const CrmCheckbox: React.FC<CrmCheckboxProps> = ({
  label,
  error,
  helperText,
  variant = 'default',
  size = 'medium',
  className = '',
  children,
  ...props
}) => {
  const checkboxClass = [
    'crm-checkbox',
    `crm-checkbox--${variant}`,
    `crm-checkbox--${size}`,
    error && 'crm-checkbox--error',
    className,
  ].filter(Boolean).join(' ');

  const checkboxId = props.id || `crm-checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const checkboxContent = label || children;

  return (
    <div className="crm-checkbox-wrapper">
      <Checkbox
        id={checkboxId}
        className={checkboxClass}
        {...props}
      >
        {checkboxContent}
      </Checkbox>
      {error && <div className="crm-checkbox-error">{error}</div>}
      {helperText && !error && <div className="crm-checkbox-helper">{helperText}</div>}
    </div>
  );
};

// Компонент для группы чекбоксов
export interface CrmCheckboxGroupProps {
  /** Массив опций для чекбоксов */
  options: Array<{
    label: React.ReactNode;
    value: string | number;
    disabled?: boolean;
  }>;
  /** Выбранные значения */
  value?: (string | number)[];
  /** Callback при изменении выбранных значений */
  onChange?: (checkedValues: (string | number)[]) => void;
  /** Заголовок группы */
  title?: React.ReactNode;
  /** Текст ошибки для всей группы */
  error?: string;
  /** Текст подсказки для всей группы */
  helperText?: string;
  /** Направление расположения элементов */
  direction?: 'horizontal' | 'vertical';
  /** Отключить всю группу */
  disabled?: boolean;
  /** Дополнительный CSS класс */
  className?: string;
}

/**
 * Компонент группы чекбоксов
 */
export const CrmCheckboxGroup: React.FC<CrmCheckboxGroupProps> = ({
  options,
  value = [],
  onChange,
  title,
  error,
  helperText,
  direction = 'vertical',
  disabled = false,
  className = '',
}) => {
  const groupClass = [
    'crm-checkbox-group',
    `crm-checkbox-group--${direction}`,
    error && 'crm-checkbox-group--error',
    disabled && 'crm-checkbox-group--disabled',
    className,
  ].filter(Boolean).join(' ');

  const handleChange = (optionValue: string | number) => {
    if (!onChange) return;

    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    
    onChange(newValue);
  };

  return (
    <div className="crm-checkbox-group-wrapper">
      {title && <div className="crm-checkbox-group-title">{title}</div>}
      <div className={groupClass}>
        {options.map((option, index) => (
          <CrmCheckbox
            key={`${option.value}-${index}`}
            checked={value.includes(option.value)}
            disabled={disabled || option.disabled}
            onChange={() => handleChange(option.value)}
            label={option.label}
          />
        ))}
      </div>
      {error && <div className="crm-checkbox-group-error">{error}</div>}
      {helperText && !error && <div className="crm-checkbox-group-helper">{helperText}</div>}
    </div>
  );
};