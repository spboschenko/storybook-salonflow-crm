// src/stories/Calendar/CalendarSystem.stories.tsx
import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CalendarSystem } from '../../components/CalendarSystem';
import { ResourceTimeline } from '../../components/CalendarSystem';
import type { AppointmentWithRelations, Employee, Service, Client } from '../../types';

const meta: Meta = {
  title: 'Calendar/CalendarSystem',
};

export default meta;
type Story = StoryObj;

function makeDate(base: Date, h: number, m: number) {
  const d = new Date(base);
  d.setHours(h, m, 0, 0);
  return d;
}

const today = new Date();

const employees: Employee[] = [
  { id: 'e1', firstName: 'Alice', lastName: 'Brown', email: 'a@x.com', position: 'Groomer', isActive: true, workingHours: {}, createdAt: today, updatedAt: today, isArchived: false, color: '#8e7cc3' } as unknown as Employee,
  { id: 'e2', firstName: 'Bob', lastName: 'Green', email: 'b@x.com', position: 'Groomer', isActive: true, workingHours: {}, createdAt: today, updatedAt: today, isArchived: false, color: '#6fa8dc' } as unknown as Employee,
];

const appts: AppointmentWithRelations[] = [
  {
    id: 'a1', createdAt: today, updatedAt: today, isArchived: false,
    clientId: 'c1', petIds: [], staffIds: ['e1'], startTime: makeDate(today, 10, 0), endTime: makeDate(today, 11, 0), duration: 60,
    status: 'confirmed' as any, source: 'manual' as any, serviceIds: [], checkInNotes: '',
  client: { id: 'c1', name: 'John Doe', firstName: 'John', lastName: 'Doe', email: 'john@x.com', phone: '123', address: 'Addr', petIds: [], totalVisits: 3, createdAt: today, updatedAt: today, isArchived: false } as unknown as Client,
  service: { id: 's1', name: 'Bath', description: 'Dog bath', pricing: { XS: 10, S: 20, M: 30, L: 40, XL: 50 } as any, duration: 60, type: 'grooming' as any, applicablePetTypes: ['dog'], taxable: true, createdAt: today, updatedAt: today, isActive: true, isArchived: false } as unknown as Service,
  },
  {
    id: 'a2', createdAt: today, updatedAt: today, isArchived: false,
    clientId: 'c2', petIds: [], staffIds: ['e2'], startTime: makeDate(today, 12, 0), endTime: makeDate(today, 13, 0), duration: 60,
    status: 'confirmed' as any, source: 'manual' as any, serviceIds: [], checkInNotes: '',
  client: { id: 'c2', name: 'Jane Roe', firstName: 'Jane', lastName: 'Roe', email: 'jane@x.com', phone: '321', address: 'Addr', petIds: [], totalVisits: 1, createdAt: today, updatedAt: today, isArchived: false } as unknown as Client,
  service: { id: 's2', name: 'Groom', description: 'Full groom', pricing: { XS: 20, S: 30, M: 40, L: 50, XL: 60 } as any, duration: 60, type: 'grooming' as any, applicablePetTypes: ['dog'], taxable: true, createdAt: today, updatedAt: today, isActive: true, isArchived: false } as unknown as Service,
  },
];

export const MultiViewAndDnD: Story = {
  render: () => {
    const [events, setEvents] = useState(appts);
    return (
      <div style={{ height: 700 }}>
        <CalendarSystem
          appointments={events}
          settings={{ defaultView: 'week', workDayStart: '09:00', workDayEnd: '18:00', timeSlotDuration: 30, weekStartsOn: 1, showWeekends: true }}
          onEventDrop={({ appointmentId, start, end }) => {
            setEvents((prev) => prev.map((a) => (a.id === appointmentId ? { ...a, startTime: start, endTime: end } : a)));
          }}
        />
      </div>
    );
  },
};

export const ResourceTimelineDemo: Story = {
  render: () => {
    const [events, setEvents] = useState(appts);
    const appointmentsByEmployee = useMemo(() => {
      const map: Record<string, AppointmentWithRelations[]> = {};
      for (const e of employees) map[e.id] = [];
      for (const a of events) {
        const target = a.staffIds[0] || employees[0].id;
        map[target].push(a);
      }
      return map;
    }, [events]);

    return (
      <div style={{ height: 800 }}>
        <ResourceTimeline
          employees={employees}
          appointmentsByEmployee={appointmentsByEmployee}
          onAppointmentDrop={(appointment, employeeId, time) => {
            // Simplified: reassign to employee and shift time within hour granularity
            const [hh, mm] = time.split(':').map(Number);
            setEvents((prev) => prev.map((a) => {
              if (a.id !== appointment.id) return a;
              const start = new Date(a.startTime); start.setHours(hh, mm, 0, 0);
              const end = new Date(start.getTime() + a.duration * 60 * 1000);
              return { ...a, startTime: start, endTime: end, staffIds: [employeeId] };
            }));
          }}
        />
      </div>
    );
  },
};
