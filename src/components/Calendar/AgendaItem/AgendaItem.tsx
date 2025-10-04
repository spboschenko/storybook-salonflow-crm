// src/components/Calendar/AgendaItem/AgendaItem.tsx
import React from 'react';
import { Card, Typography, Space, Tag, Avatar, Tooltip, Button } from 'antd';
import { 
  ClockCircleOutlined, 
  UserOutlined, 
  HeartOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  CarOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { CalendarSize, AppointmentWithRelations, AppointmentStatus, AppointmentPriority } from '../../../types';
import './AgendaItem.css';

const { Text, Title } = Typography;

export interface AgendaItemProps {
  /** Запись с полной информацией */
  appointment: AppointmentWithRelations;
  /** Размер компонента */
  size?: CalendarSize;
  /** Показывать ли действия */
  showActions?: boolean;
  /** Показывать ли детальную информацию */
  showDetails?: boolean;
  /** Показывать ли дату */
  showDate?: boolean;
  /** Выбран ли элемент */
  isSelected?: boolean;
  /** Обработчик клика */
  onClick?: () => void;
  /** Обработчик редактирования */
  onEdit?: () => void;
  /** Обработчик удаления */
  onDelete?: () => void;
  /** Обработчик подтверждения */
  onConfirm?: () => void;
  /** Обработчик отмены */
  onCancel?: () => void;
  /** Обработчик звонка клиенту */
  onCall?: (phone: string) => void;
  /** Кастомный класс */
  className?: string;
}

/**
 * AgendaItem - элемент списка для вида "Повестка дня"
 * 
 * Отображает полную информацию о записи в виде карточки списка.
 * Используется в агенда-виде календаря для детального просмотра записей.
 */
export const AgendaItem: React.FC<AgendaItemProps> = ({
  appointment,
  size = 'standard',
  showActions = true,
  showDetails = true,
  showDate = true,
  isSelected = false,
  onClick,
  onEdit,
  onDelete,
  onConfirm,
  onCancel,
  onCall,
  className
}) => {
  const getStatusColor = (status: AppointmentStatus): string => {
    const colors: Record<AppointmentStatus, string> = {
      'pending': '#faad14',
      'unconfirmed': '#faad14',
      'confirmed': '#52c41a',
      'scheduled': '#52c41a',
      'checked-in': '#1890ff',
      'in-progress': '#1890ff',
      'ready-for-pickup': '#722ed1',
      'checked-out': '#722ed1',
      'completed': '#722ed1',
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
      'checked-in': 'Клиент прибыл',
      'in-progress': 'В процессе',
      'ready-for-pickup': 'Готов к выдаче',
      'checked-out': 'Выдан',
      'completed': 'Завершена',
      'finished': 'Завершена',
      'cancelled': 'Отменена',
      'no-show': 'Не явился',
      'waitlisted': 'В листе ожидания'
    };
    return texts[status] || status;
  };

  const getPriorityIcon = (priority: AppointmentPriority) => {
    if (priority === 'high') {
      return <Tooltip title="Высокий приоритет"><HeartOutlined style={{ color: '#ff4d4f' }} /></Tooltip>;
    }
    return null;
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price?: number): string => {
    if (!price) return '';
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getDuration = (): string => {
    const diffMs = appointment.endTime.getTime() - appointment.startTime.getTime();
    const minutes = Math.round(diffMs / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return remainingMinutes > 0 
        ? `${hours} ч ${remainingMinutes} мин`
        : `${hours} ч`;
    }
    return `${minutes} мин`;
  };

  const handleCallClick = () => {
    if (appointment.client.phone) {
      onCall?.(appointment.client.phone);
    }
  };

  return (
    <Card
      className={`
        crm-agenda-item 
        crm-agenda-item--${size}
        ${isSelected ? 'crm-agenda-item--selected' : ''}
        ${className || ''}
      `}
      size={size === 'compact' ? 'small' : 'default'}
      bodyStyle={{ 
        padding: size === 'compact' ? '12px' : '16px'
      }}
      onClick={onClick}
      style={{
        borderLeft: `4px solid ${appointment.employee?.color || appointment.employees?.[0]?.color || '#9370DB'}`,
      }}
    >
      <div className="crm-agenda-item__content">
        {/* Заголовок */}
        <div className="crm-agenda-item__header">
          <div className="crm-agenda-item__title-section">
            {showDate && (
              <Text type="secondary" className="crm-agenda-item__date">
                {formatDate(appointment.startTime)}
              </Text>
            )}
            
            <Space align="center" size="small">
              <Title 
                level={size === 'compact' ? 5 : 4} 
                className="crm-agenda-item__title"
                style={{ margin: 0 }}
              >
                {appointment.service?.name || appointment.services?.[0]?.name}
              </Title>
              {getPriorityIcon(appointment.priority)}
            </Space>
          </div>

          <div className="crm-agenda-item__status-section">
            <Tag 
              color={getStatusColor(appointment.status)}
              className="crm-agenda-item__status"
            >
              {getStatusText(appointment.status)}
            </Tag>
          </div>
        </div>

        {/* Основная информация */}
        <div className="crm-agenda-item__main">
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            
            {/* Время и продолжительность */}
            <Space size="large">
              <Space size="small">
                <ClockCircleOutlined />
                <Text strong>
                  {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                </Text>
                <Text type="secondary">({getDuration()})</Text>
              </Space>

              {appointment.price && (
                <Space size="small">
                  <DollarOutlined />
                  <Text strong>{formatPrice(appointment.price)}</Text>
                </Space>
              )}
            </Space>

            {/* Клиент и питомец */}
            <div className="crm-agenda-item__client-section">
              <Space size="middle" align="start">
                <div className="crm-agenda-item__client">
                  <Space size="small" align="center">
                    <Avatar 
                      size={size === 'compact' ? 'small' : 'default'}
                      icon={<UserOutlined />}
                      style={{ backgroundColor: '#1890ff' }}
                    />
                    <div>
                      <Text strong>
                        {appointment.client.firstName} {appointment.client.lastName}
                      </Text>
                      <br />
                      <Space size="small">
                        <PhoneOutlined />
                        <Text 
                          type="secondary"
                          className="crm-agenda-item__phone"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCallClick();
                          }}
                        >
                          {appointment.client.phone}
                        </Text>
                      </Space>
                    </div>
                  </Space>
                </div>

                <div className="crm-agenda-item__pet">
                  <Space size="small" align="center">
                    <HeartOutlined style={{ color: '#ff4d4f' }} />
                    <div>
                      <Text strong>{appointment.pet?.name || appointment.pets?.[0]?.name}</Text>
                      <br />
                      <Text type="secondary">
                        {appointment.pet?.breed || appointment.pets?.[0]?.breed} • {appointment.pet?.age || appointment.pets?.[0]?.age} лет
                      </Text>
                    </div>
                  </Space>
                </div>
              </Space>
            </div>

            {/* Сотрудник */}
            <Space size="small">
              <Avatar 
                size="small"
                style={{ 
                  backgroundColor: appointment.employee?.color || appointment.employees?.[0]?.color || '#9370DB',
                  color: '#fff'
                }}
              >
                {`${appointment.employee?.firstName?.[0] || appointment.employees?.[0]?.firstName?.[0] || ''}${appointment.employee?.lastName?.[0] || appointment.employees?.[0]?.lastName?.[0] || ''}`}
              </Avatar>
              <Text>
                {appointment.employee?.firstName || appointment.employees?.[0]?.firstName} {appointment.employee?.lastName || appointment.employees?.[0]?.lastName}
                <Text type="secondary"> • {appointment.employee?.position || appointment.employees?.[0]?.position}</Text>
              </Text>
            </Space>

            {/* Дополнительные детали */}
            {showDetails && (
              <div className="crm-agenda-item__details">
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  
                  {/* Адрес */}
                  {appointment.client.address && (
                    <Space size="small">
                      <EnvironmentOutlined />
                      <Text type="secondary">{appointment.client.address}</Text>
                    </Space>
                  )}

                  {/* Время в пути */}
                  {appointment.travelTime && appointment.travelTime > 0 && (
                    <Space size="small">
                      <CarOutlined />
                      <Text type="secondary">
                        Время в пути: {appointment.travelTime} минут
                      </Text>
                    </Space>
                  )}

                  {/* Заметки */}
                  {appointment.notes && (
                    <div className="crm-agenda-item__notes">
                      <Text type="secondary" style={{ fontStyle: 'italic' }}>
                        {appointment.notes}
                      </Text>
                    </div>
                  )}
                </Space>
              </div>
            )}
          </Space>
        </div>

        {/* Действия */}
        {showActions && (
          <div className="crm-agenda-item__actions">
            <Space size="small">
              {appointment.status === 'scheduled' && onConfirm && (
                <Button 
                  size="small" 
                  type="primary" 
                  icon={<CheckOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onConfirm();
                  }}
                >
                  Подтвердить
                </Button>
              )}

              {onEdit && (
                <Button 
                  size="small" 
                  icon={<EditOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                  }}
                >
                  Изменить
                </Button>
              )}

              {['scheduled', 'confirmed'].includes(appointment.status) && onCancel && (
                <Button 
                  size="small" 
                  danger 
                  icon={<CloseOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onCancel();
                  }}
                >
                  Отменить
                </Button>
              )}

              {onDelete && (
                <Button 
                  size="small" 
                  danger 
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                />
              )}
            </Space>
          </div>
        )}
      </div>
    </Card>
  );
};