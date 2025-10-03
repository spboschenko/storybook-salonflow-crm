// src/components/CrmButton/CrmButton.tsx
import React from 'react';
import { Button, ButtonProps } from 'antd';
import './CrmButton.css';

export interface CrmButtonProps extends Omit<ButtonProps, 'type' | 'variant'> {
  /** Вариант кнопки */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'link';
  /** Размер кнопки */
  size?: 'small' | 'middle' | 'large';
  /** Полная ширина */
  fullWidth?: boolean;
  /** Дополнительный CSS класс */
  className?: string;
}

/**
 * Базовый компонент кнопки CRM системы
 * Расширяет стандартную кнопку AntD с кастомными вариантами для SalonFlow
 */
export const CrmButton: React.FC<CrmButtonProps> = ({
  variant = 'primary',
  size = 'middle',
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const getButtonType = (): ButtonProps['type'] => {
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'default';
      case 'ghost':
        return undefined;
      case 'link':
        return 'link';
      default:
        return 'default';
    }
  };

  const buttonClass = [
    'crm-button',
    `crm-button--${variant}`,
    fullWidth && 'crm-button--full-width',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Button
      type={getButtonType()}
      size={size}
      className={buttonClass}
      {...props}
    >
      {children}
    </Button>
  );
};