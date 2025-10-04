// src/components/TimeScale/TimeScale.tsx
import React, { useMemo } from 'react';
import { CalendarSize } from '../../types';
import './TimeScale.css';

export interface TimeScaleProps {
  /** Начало рабочего дня (в формате HH:mm) */
  startTime?: string;
  /** Конец рабочего дня (в формате HH:mm) */
  endTime?: string;
  /** Интервал временных слотов в минутах */
  slotDuration?: number;
  /** Высота одного слота в пикселях */
  slotHeight?: number;
  /** Размер компонента */
  size?: CalendarSize;
  /** Формат времени */
  timeFormat?: '12h' | '24h';
  /** Показывать только основные часы */
  showMajorHours?: boolean;
  /** Ширина временной шкалы */
  width?: number;
  /** Дополнительный CSS класс */
  className?: string;
  /** Обработчик клика на время */
  onTimeClick?: (time: string) => void;
}

export const TimeScale: React.FC<TimeScaleProps> = ({
  startTime = '09:00',
  endTime = '18:00',
  slotDuration = 15,
  slotHeight = 60,
  size = 'standard',
  timeFormat = '24h',
  showMajorHours = false,
  width = 80,
  className = '',
  onTimeClick
}) => {
  const timeSlots = useMemo(() => {
    const slots: Array<{
      time: string;
      displayTime: string;
      isMajorHour: boolean;
      isHalfHour: boolean;
    }> = [];

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    
    for (let minutes = startMinutes; minutes <= endMinutes; minutes += slotDuration) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;
      
      const time24 = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      let displayTime = time24;
      if (timeFormat === '12h') {
        const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const ampm = hour >= 12 ? 'PM' : 'AM';
        displayTime = `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
      }
      
      const isMajorHour = minute === 0;
      const isHalfHour = minute === 30;
      
      // В режиме "только основные часы" показываем только целые часы
      if (showMajorHours && !isMajorHour) {
        continue;
      }
      
      slots.push({
        time: time24,
        displayTime,
        isMajorHour,
        isHalfHour
      });
    }
    
    return slots;
  }, [startTime, endTime, slotDuration, timeFormat, showMajorHours]);

  const scaleClass = [
    'time-scale',
    `time-scale--${size}`,
    showMajorHours && 'time-scale--major-only',
    onTimeClick && 'time-scale--clickable',
    className
  ].filter(Boolean).join(' ');

  const scaleStyle: React.CSSProperties = {
    width: `${width}px`,
    minWidth: `${width}px`
  };

  const getSlotClass = (slot: typeof timeSlots[0]) => {
    return [
      'time-scale-slot',
      slot.isMajorHour && 'time-scale-slot--major',
      slot.isHalfHour && 'time-scale-slot--half',
      !slot.isMajorHour && !slot.isHalfHour && 'time-scale-slot--quarter'
    ].filter(Boolean).join(' ');
  };

  const getSlotStyle = (index: number): React.CSSProperties => ({
    height: `${slotHeight}px`,
    minHeight: `${slotHeight}px`
  });

  return (
    <div className={scaleClass} style={scaleStyle}>
      {timeSlots.map((slot, index) => (
        <div
          key={slot.time}
          className={getSlotClass(slot)}
          style={getSlotStyle(index)}
          onClick={() => onTimeClick?.(slot.time)}
          role={onTimeClick ? 'button' : undefined}
          tabIndex={onTimeClick ? 0 : undefined}
          data-time={slot.time}
        >
          <div className="time-scale-label">
            {slot.displayTime}
          </div>
          
          {/* Линия времени */}
          <div className="time-scale-line" />
        </div>
      ))}
    </div>
  );
};