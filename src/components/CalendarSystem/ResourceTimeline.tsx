// src/components/CalendarSystem/ResourceTimeline.tsx
import React from 'react';
import { Row, Col, Typography } from 'antd';
import { TimeScale } from '../Calendar/TimeScale/TimeScale';
import { EmployeeColumn } from '../Calendar/EmployeeColumn/EmployeeColumn';
import { AppointmentWithRelations, CalendarSize, Employee } from '../../types';

const { Text } = Typography;

export interface ResourceTimelineProps {
  employees: Employee[];
  appointmentsByEmployee: Record<string, AppointmentWithRelations[]>;
  size?: CalendarSize;
  startTime?: string;
  endTime?: string;
  slotDuration?: number;
  slotHeight?: number;
  onAppointmentDrop?: (appointment: AppointmentWithRelations, employeeId: string, targetTime: string) => void;
}

export const ResourceTimeline: React.FC<ResourceTimelineProps> = ({
  employees,
  appointmentsByEmployee,
  size = 'medium',
  startTime = '09:00',
  endTime = '18:00',
  slotDuration = 30,
  slotHeight = 60,
  onAppointmentDrop,
}) => {
  return (
    <div className="crm-resource-timeline">
      <Row gutter={12} wrap={false}>
        <Col flex="120px">
          <TimeScale
            size={size}
            startTime={startTime}
            endTime={endTime}
            slotDuration={slotDuration}
            slotHeight={slotHeight}
            showMajorHours
          />
        </Col>
        <Col flex="auto">
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${employees.length}, minmax(220px, 1fr))`, gap: 12 }}>
            {employees.map((emp: Employee) => (
              <div key={emp.id}>
                <Text strong>
                  {emp.firstName} {emp.lastName}
                </Text>
                <EmployeeColumn
                  employee={emp}
                  appointments={(appointmentsByEmployee[emp.id] || []) as AppointmentWithRelations[]}
                  size={size as any}
                  height={Math.ceil(((parseInt(endTime) - parseInt(startTime)) || 9) * slotHeight)}
                  onAppointmentDrop={(appointment, time) => onAppointmentDrop?.(appointment, emp.id, time)}
                />
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ResourceTimeline;
