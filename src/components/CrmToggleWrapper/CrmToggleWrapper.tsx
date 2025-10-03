// src/components/CrmToggleWrapper/CrmToggleWrapper.tsx
import React from 'react';
import { CrmCheckbox } from '../CrmCheckbox/CrmCheckbox';
import { CrmRadio } from '../CrmRadio/CrmRadio';
import { Radio } from 'antd';
import type { CrmCheckboxProps } from '../CrmCheckbox/CrmCheckbox';
import type { CrmRadioProps } from '../CrmRadio/CrmRadio';
import './CrmToggleWrapper.css';

export interface CrmToggleWrapperProps {
  /** Тип переключателя */
  type: 'checkbox' | 'radio';
  /** Вариант отображения */
  variant?: 'default' | 'button' | 'card';
  /** Размер компонента */
  size?: 'small' | 'medium' | 'large';
  /** Дополнительный CSS класс */
  className?: string;
  /** Пропсы для базового компонента */
  toggleProps: CrmCheckboxProps | CrmRadioProps;
}

/**
 * Универсальная обёртка для радио и чекбоксов
 * Предоставляет различные варианты отображения (default, button, card)
 */
export const CrmToggleWrapper: React.FC<CrmToggleWrapperProps> = ({
  type,
  variant = 'default',
  size = 'medium',
  className = '',
  toggleProps,
}) => {
  const wrapperClass = [
    'crm-toggle-wrapper',
    `crm-toggle-wrapper--${variant}`,
    `crm-toggle-wrapper--${size}`,
    `crm-toggle-wrapper--${type}`,
    className,
  ].filter(Boolean).join(' ');

  const renderToggle = () => {
    if (type === 'checkbox') {
      return (
        <CrmCheckbox
          {...(toggleProps as CrmCheckboxProps)}
          size={size}
        />
      );
    } else {
      return (
        <CrmRadio
          {...(toggleProps as CrmRadioProps)}
          size={size}
        />
      );
    }
  };

  return (
    <div className={wrapperClass}>
      {renderToggle()}
    </div>
  );
};

// Группы компонентов
export interface CrmToggleGroupProps {
  /** Тип переключателя */
  type: 'checkbox' | 'radio';
  /** Массив опций */
  options: Array<{
    label: React.ReactNode;
    value: string | number;
    description?: React.ReactNode;
    disabled?: boolean;
  }>;
  /** Выбранные значения (для checkbox) или выбранное значение (для radio) */
  value?: (string | number)[] | string | number;
  /** Callback при изменении */
  onChange?: (value: (string | number)[] | string | number) => void;
  /** Заголовок группы */
  title?: React.ReactNode;
  /** Текст ошибки */
  error?: string;
  /** Текст подсказки */
  helperText?: string;
  /** Направление расположения */
  direction?: 'horizontal' | 'vertical';
  /** Вариант отображения */
  variant?: 'default' | 'button' | 'card';
  /** Размер */
  size?: 'small' | 'medium' | 'large';
  /** Обязательное поле */
  required?: boolean;
  /** Отключить всю группу */
  disabled?: boolean;
  /** Дополнительный CSS класс */
  className?: string;
}

/**
 * Универсальная группа переключателей
 */
export const CrmToggleGroup: React.FC<CrmToggleGroupProps> = ({
  type,
  options,
  value,
  onChange,
  title,
  error,
  helperText,
  direction = 'vertical',
  variant = 'default',
  size = 'medium',
  required = false,
  disabled = false,
  className = '',
}) => {
  const groupClass = [
    'crm-toggle-group',
    `crm-toggle-group--${direction}`,
    `crm-toggle-group--${variant}`,
    error && 'crm-toggle-group--error',
    disabled && 'crm-toggle-group--disabled',
    className,
  ].filter(Boolean).join(' ');

  const handleCheckboxChange = (optionValue: string | number) => {
    if (!onChange || type !== 'checkbox') return;

    const currentValue = Array.isArray(value) ? value : [];
    const newValue = currentValue.includes(optionValue)
      ? currentValue.filter(v => v !== optionValue)
      : [...currentValue, optionValue];
    
    onChange(newValue);
  };

  const handleRadioChange = (optionValue: string | number) => {
    if (!onChange || type !== 'radio') return;
    onChange(optionValue);
  };

  const renderToggles = () => {
    if (type === 'radio') {
      return (
        <Radio.Group
          value={value}
          onChange={(e) => handleRadioChange(e.target.value)}
          className="crm-toggle-group__radio-group"
        >
          {options.map((option, index) => (
            <CrmToggleWrapper
              key={`${option.value}-${index}`}
              type="radio"
              variant={variant}
              size={size}
              toggleProps={{
                value: option.value,
                disabled: disabled || option.disabled,
                label: option.label,
                description: option.description,
              }}
            />
          ))}
        </Radio.Group>
      );
    } else {
      return options.map((option, index) => {
        const currentValue = Array.isArray(value) ? value : [];
        return (
          <CrmToggleWrapper
            key={`${option.value}-${index}`}
            type="checkbox"
            variant={variant}
            size={size}
            toggleProps={{
              checked: currentValue.includes(option.value),
              disabled: disabled || option.disabled,
              onChange: () => handleCheckboxChange(option.value),
              label: option.label,
              description: option.description,
            }}
          />
        );
      });
    }
  };

  return (
    <div className="crm-toggle-group-wrapper">
      {title && (
        <div className="crm-toggle-group-title">
          {title}
          {required && <span className="crm-toggle-group-required">*</span>}
        </div>
      )}
      <div className={groupClass}>
        {renderToggles()}
      </div>
      {error && <div className="crm-toggle-group-error">{error}</div>}
      {helperText && !error && <div className="crm-toggle-group-helper">{helperText}</div>}
    </div>
  );
};