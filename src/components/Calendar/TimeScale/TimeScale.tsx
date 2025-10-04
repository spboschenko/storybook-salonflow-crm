// src/components/Calendar/TimeScale/TimeScale.tsx
import React from 'react';
import { Typography } from 'antd';
import { CalendarSize } from '../../../types';
import './TimeScale.css';

const { Text } = Typography;

export interface TimeScaleProps {
  /** Размер компонента */
  size?: CalendarSize;
  /** Начальное время (HH:mm) */
  startTime?: string;
  /** Конечное время (HH:mm) */
  endTime?: string;
  /** Продолжительность слота в минутах */
  slotDuration?: number;
  /** Высота одного слота в пикселях */
  slotHeight?: number;
  /** Формат времени */
  timeFormat?: '12h' | '24h';
  /** Показывать только основные часы */
  showMajorHours?: boolean;
  /** Обработчик клика на время */
  onTimeClick?: (time: string) => void;
  /** Кастомный класс */
  className?: string;
}

/**
 * TimeScale - компонент временной шкалы для календаря
 * 
 * Отображает временные метки слева от календарной сетки.
 * Поддерживает различные интервалы и форматы времени.
 */
export const TimeScale: React.FC<TimeScaleProps> = ({
  size = 'standard',
  startTime = '09:00',
  endTime = '18:00',
  slotDuration = 30,
  slotHeight = 60,
  timeFormat = '24h',
  showMajorHours = false,
  onTimeClick,
  className
}) => {
  const generateTimeSlots = () => {
    const slots: Array<{ time: string; isMajor: boolean }> = [];
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    let currentHour = startHour;
    let currentMinute = startMinute;
    
    while (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)) {
      const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
      const isMajor = currentMinute === 0;
      
      if (showMajorHours) {
        if (isMajor) {
          slots.push({ time: timeString, isMajor: true });
        }
      } else {
        slots.push({ time: timeString, isMajor });
      }
      
      currentMinute += showMajorHours ? 60 : slotDuration;
      
      if (currentMinute >= 60) {
        currentHour += Math.floor(currentMinute / 60);
        currentMinute = currentMinute % 60;
      }
    }
    
    return slots;
  };

  const formatTime = (time: string): string => {
    if (timeFormat === '12h') {
      const [hour, minute] = time.split(':').map(Number);
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
    }
    return time;
  };

  const handleTimeClick = (time: string) => {
    onTimeClick?.(time);
  };

  const timeSlots = generateTimeSlots();

  return (
    <div 
      className={`crm-time-scale crm-time-scale--${size} ${className || ''}`}
    >
      {timeSlots.map((slot, index) => (
        <div
          key={slot.time}
          className={`
            crm-time-scale__slot
            ${slot.isMajor ? 'crm-time-scale__slot--major' : 'crm-time-scale__slot--minor'}
          `}
          style={{ 
            height: showMajorHours ? 
              (slotHeight || 100) : 
              (slotHeight || 60)
          }}
          onClick={() => handleTimeClick(slot.time)}
        >
          <div className="crm-time-scale__time">
            <Text 
              className={`
                crm-time-scale__label
                ${slot.isMajor ? 'crm-time-scale__label--major' : 'crm-time-scale__label--minor'}
              `}
            >
              {formatTime(slot.time)}
            </Text>
          </div>
          
          {slot.isMajor && (
            <div className="crm-time-scale__line crm-time-scale__line--major" />
          )}
          
          {!slot.isMajor && (
            <div className="crm-time-scale__line crm-time-scale__line--minor" />
          )}
        </div>
      ))}
    </div>
  );
};