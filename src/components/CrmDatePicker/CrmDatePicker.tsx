// src/components/CrmDatePicker/CrmDatePicker.tsx
import React from 'react';
import { DatePicker, TimePicker } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import type { TimePickerProps } from 'antd/es/time-picker';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import './CrmDatePicker.css';

// Устанавливаем русскую локаль по умолчанию
dayjs.locale('ru');

const { RangePicker } = DatePicker;

export interface CrmDatePickerProps extends Omit<DatePickerProps, 'size'> {
  /** Метка поля */
  label?: React.ReactNode;
  /** Текст ошибки */
  error?: string;
  /** Текст подсказки */
  helperText?: string;
  /** Обязательное поле */
  required?: boolean;
  /** Полная ширина */
  fullWidth?: boolean;
  /** Размер компонента */
  size?: 'small' | 'medium' | 'large';
  /** Дополнительный CSS класс */
  className?: string;
}

/**
 * Базовый компонент выбора даты CRM системы
 * Расширяет стандартный DatePicker AntD с дополнительной функциональностью
 */
export const CrmDatePicker: React.FC<CrmDatePickerProps> = ({
  label,
  error,
  helperText,
  required = false,
  fullWidth = true,
  size = 'medium',
  className = '',
  ...props
}) => {
  const datePickerClass = [
    'crm-datepicker',
    `crm-datepicker--${size}`,
    error && 'crm-datepicker--error',
    fullWidth && 'crm-datepicker--full-width',
    className,
  ].filter(Boolean).join(' ');

  const datePickerId = props.id || `crm-datepicker-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="crm-datepicker-wrapper">
      {label && (
        <label htmlFor={datePickerId} className="crm-datepicker-label">
          {label}
          {required && <span className="crm-datepicker-required">*</span>}
        </label>
      )}
      <DatePicker
        id={datePickerId}
        className={datePickerClass}
        status={error ? 'error' : undefined}
        placeholder="Выберите дату"
        {...props}
      />
      {error && <div className="crm-datepicker-error">{error}</div>}
      {helperText && !error && <div className="crm-datepicker-helper">{helperText}</div>}
    </div>
  );
};

// Компонент для выбора диапазона дат
export interface CrmDateRangePickerProps extends Omit<RangePickerProps, 'size'> {
  /** Метка поля */
  label?: React.ReactNode;
  /** Текст ошибки */
  error?: string;
  /** Текст подсказки */
  helperText?: string;
  /** Обязательное поле */
  required?: boolean;
  /** Полная ширина */
  fullWidth?: boolean;
  /** Размер компонента */
  size?: 'small' | 'medium' | 'large';
  /** Дополнительный CSS класс */
  className?: string;
}

/**
 * Компонент выбора диапазона дат
 */
export const CrmDateRangePicker: React.FC<CrmDateRangePickerProps> = ({
  label,
  error,
  helperText,
  required = false,
  fullWidth = true,
  size = 'medium',
  className = '',
  ...props
}) => {
  const rangePickerClass = [
    'crm-daterangepicker',
    `crm-daterangepicker--${size}`,
    error && 'crm-daterangepicker--error',
    fullWidth && 'crm-daterangepicker--full-width',
    className,
  ].filter(Boolean).join(' ');

  const rangePickerId = `crm-daterangepicker-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="crm-daterangepicker-wrapper">
      {label && (
        <label className="crm-daterangepicker-label">
          {label}
          {required && <span className="crm-daterangepicker-required">*</span>}
        </label>
      )}
      <RangePicker
        id={rangePickerId}
        className={rangePickerClass}
        status={error ? 'error' : undefined}
        placeholder={['Дата начала', 'Дата окончания']}
        {...props}
      />
      {error && <div className="crm-daterangepicker-error">{error}</div>}
      {helperText && !error && <div className="crm-daterangepicker-helper">{helperText}</div>}
    </div>
  );
};

// Компонент для выбора времени
export interface CrmTimePickerProps extends Omit<TimePickerProps, 'size'> {
  /** Метка поля */
  label?: React.ReactNode;
  /** Текст ошибки */
  error?: string;
  /** Текст подсказки */
  helperText?: string;
  /** Обязательное поле */
  required?: boolean;
  /** Полная ширина */
  fullWidth?: boolean;
  /** Размер компонента */
  size?: 'small' | 'medium' | 'large';
  /** Дополнительный CSS класс */
  className?: string;
}

/**
 * Компонент выбора времени
 */
export const CrmTimePicker: React.FC<CrmTimePickerProps> = ({
  label,
  error,
  helperText,
  required = false,
  fullWidth = true,
  size = 'medium',
  className = '',
  ...props
}) => {
  const timePickerClass = [
    'crm-timepicker',
    `crm-timepicker--${size}`,
    error && 'crm-timepicker--error',
    fullWidth && 'crm-timepicker--full-width',
    className,
  ].filter(Boolean).join(' ');

  const timePickerId = props.id || `crm-timepicker-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="crm-timepicker-wrapper">
      {label && (
        <label htmlFor={timePickerId} className="crm-timepicker-label">
          {label}
          {required && <span className="crm-timepicker-required">*</span>}
        </label>
      )}
      <TimePicker
        id={timePickerId}
        className={timePickerClass}
        status={error ? 'error' : undefined}
        placeholder="Выберите время"
        {...props}
      />
      {error && <div className="crm-timepicker-error">{error}</div>}
      {helperText && !error && <div className="crm-timepicker-helper">{helperText}</div>}
    </div>
  );
};