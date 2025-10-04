// src/components/Calendar/DayCell/DayCell.tsx
import React from 'react';
import { Typography, Badge, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CalendarSize, AppointmentWithRelations } from '../../../types';
import './DayCell.css';

const { Text } = Typography;

export interface DayCellProps {
  /** Дата ячейки */
  date: Date;
  /** Записи на этот день */
  appointments?: AppointmentWithRelations[];
  /** Размер компонента */
  size?: CalendarSize;
  /** Выбрана ли ячейка */
  isSelected?: boolean;
  /** Является ли дата сегодняшним днем */
  isToday?: boolean;
  /** Относится ли дата к текущему месяцу */
  isCurrentMonth?: boolean;
  /** Является ли день выходным */
  isWeekend?: boolean;
  /** Высота ячейки в пикселях */
  height?: number;
  /** Максимальное количество отображаемых записей */
  maxVisibleAppointments?: number;
  /** Показывать ли кнопку добавления записи */
  showAddButton?: boolean;
  /** Обработчик клика на ячейку */
  onClick?: (date: Date) => void;
  /** Обработчик двойного клика на ячейку */
  onDoubleClick?: (date: Date) => void;
  /** Обработчик клика на запись */
  onAppointmentClick?: (appointment: AppointmentWithRelations) => void;
  /** Обработчик клика на "добавить запись" */
  onAddAppointment?: (date: Date) => void;
  /** Обработчик клика на "показать еще" */
  onShowMore?: (date: Date, appointments: AppointmentWithRelations[]) => void;
  /** Кастомный класс */
  className?: string;
}

/**
 * DayCell - ячейка дня для месячного вида календаря
 * 
 * Отображает дату, индикаторы записей и поддерживает взаимодействие.
 * Используется в сетке месячного календаря.
 */
export const DayCell: React.FC<DayCellProps> = ({
  date,
  appointments = [],
  size = 'standard',
  isSelected = false,
  isToday = false,
  isCurrentMonth = true,
  isWeekend = false,
  height = 120,
  maxVisibleAppointments = 3,
  showAddButton = true,
  onClick,
  onDoubleClick,
  onAppointmentClick,
  onAddAppointment,
  onShowMore,
  className
}) => {
  const dayNumber = date.getDate();
  const visibleAppointments = appointments.slice(0, maxVisibleAppointments);
  const hiddenCount = Math.max(0, appointments.length - maxVisibleAppointments);

  const handleCellClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClick?.(date);
  };

  const handleCellDoubleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDoubleClick?.(date);
  };

  const handleAppointmentClick = (event: React.MouseEvent, appointment: AppointmentWithRelations) => {
    event.stopPropagation();
    onAppointmentClick?.(appointment);
  };

  const handleAddClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onAddAppointment?.(date);
  };

  const handleShowMoreClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onShowMore?.(date, appointments);
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getAppointmentStatusColor = (status: string): string => {
    const colors = {
      'scheduled': '#faad14',
      'confirmed': '#52c41a',
      'in-progress': '#1890ff',
      'completed': '#722ed1',
      'cancelled': '#ff4d4f',
      'no-show': '#ff7875'
    };
    return colors[status as keyof typeof colors] || '#d9d9d9';
  };

  return (
    <div
      className={`
        crm-day-cell
        crm-day-cell--${size}
        ${isSelected ? 'crm-day-cell--selected' : ''}
        ${isToday ? 'crm-day-cell--today' : ''}
        ${!isCurrentMonth ? 'crm-day-cell--other-month' : ''}
        ${isWeekend ? 'crm-day-cell--weekend' : ''}
        ${className || ''}
      `}
      style={{ height: `${height}px` }}
      onClick={handleCellClick}
      onDoubleClick={handleCellDoubleClick}
    >
      {/* Заголовок с датой */}
      <div className="crm-day-cell__header">
        <Text 
          className={`
            crm-day-cell__date
            ${isToday ? 'crm-day-cell__date--today' : ''}
          `}
          strong={isToday}
        >
          {dayNumber}
        </Text>

        {/* Индикатор количества записей */}
        {appointments.length > 0 && (
          <Badge 
            count={appointments.length}
            size="small"
            className="crm-day-cell__count"
            style={{ backgroundColor: '#1890ff' }}
          />
        )}
      </div>

      {/* Содержимое */}
      <div className="crm-day-cell__content">
        {/* Видимые записи */}
        <div className="crm-day-cell__appointments">
          {visibleAppointments.map((appointment, index) => (
            <div
              key={appointment.id}
              className="crm-day-cell__appointment"
              style={{
                borderLeft: `3px solid ${getAppointmentStatusColor(appointment.status)}`
              }}
              onClick={(e) => handleAppointmentClick(e, appointment)}
            >
              <Space size={2} className="crm-day-cell__appointment-content">
                <Text 
                  className="crm-day-cell__appointment-time"
                  type="secondary"
                >
                  {formatTime(appointment.startTime)}
                </Text>
                <Text 
                  className="crm-day-cell__appointment-client"
                  ellipsis
                >
                  {appointment.client ? (
                    size === 'compact' 
                      ? `${appointment.client.firstName?.[0] || ''}. ${appointment.client.lastName || appointment.client.name || ''}`
                      : `${appointment.client.firstName || ''} ${appointment.client.lastName || ''}`.trim() || appointment.client.name
                  ) : 'Неизвестный клиент'}
                </Text>
              </Space>
            </div>
          ))}
        </div>

        {/* Показать еще */}
        {hiddenCount > 0 && (
          <div 
            className="crm-day-cell__show-more"
            onClick={handleShowMoreClick}
          >
            <Text 
              type="secondary" 
              className="crm-day-cell__show-more-text"
            >
              +{hiddenCount} еще
            </Text>
          </div>
        )}

        {/* Кнопка добавления записи */}
        {showAddButton && appointments.length === 0 && (
          <div 
            className="crm-day-cell__add-button"
            onClick={handleAddClick}
          >
            <PlusOutlined className="crm-day-cell__add-icon" />
          </div>
        )}
      </div>

      {/* Быстрая кнопка добавления при наведении */}
      {showAddButton && appointments.length > 0 && (
        <div 
          className="crm-day-cell__quick-add"
          onClick={handleAddClick}
        >
          <PlusOutlined />
        </div>
      )}
    </div>
  );
};