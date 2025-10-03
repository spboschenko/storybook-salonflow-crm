// src/components/CrmRadio/CrmRadio.tsx
import React from 'react';
import { Radio } from 'antd';
import type { RadioProps } from 'antd/es/radio';
import './CrmRadio.css';

export interface CrmRadioProps extends Omit<RadioProps, 'size'> {
  /** Метка радиокнопки */
  label?: React.ReactNode;
  /** Текст описания */
  description?: React.ReactNode;
  /** Размер компонента */
  size?: 'small' | 'medium' | 'large';
  /** Дополнительный CSS класс */
  className?: string;
}

/**
 * Тонкий базовый компонент радиокнопки CRM системы
 * Использует CSS Grid 2x2 для размещения переключателя, label и description
 */
export const CrmRadio: React.FC<CrmRadioProps> = ({
  label,
  description,
  size = 'medium',
  className = '',
  children,
  ...props
}) => {
  const radioClass = [
    'crm-radio',
    `crm-radio--${size}`,
    className,
  ].filter(Boolean).join(' ');

  const radioId = props.id || `crm-radio-${Math.random().toString(36).substr(2, 9)}`;
  const displayLabel = label || children;

  return (
    <label className={radioClass} htmlFor={radioId}>
      <Radio
        id={radioId}
        className="crm-radio__input"
        {...props}
      />
      {displayLabel && (
        <span className="crm-radio__label">
          {displayLabel}
        </span>
      )}
      {description && (
        <span className="crm-radio__description">
          {description}
        </span>
      )}
    </label>
  );
};