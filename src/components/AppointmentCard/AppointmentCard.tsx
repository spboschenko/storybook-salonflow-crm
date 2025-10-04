// src/components/AppointmentCard/AppointmentCard.tsx
import React from 'react';
import { Badge, Tooltip } from 'antd';
import { ClockCircleOutlined, DollarOutlined, CarOutlined, UserOutlined } from '@ant-design/icons';
import { AppointmentWithRelations, CalendarSize } from '../../types';
import './AppointmentCard.css';

export interface AppointmentCardProps {
  /** Данные записи */
  appointment: AppointmentWithRelations;
  /** Размер карточки */
  size?: CalendarSize;
  /** Компактный режим (только основная информация) */
  compact?: boolean;
  /** Показывать цену */
  showPrice?: boolean;
  /** Показывать время в пути */
  showTravelTime?: boolean;
  /** Показывать статус */
  showStatus?: boolean;
  /** Карточка выбрана */
  isSelected?: boolean;
  /** Карточка в режиме редактирования */
  isEditing?: boolean;
  /** Карточка перетаскивается */
  isDragging?: boolean;
  /** Обработчик клика */
  onClick?: () => void;
  /** Обработчик двойного клика */
  onDoubleClick?: () => void;
  /** Обработчик начала перетаскивания */
  onDragStart?: (e: React.DragEvent) => void;
  /** Обработчик окончания перетаскивания */
  onDragEnd?: (e: React.DragEvent) => void;
  /** Дополнительный CSS класс */
  className?: string;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  size = 'standard',
  compact = false,
  showPrice = true,
  showTravelTime = false,
  showStatus = true,
  isSelected = false,
  isEditing = false,
  isDragging = false,
  onClick,
  onDoubleClick,
  onDragStart,
  onDragEnd,
  className = ''
}) => {
  const cardClass = [
    'appointment-card',
    `appointment-card--${size}`,
    `appointment-card--${appointment.status}`,
    `appointment-card--priority-${appointment.priority}`,
    compact && 'appointment-card--compact',
    isSelected && 'appointment-card--selected',
    isEditing && 'appointment-card--editing',
    isDragging && 'appointment-card--dragging',
    onClick && 'appointment-card--clickable',
    className
  ].filter(Boolean).join(' ');

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDuration = (start: Date, end: Date) => {
    const duration = Math.round((end.getTime() - start.getTime()) / (1000 * 60));
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    
    if (hours > 0) {
      return minutes > 0 ? `${hours}ч ${minutes}м` : `${hours}ч`;
    }
    return `${minutes}м`;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'scheduled': '#1890ff',
      'confirmed': '#52c41a',
      'in-progress': '#faad14',
      'completed': '#52c41a',
      'cancelled': '#f5222d',
      'no-show': '#ff7875'
    };
    return colors[status as keyof typeof colors] || '#1890ff';
  };

  const getPriorityIndicator = () => {
    if (appointment.priority === 'urgent') return '🔴';
    if (appointment.priority === 'high') return '🟡';
    return null;
  };

  // Стиль карточки с цветом услуги
  const cardStyle: React.CSSProperties = appointment.service?.color ? {
    borderLeftColor: appointment.service.color,
    borderLeftWidth: '4px',
    borderLeftStyle: 'solid'
  } : {};

  const timeContent = (
    <div className="appointment-card-time">
      <ClockCircleOutlined />
      <span>
        {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
      </span>
      {!compact && (
        <span className="appointment-card-duration">
          ({formatDuration(appointment.startTime, appointment.endTime)})
        </span>
      )}
    </div>
  );

  const clientContent = (
    <div className="appointment-card-client">
      <UserOutlined />
      <span className="client-name">
        {appointment.client.firstName} {appointment.client.lastName}
      </span>
      {!compact && appointment.pet?.name && (
        <span className="pet-name">({appointment.pet.name})</span>
      )}
    </div>
  );

  const serviceContent = (
    <div className="appointment-card-service">
      {appointment.service?.name || appointment.services?.[0]?.name}
    </div>
  );

  const priceContent = showPrice && appointment.price && (
    <div className="appointment-card-price">
      <DollarOutlined />
      <span>{appointment.price.toLocaleString('ru-RU')} ₽</span>
    </div>
  );

  const travelContent = showTravelTime && appointment.travelTime && appointment.travelTime > 0 && (
    <div className="appointment-card-travel">
      <CarOutlined />
      <span>{appointment.travelTime}м</span>
    </div>
  );

  const statusBadge = showStatus && (
    <Badge
      color={getStatusColor(appointment.status)}
      text={getStatusText(appointment.status)}
      size="small"
    />
  );

  const priorityIndicator = getPriorityIndicator();

  return (
    <div
      className={cardClass}
      style={cardStyle}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      draggable={!!onDragStart}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      data-appointment-id={appointment.id}
    >
      {/* Заголовок карточки */}
      <div className="appointment-card-header">
        {priorityIndicator && (
          <span className="appointment-card-priority">{priorityIndicator}</span>
        )}
        {timeContent}
        {statusBadge}
      </div>

      {/* Основной контент */}
      <div className="appointment-card-body">
        {clientContent}
        {!compact && serviceContent}
      </div>

      {/* Подвал карточки */}
      {!compact && (priceContent || travelContent) && (
        <div className="appointment-card-footer">
          {priceContent}
          {travelContent}
        </div>
      )}

      {/* Заметки */}
      {!compact && appointment.notes && (
        <Tooltip title={appointment.notes}>
          <div className="appointment-card-notes">
            💬 {appointment.notes.length > 20 ? 
              `${appointment.notes.substring(0, 20)}...` : 
              appointment.notes
            }
          </div>
        </Tooltip>
      )}

      {/* Overlay для режима редактирования */}
      {isEditing && (
        <div className="appointment-card-edit-overlay">
          <span>Редактирование...</span>
        </div>
      )}
    </div>
  );
};

// Вспомогательная функция для получения текста статуса
function getStatusText(status: string): string {
  const statusTexts = {
    'scheduled': 'Запланировано',
    'confirmed': 'Подтверждено',
    'in-progress': 'В процессе',
    'completed': 'Завершено',
    'cancelled': 'Отменено',
    'no-show': 'Не явился'
  };
  return statusTexts[status as keyof typeof statusTexts] || status;
}