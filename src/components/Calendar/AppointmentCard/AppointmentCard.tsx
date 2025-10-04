// src/components/Calendar/AppointmentCard/AppointmentCard.tsx
import React from 'react';
import { Card, Tag, Typography, Space, Badge } from 'antd';
import { 
  ClockCircleOutlined, 
  UserOutlined, 
  PhoneOutlined,
  DollarOutlined,
  CarOutlined,
  AlertOutlined
} from '@ant-design/icons';
import { CalendarSize, AppointmentWithRelations, AppointmentStatus, AppointmentPriority } from '../../../types';
import './AppointmentCard.css';

const { Text } = Typography;

export interface AppointmentCardProps {
  /** Запись с полной информацией */
  appointment: AppointmentWithRelations;
  /** Размер компонента */
  size?: CalendarSize;
  /** Компактный режим отображения */
  compact?: boolean;
  /** Выбрана ли карточка */
  isSelected?: boolean;
  /** Показывать ли время в пути */
  showTravelTime?: boolean;
  /** Показывать ли цену */
  showPrice?: boolean;
  /** Показывать ли телефон клиента */
  showPhone?: boolean;
  /** Можно ли перетаскивать */
  draggable?: boolean;
  /** Обработчик клика */
  onClick?: () => void;
  /** Обработчик двойного клика */
  onDoubleClick?: () => void;
  /** Обработчик окончания перетаскивания */
  onDragEnd?: (event: React.DragEvent) => void;
  /** Кастомный класс */
  className?: string;
}

/**
 * AppointmentCard - карточка записи для календаря
 * 
 * Отображает информацию о записи: клиент, питомец, услуга, время, статус.
 * Поддерживает разные размеры для различных видов календаря.
 */
export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  size = 'standard',
  compact = false,
  isSelected = false,
  showTravelTime = false,
  showPrice = true,
  showPhone = false,
  draggable = false,
  onClick,
  onDoubleClick,
  onDragEnd,
  className
}) => {
  const getStatusColor = (status: AppointmentStatus): string => {
    const colors: Record<AppointmentStatus, string> = {
      'pending': '#faad14',
      'unconfirmed': '#faad14',
      'confirmed': '#52c41a',
      'scheduled': '#52c41a',
      'checked-in': '#1890ff',
      'ready-for-pickup': '#722ed1',
      'checked-out': '#722ed1',
      'finished': '#722ed1',
      'cancelled': '#ff4d4f',
      'no-show': '#ff7875',
      'waitlisted': '#d9d9d9'
    };
    return colors[status] || '#d9d9d9';
  };

  const getStatusText = (status: AppointmentStatus): string => {
    const texts: Record<AppointmentStatus, string> = {
      'pending': 'Ожидает одобрения',
      'unconfirmed': 'Не подтверждена',
      'confirmed': 'Подтверждена',
      'scheduled': 'Запланирована',
      'checked-in': 'В процессе',
      'ready-for-pickup': 'Готов к выдаче',
      'checked-out': 'Выдан',
      'finished': 'Завершена',
      'cancelled': 'Отменена',
      'no-show': 'Не явился',
      'waitlisted': 'В листе ожидания'
    };
    return texts[status] || status;
  };

  const getPriorityIcon = (priority: AppointmentPriority) => {
    if (priority === 'high') {
      return <AlertOutlined style={{ color: '#ff4d4f' }} />;
    }
    return null;
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData('application/json', JSON.stringify(appointment));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Card
      className={`
        crm-appointment-card 
        crm-appointment-card--${size}
        ${compact ? 'crm-appointment-card--compact' : ''}
        ${isSelected ? 'crm-appointment-card--selected' : ''}
        ${className || ''}
      `}
      size="small"
      bodyStyle={{ 
        padding: size === 'compact' ? '8px' : '12px',
        cursor: onClick ? 'pointer' : 'default'
      }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      style={{
        borderLeft: `4px solid ${appointment.employee?.color || appointment.employees?.[0]?.color || '#9370DB'}`,
      }}
    >
      <div className="crm-appointment-card__content">
        {/* Заголовок с клиентом и статусом */}
        <div className="crm-appointment-card__header">
          <Space size="small" align="center">
            <UserOutlined />
            <Text strong ellipsis>
              {appointment.client 
                ? `${appointment.client.firstName || ''} ${appointment.client.lastName || ''}`.trim() || appointment.client.name
                : 'Неизвестный клиент'}
            </Text>
            {appointment.priority && getPriorityIcon(appointment.priority)}
          </Space>
          
          <Tag 
            color={getStatusColor(appointment.status)}
          >
            {getStatusText(appointment.status)}
          </Tag>
        </div>

        {/* Питомец */}
        <div className="crm-appointment-card__pet">
          <Text type="secondary" ellipsis>
            {appointment.pet?.name || appointment.pets?.[0]?.name} ({appointment.pet?.breed || appointment.pets?.[0]?.breed})
          </Text>
        </div>

        {/* Услуга */}
        <div className="crm-appointment-card__service">
          <Text ellipsis>
            {appointment.service?.name || appointment.services?.[0]?.name}
          </Text>
        </div>

        {/* Время */}
        <div className="crm-appointment-card__time">
          <Space size="small">
            <ClockCircleOutlined />
            <Text>
              {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
            </Text>
          </Space>
        </div>

        {/* Дополнительная информация */}
        {!compact && (
          <div className="crm-appointment-card__details">
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              
              {/* Цена */}
              {showPrice && appointment.price && (
                <Space size="small">
                  <DollarOutlined />
                  <Text>{formatPrice(appointment.price)}</Text>
                </Space>
              )}

              {/* Телефон */}
              {showPhone && appointment.client?.phone && (
                <Space size="small">
                  <PhoneOutlined />
                  <Text>{appointment.client.phone}</Text>
                </Space>
              )}

              {/* Время в пути */}
              {showTravelTime && appointment.travelTime && appointment.travelTime > 0 && (
                <Space size="small">
                  <CarOutlined />
                  <Text type="secondary">
                    +{appointment.travelTime} мин в пути
                  </Text>
                </Space>
              )}

              {/* Заметки */}
              {appointment.notes && (
                <Text type="secondary" ellipsis>
                  {appointment.notes}
                </Text>
              )}
            </Space>
          </div>
        )}

        {/* Индикатор напоминания */}
        {appointment.reminderSent && (
          <Badge 
            status="success" 
            text="Напоминание отправлено"
            className="crm-appointment-card__reminder"
          />
        )}
      </div>
    </Card>
  );
};