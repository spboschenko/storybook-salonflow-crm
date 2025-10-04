// src/stories/DesignSystem/Calendar/CalendarComponents.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TimeSlot, AppointmentCard, TimeScale, EmployeeColumn, DayCell, AgendaItem, CalendarHeader } from '../../../components';
import { AppointmentWithRelations, TimeSlot as TimeSlotType, Employee } from '../../../types';
import { Space, Divider, Typography } from 'antd';

const { Title, Text } = Typography;

const meta: Meta = {
  title: 'Design System/Calendar/Calendar Components',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Calendar Components

Атомарные компоненты для календарного интерфейса SalonFlow CRM.

### Компоненты:
- **TimeSlot** - временной слот в календаре
- **AppointmentCard** - карточка записи
- **TimeScale** - временная шкала

Все компоненты следуют принципам Atomic Design и поддерживают различные размеры и состояния.
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj;

// Мок данные для демонстрации
const mockTimeSlot: TimeSlotType = {
  startTime: '09:00',
  endTime: '09:15',
  isWorkingHour: true,
  isAvailable: true
};

const mockAppointment: AppointmentWithRelations = {
  id: '1',
  clientId: 'client-1',
  petId: 'pet-1',
  employeeId: 'employee-1',
  serviceId: 'service-1',
  startTime: new Date('2025-10-03T09:00:00'),
  endTime: new Date('2025-10-03T10:30:00'),
  status: 'confirmed',
  priority: 'normal',
  notes: 'Первая стрижка, собака может быть нервной',
  price: 2500,
  travelTime: 15,
  reminderSent: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  client: {
    id: 'client-1',
    firstName: 'Анна',
    lastName: 'Петрова',
    phone: '+7 (999) 123-45-67',
    email: 'anna.petrova@example.com',
    address: 'ул. Пушкина, д. 10, кв. 5',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  pet: {
    id: 'pet-1',
    clientId: 'client-1',
    name: 'Рекс',
    breed: 'Лабрадор',
    species: 'dog',
    age: 3,
    weight: 30,
    color: 'Золотистый',
    aggressiveness: 'calm',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  employee: {
    id: 'employee-1',
    firstName: 'Мария',
    lastName: 'Иванова',
    email: 'maria.ivanova@salon.com',
    position: 'Грумер',
    isActive: true,
    workingHours: {
      monday: { start: '09:00', end: '18:00' },
      tuesday: { start: '09:00', end: '18:00' },
      wednesday: { start: '09:00', end: '18:00' },
      thursday: { start: '09:00', end: '18:00' },
      friday: { start: '09:00', end: '18:00' },
      saturday: { start: '10:00', end: '16:00' }
    },
    color: '#9370DB',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  service: {
    id: 'service-1',
    name: 'Полный груминг (стрижка + мытье)',
    description: 'Комплексная услуга груминга',
    duration: 90,
    price: 2500,
    category: 'Груминг',
    isActive: true,
    color: '#52c41a',
    createdAt: new Date(),
    updatedAt: new Date()
  }
};

export const TimeSlotDemo: Story = {
  name: 'TimeSlot Component',
  render: () => (
    <div style={{ padding: '20px' }}>
      <Title level={3}>TimeSlot - Временные слоты</Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Text strong>Размеры и состояния:</Text>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            {(['compact', 'standard', 'comfortable'] as const).map(size => (
              <div key={size} style={{ border: '1px solid #d9d9d9' }}>
                <TimeSlot
                  timeSlot={mockTimeSlot}
                  size={size}
                  height={60}
                  showTime={true}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <Text strong>Различные состояния:</Text>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            <div style={{ border: '1px solid #d9d9d9' }}>
              <TimeSlot
                timeSlot={mockTimeSlot}
                showTime={true}
                height={60}
              />
              <Text style={{ fontSize: '12px', display: 'block', textAlign: 'center' }}>
                Обычный
              </Text>
            </div>
            
            <div style={{ border: '1px solid #d9d9d9' }}>
              <TimeSlot
                timeSlot={mockTimeSlot}
                showTime={true}
                height={60}
                isSelected={true}
              />
              <Text style={{ fontSize: '12px', display: 'block', textAlign: 'center' }}>
                Выбранный
              </Text>
            </div>
            
            <div style={{ border: '1px solid #d9d9d9' }}>
              <TimeSlot
                timeSlot={{...mockTimeSlot, isAvailable: false}}
                showTime={true}
                height={60}
              />
              <Text style={{ fontSize: '12px', display: 'block', textAlign: 'center' }}>
                Недоступный
              </Text>
            </div>
          </div>
        </div>
      </Space>
    </div>
  ),
};

export const AppointmentCardDemo: Story = {
  name: 'AppointmentCard Component',
  render: () => (
    <div style={{ padding: '20px' }}>
      <Title level={3}>AppointmentCard - Карточки записей</Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Text strong>Размеры:</Text>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            {(['compact', 'standard', 'comfortable'] as const).map(size => (
              <div key={size} style={{ width: '200px' }}>
                <AppointmentCard
                  appointment={mockAppointment}
                  size={size}
                />
              </div>
            ))}
          </div>
        </div>

        <Divider />

        <div>
          <Text strong>Различные статусы:</Text>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px', flexWrap: 'wrap' }}>
            {(['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled'] as const).map(status => (
              <div key={status} style={{ width: '200px' }}>
                <AppointmentCard
                  appointment={{...mockAppointment, status}}
                />
              </div>
            ))}
          </div>
        </div>

        <Divider />

        <div>
          <Text strong>Состояния и опции:</Text>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px', flexWrap: 'wrap' }}>
            <div style={{ width: '200px' }}>
              <AppointmentCard
                appointment={mockAppointment}
                compact={true}
              />
              <Text style={{ fontSize: '12px', textAlign: 'center', display: 'block' }}>
                Компактный режим
              </Text>
            </div>
            
            <div style={{ width: '200px' }}>
              <AppointmentCard
                appointment={mockAppointment}
                isSelected={true}
              />
              <Text style={{ fontSize: '12px', textAlign: 'center', display: 'block' }}>
                Выбранная
              </Text>
            </div>
            
            <div style={{ width: '200px' }}>
              <AppointmentCard
                appointment={mockAppointment}
                showTravelTime={true}
              />
              <Text style={{ fontSize: '12px', textAlign: 'center', display: 'block' }}>
                С временем в пути
              </Text>
            </div>
          </div>
        </div>
      </Space>
    </div>
  ),
};

export const TimeScaleDemo: Story = {
  name: 'TimeScale Component',
  render: () => (
    <div style={{ padding: '20px' }}>
      <Title level={3}>TimeScale - Временная шкала</Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Text strong>Размеры:</Text>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            {(['compact', 'standard', 'comfortable'] as const).map(size => (
              <div key={size} style={{ height: '400px' }}>
                <TimeScale
                  size={size}
                  startTime="09:00"
                  endTime="12:00"
                  slotDuration={30}
                  slotHeight={60}
                />
              </div>
            ))}
          </div>
        </div>

        <Divider />

        <div>
          <Text strong>Различные интервалы:</Text>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            <div style={{ height: '300px' }}>
              <TimeScale
                startTime="09:00"
                endTime="12:00"
                slotDuration={15}
                slotHeight={40}
              />
              <Text style={{ fontSize: '12px', textAlign: 'center', display: 'block' }}>
                15 минут
              </Text>
            </div>
            
            <div style={{ height: '300px' }}>
              <TimeScale
                startTime="09:00"
                endTime="12:00"
                slotDuration={30}
                slotHeight={60}
              />
              <Text style={{ fontSize: '12px', textAlign: 'center', display: 'block' }}>
                30 минут
              </Text>
            </div>
            
            <div style={{ height: '300px' }}>
              <TimeScale
                startTime="09:00"
                endTime="12:00"
                showMajorHours={true}
                slotHeight={100}
              />
              <Text style={{ fontSize: '12px', textAlign: 'center', display: 'block' }}>
                Только часы
              </Text>
            </div>
          </div>
        </div>

        <Divider />

        <div>
          <Text strong>Форматы времени:</Text>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            <div style={{ height: '300px' }}>
              <TimeScale
                timeFormat="24h"
                startTime="09:00"
                endTime="12:00"
                slotDuration={60}
                slotHeight={80}
              />
              <Text style={{ fontSize: '12px', textAlign: 'center', display: 'block' }}>
                24-часовой формат
              </Text>
            </div>
            
            <div style={{ height: '300px' }}>
              <TimeScale
                timeFormat="12h"
                startTime="09:00"
                endTime="12:00"
                slotDuration={60}
                slotHeight={80}
              />
              <Text style={{ fontSize: '12px', textAlign: 'center', display: 'block' }}>
                12-часовой формат
              </Text>
            </div>
          </div>
        </div>
      </Space>
    </div>
  ),
};

export const CalendarHeaderDemo: Story = {
  name: 'CalendarHeader Component',
  render: () => (
    <div style={{ padding: '20px', background: '#f5f5f5' }}>
      <Title level={3}>CalendarHeader - Заголовок календаря</Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Text strong>Полный заголовок:</Text>
          <div style={{ marginTop: '8px', border: '1px solid #d9d9d9' }}>
            <CalendarHeader
              currentDate={new Date()}
              currentView="week"
              onDateChange={(date) => console.log('Date changed:', date)}
              onViewChange={(view) => console.log('View changed:', view)}
              onToday={() => console.log('Today clicked')}
              onAddAppointment={() => console.log('Add appointment')}
              onSettings={() => console.log('Settings')}
              onRefresh={() => console.log('Refresh')}
            />
          </div>
        </div>

        <div>
          <Text strong>Компактная версия:</Text>
          <div style={{ marginTop: '8px', border: '1px solid #d9d9d9' }}>
            <CalendarHeader
              currentDate={new Date()}
              currentView="day"
              showAddButton={false}
              showSettingsButton={false}
              className="crm-calendar-header--compact"
            />
          </div>
        </div>

        <div>
          <Text strong>Только навигация:</Text>
          <div style={{ marginTop: '8px', border: '1px solid #d9d9d9' }}>
            <CalendarHeader
              currentDate={new Date()}
              currentView="month"
              showViewSelector={false}
              showAddButton={false}
              showSettingsButton={false}
              showRefreshButton={false}
            />
          </div>
        </div>
      </Space>
    </div>
  ),
};