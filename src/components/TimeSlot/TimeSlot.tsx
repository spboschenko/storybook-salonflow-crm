// src/components/TimeSlot/TimeSlot.tsx
import React from 'react';
import { TimeSlot as TimeSlotType } from '../../types';
import './TimeSlot.css';

export interface TimeSlotProps {
  /** Данные временного слота */
  timeSlot: TimeSlotType;
  /** Размер компонента */
  size?: 'compact' | 'standard' | 'comfortable';
  /** Высота слота в пикселях */
  height?: number;
  /** Показывать время в слоте */
  showTime?: boolean;
  /** Слот выбран */
  isSelected?: boolean;
  /** Слот в фокусе */
  isFocused?: boolean;
  /** Обработчик клика */
  onClick?: () => void;
  /** Обработчик двойного клика */
  onDoubleClick?: () => void;
  /** Обработчик наведения */
  onMouseEnter?: () => void;
  /** Обработчик ухода курсора */
  onMouseLeave?: () => void;
  /** Дополнительный CSS класс */
  className?: string;
  /** Дочерние элементы (например, карточки записей) */
  children?: React.ReactNode;
}

export const TimeSlot: React.FC<TimeSlotProps> = ({
  timeSlot,
  size = 'standard',
  height = 60,
  showTime = false,
  isSelected = false,
  isFocused = false,
  onClick,
  onDoubleClick,
  onMouseEnter,
  onMouseLeave,
  className = '',
  children
}) => {
  const slotClass = [
    'time-slot',
    `time-slot--${size}`,
    timeSlot.isWorkingHour && 'time-slot--working',
    timeSlot.isAvailable && 'time-slot--available',
    !timeSlot.isAvailable && 'time-slot--unavailable',
    isSelected && 'time-slot--selected',
    isFocused && 'time-slot--focused',
    onClick && 'time-slot--clickable',
    className
  ].filter(Boolean).join(' ');

  const slotStyle: React.CSSProperties = {
    height: `${height}px`,
    minHeight: `${height}px`
  };

  const formatTime = (time: string) => {
    // Преобразуем "HH:mm" в читаемый формат
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };

  return (
    <div
      className={slotClass}
      style={slotStyle}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      data-time-start={timeSlot.startTime}
      data-time-end={timeSlot.endTime}
    >
      {showTime && (
        <div className="time-slot-time">
          {formatTime(timeSlot.startTime)}
        </div>
      )}
      
      <div className="time-slot-content">
        {children}
      </div>
      
      {!timeSlot.isAvailable && (
        <div className="time-slot-overlay">
          <span className="time-slot-unavailable-text">Недоступно</span>
        </div>
      )}
    </div>
  );
};