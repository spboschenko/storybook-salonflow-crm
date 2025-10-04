// src/components/Calendar/TimeSlot/TimeSlot.tsx
import React from 'react';
import { Typography } from 'antd';
import { CalendarSize, TimeSlot as TimeSlotType } from '../../../types';
import './TimeSlot.css';

const { Text } = Typography;

export interface TimeSlotProps {
  /** Данные временного слота */
  timeSlot: TimeSlotType;
  /** Размер компонента */
  size?: CalendarSize;
  /** Высота слота в пикселях */
  height?: number;
  /** Показывать ли время */
  showTime?: boolean;
  /** Выбран ли слот */
  isSelected?: boolean;
  /** Обработчик клика */
  onClick?: (timeSlot: TimeSlotType) => void;
  /** Обработчик наведения */
  onHover?: (timeSlot: TimeSlotType) => void;
  /** Кастомный класс */
  className?: string;
}

/**
 * TimeSlot - компонент временного слота для календаря
 * 
 * Отображает временной интервал с возможностью выбора и взаимодействия.
 * Используется в дневном и недельном видах календаря.
 */
export const TimeSlot: React.FC<TimeSlotProps> = ({
  timeSlot,
  size = 'standard',
  height = 60,
  showTime = false,
  isSelected = false,
  onClick,
  onHover,
  className
}) => {
  const handleClick = () => {
    onClick?.(timeSlot);
  };

  const handleMouseEnter = () => {
    onHover?.(timeSlot);
  };

  return (
    <div
      className={`
        crm-time-slot
        crm-time-slot--${size}
        ${!timeSlot.isWorkingHour ? 'crm-time-slot--non-working' : ''}
        ${!timeSlot.isAvailable ? 'crm-time-slot--unavailable' : ''}
        ${isSelected ? 'crm-time-slot--selected' : ''}
        ${className || ''}
      `}
      style={{ height: `${height}px` }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      {showTime && (
        <Text
          className="crm-time-slot__time"
          type={!timeSlot.isWorkingHour ? 'secondary' : undefined}
        >
          {timeSlot.startTime}
        </Text>
      )}
      
      {/* Индикатор доступности */}
      <div className="crm-time-slot__indicator" />
    </div>
  );
};