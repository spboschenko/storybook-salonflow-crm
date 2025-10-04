// src/components/CalendarSystem/CalendarSystem.tsx
import React, { useMemo, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import '@fullcalendar/daygrid/index.css';
import '@fullcalendar/timegrid/index.css';
import '@fullcalendar/list/index.css';
import { Typography, Space, Divider } from 'antd';
import type { EventDropArg, EventInput } from '@fullcalendar/core';
import { AppointmentWithRelations, CalendarView } from '../../types';
import CalendarToolbar from './CalendarToolbar';

const { Text } = Typography;

export type CalendarSystemView = CalendarView | 'list';

export type CalendarUiSettings = {
  defaultView?: CalendarView;
  timeSlotDuration?: number;
  workDayStart?: string;
  workDayEnd?: string;
  weekStartsOn?: number; // 0 Sunday .. 6 Saturday
  showWeekends?: boolean;
};

export interface CalendarSystemProps {
  appointments: AppointmentWithRelations[];
  settings?: CalendarUiSettings;
  initialView?: CalendarSystemView;
  height?: string | number;
  showToolbar?: boolean;
  onEventClick?: (appointment: AppointmentWithRelations) => void;
  onEventDrop?: (args: { appointmentId: string; start: Date; end: Date }) => void;
  onViewChange?: (view: CalendarSystemView) => void;
}

function toEvent(appointment: AppointmentWithRelations): EventInput {
  const title = appointment.client
    ? `${appointment.client.firstName || ''} ${appointment.client.lastName || appointment.client.name || ''}`.trim()
    : 'Appointment';
  return {
    id: appointment.id,
    start: appointment.startTime,
    end: appointment.endTime,
    title,
    extendedProps: { appointment },
  } as EventInput;
}

const viewMap: Record<CalendarSystemView, string> = {
  day: 'timeGridDay',
  week: 'timeGridWeek',
  month: 'dayGridMonth',
  agenda: 'listWeek',
  list: 'listWeek',
};

export const CalendarSystem: React.FC<CalendarSystemProps> = ({
  appointments,
  settings,
  initialView = 'week',
  height = 'auto',
  showToolbar = true,
  onEventClick,
  onEventDrop,
  onViewChange,
}) => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [view, setView] = useState<CalendarSystemView>(initialView);

  const events = useMemo(() => appointments.map(toEvent), [appointments]);

  const handleEventClick = (arg: any) => {
    const appt: AppointmentWithRelations | undefined = arg?.event?.extendedProps?.appointment;
    if (appt) onEventClick?.(appt);
  };

  const handleEventDrop = (arg: EventDropArg) => {
    const id = arg.event.id;
    const start = arg.event.start!;
    const end = arg.event.end || new Date(start.getTime() + 30 * 60 * 1000);
    onEventDrop?.({ appointmentId: id, start, end });
  };

  const api = () => (calendarRef.current as any)?.getApi?.();

  const goPrev = () => api()?.prev();
  const goNext = () => api()?.next();
  const goToday = () => api()?.today();
  const changeView = (next: CalendarSystemView) => {
    setView(next);
    api()?.changeView(viewMap[next]);
    onViewChange?.(next);
  };
  const changeDate = (d: Date) => api()?.gotoDate(d);

  return (
    <div className="crm-calendar-system">
      {showToolbar && (
        <Space direction="vertical" style={{ width: '100%' }} size={8}>
          <CalendarToolbar
            currentView={view}
            onPrev={goPrev}
            onNext={goNext}
            onToday={goToday}
            onViewChange={changeView}
            onDateChange={(d: Date) => changeDate(d)}
          />
          <Divider style={{ margin: '8px 0' }} />
        </Space>
      )}

      <FullCalendar
        ref={calendarRef as any}
        height={height}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView={viewMap[initialView]}
        headerToolbar={false}
  slotMinTime={(settings?.workDayStart ? settings.workDayStart + ':00' : '09:00:00') as any}
  slotMaxTime={(settings?.workDayEnd ? settings.workDayEnd + ':00' : '18:00:00') as any}
  firstDay={(settings?.weekStartsOn ?? 1) as any}
  weekends={Boolean(settings?.showWeekends ?? true)}
        editable
        eventResizableFromStart
        events={events}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        eventResize={(arg) => handleEventDrop(arg as unknown as EventDropArg)}
        eventContent={(arg) => {
          const appt: AppointmentWithRelations | undefined = (arg.event.extendedProps as any).appointment;
          const service = appt?.service?.name || appt?.services?.[0]?.name;
          return (
            <div className="crm-calendar-system__event">
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontWeight: 600 }}>{arg.timeText}</span>
                <Text ellipsis style={{ maxWidth: 160 }}>
                  {arg.event.title}
                </Text>
              </div>
              {service && (
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {service}
                </Text>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default CalendarSystem;
