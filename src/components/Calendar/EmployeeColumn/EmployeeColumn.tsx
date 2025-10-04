// src/components/Calendar/EmployeeColumn/EmployeeColumn.tsx
import React from 'react';
import { Avatar, Typography, Badge } from 'antd';
import { CalendarSize, Employee, AppointmentWithRelations } from '../../../types';
import { AppointmentCard } from '../AppointmentCard';
import { UserOutlined } from '@ant-design/icons';
import './EmployeeColumn.css';

const { Text } = Typography;

export interface EmployeeColumnProps {
  /** Сотрудник для отображения */
  employee: Employee;
  /** Записи сотрудника на день */
  appointments?: AppointmentWithRelations[];
  /** Размер компонента */
  size?: CalendarSize;
  /** Ширина колонки в пикселях */
  width?: number;
  /** Высота колонки в пикселях */
  height?: number;
  /** Показывать ли аватар сотрудника */
  showAvatar?: boolean;
  /** Показывать ли статус рабочего времени */
  showWorkingStatus?: boolean;
  /** Компактный режим для заголовка */
  compactHeader?: boolean;
  /** Обработчик клика на колонку */
  onClick?: (employee: Employee) => void;
  /** Обработчик клика на запись */
  onAppointmentClick?: (appointment: AppointmentWithRelations) => void;
  /** Обработчик перетаскивания записи */
  onAppointmentDrop?: (appointment: AppointmentWithRelations, targetTime: string) => void;
  /** Кастомный класс */
  className?: string;
}

/**
 * EmployeeColumn - компонент колонки сотрудника для календаря
 * 
 * Используется в дневном и недельном видах календаря.
 * Отображает заголовок с информацией о сотруднике и контейнер для записей.
 */
export const EmployeeColumn: React.FC<EmployeeColumnProps> = ({
  employee,
  appointments = [],
  size = 'standard',
  width = 200,
  height = 600,
  showAvatar = true,
  showWorkingStatus = true,
  compactHeader = false,
  onClick,
  onAppointmentClick,
  onAppointmentDrop,
  className
}) => {
  const isWorking = employee.isActive;
  const appointmentCount = appointments.length;

  const handleColumnClick = () => {
    onClick?.(employee);
  };

  const handleAppointmentClick = (appointment: AppointmentWithRelations) => {
    onAppointmentClick?.(appointment);
  };

  return (
    <div 
      className={`crm-employee-column crm-employee-column--${size} ${className || ''}`}
      style={{ width, height }}
      onClick={handleColumnClick}
    >
      {/* Заголовок колонки */}
      <div className="crm-employee-column__header">
        {showAvatar && (
          <div className="crm-employee-column__avatar">
            <Badge 
              status={isWorking ? 'success' : 'default'} 
              dot={showWorkingStatus}
            >
              <Avatar 
                size={compactHeader ? 'small' : 'default'}
                style={{ 
                  backgroundColor: employee.color || '#9370DB',
                  color: '#fff'
                }}
                icon={<UserOutlined />}
              >
                {`${employee.firstName[0]}${employee.lastName[0]}`}
              </Avatar>
            </Badge>
          </div>
        )}
        
        <div className="crm-employee-column__info">
          <Text 
            strong 
            className="crm-employee-column__name"
            ellipsis={compactHeader}
          >
            {compactHeader 
              ? `${employee.firstName[0]}. ${employee.lastName}`
              : `${employee.firstName} ${employee.lastName}`
            }
          </Text>
          
          {!compactHeader && (
            <Text 
              type="secondary" 
              className="crm-employee-column__position"
              ellipsis
            >
              {employee.position}
            </Text>
          )}
          
          {appointmentCount > 0 && (
            <Badge 
              count={appointmentCount} 
              size="small"
              className="crm-employee-column__appointment-count"
            />
          )}
        </div>
      </div>

      {/* Контейнер для записей */}
      <div className="crm-employee-column__content">
        <div className="crm-employee-column__appointments">
          {appointments.map((appointment, index) => (
            <div 
              key={appointment.id}
              className="crm-employee-column__appointment-wrapper"
              style={{
                // Позиционирование записи по времени
                top: `${calculateAppointmentPosition(appointment.startTime)}px`,
                height: `${calculateAppointmentHeight(appointment.startTime, appointment.endTime)}px`
              }}
            >
              <AppointmentCard
                appointment={appointment}
                size={size}
                compact={size === 'compact'}
                onClick={() => handleAppointmentClick(appointment)}
                draggable
                onDragEnd={(event) => {
                  // Логика для определения времени drop
                  const dropTime = calculateDropTime(event);
                  if (dropTime) {
                    onAppointmentDrop?.(appointment, dropTime);
                  }
                }}
              />
            </div>
          ))}
        </div>

        {/* Область для drag & drop */}
        <div 
          className="crm-employee-column__drop-zone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const dropTime = calculateDropTime(e);
            const appointmentData = e.dataTransfer.getData('application/json');
            if (dropTime && appointmentData) {
              const appointment = JSON.parse(appointmentData);
              onAppointmentDrop?.(appointment, dropTime);
            }
          }}
        />
      </div>
    </div>
  );
};

// Вспомогательные функции для расчета позиций
function calculateAppointmentPosition(startTime: Date): number {
  const hours = startTime.getHours();
  const minutes = startTime.getMinutes();
  // Примерный расчет - 60px на час
  return (hours - 9) * 60 + (minutes / 60) * 60;
}

function calculateAppointmentHeight(startTime: Date, endTime: Date): number {
  const durationMs = endTime.getTime() - startTime.getTime();
  const durationHours = durationMs / (1000 * 60 * 60);
  // 60px на час
  return durationHours * 60;
}

function calculateDropTime(event: React.DragEvent): string | null {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  const y = event.clientY - rect.top;
  // Примерный расчет времени из позиции
  const hours = Math.floor(y / 60) + 9;
  const minutes = Math.round((y % 60) / 15) * 15; // Округляем до 15 минут
  
  if (hours >= 9 && hours <= 18) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
  
  return null;
}