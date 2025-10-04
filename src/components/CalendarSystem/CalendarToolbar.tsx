// src/components/CalendarSystem/CalendarToolbar.tsx
import React from 'react';
import { Button, DatePicker, Radio, Space, Typography } from 'antd';
import type { Dayjs } from 'dayjs';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { CalendarView } from '../../types/index';

const { Text } = Typography;

export interface CalendarToolbarProps {
  currentView: CalendarView | 'list';
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewChange: (view: CalendarView | 'list') => void;
  onDateChange: (date: Date) => void;
}

export const CalendarToolbar: React.FC<CalendarToolbarProps> = ({
  currentView,
  onPrev,
  onNext,
  onToday,
  onViewChange,
  onDateChange,
}) => {
  return (
    <div className="crm-calendar-toolbar" style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <Space>
        <Button icon={<LeftOutlined />} onClick={onPrev} aria-label="Previous" />
        <Button onClick={onToday}>Today</Button>
        <Button icon={<RightOutlined />} onClick={onNext} aria-label="Next" />
      </Space>

  <DatePicker onChange={(date: Dayjs | null) => onDateChange(date ? (date as any).toDate?.() ?? new Date(date.valueOf()) : new Date())} />

      <div style={{ flex: 1 }} />

      <Space>
        <Text type="secondary">View</Text>
        <Radio.Group
          size="middle"
          value={currentView}
          onChange={(e) => onViewChange(e.target.value)}
        >
          <Radio.Button value="day">Day</Radio.Button>
          <Radio.Button value="week">Week</Radio.Button>
          <Radio.Button value="month">Month</Radio.Button>
          <Radio.Button value="agenda">Agenda</Radio.Button>
        </Radio.Group>
      </Space>
    </div>
  );
};

export default CalendarToolbar;
