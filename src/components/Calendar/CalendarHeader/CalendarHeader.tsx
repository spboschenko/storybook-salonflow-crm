// src/components/Calendar/CalendarHeader/CalendarHeader.tsx
import React from 'react';
import { Space, Typography, Button, Segmented, DatePicker, Tooltip } from 'antd';
import { 
  LeftOutlined, 
  RightOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  BarsOutlined,
  TableOutlined,
  PlusOutlined,
  SettingOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { CalendarView } from '../../../types';
import locale from 'antd/locale/ru_RU';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import './CalendarHeader.css';

const { Title, Text } = Typography;

dayjs.locale('ru');

export interface CalendarHeaderProps {
  /** Текущая дата */
  currentDate: Date;
  /** Текущий вид календаря */
  currentView: CalendarView;
  /** Название календаря */
  title?: string;
  /** Показывать ли переключатель видов */
  showViewSelector?: boolean;
  /** Показывать ли навигацию по датам */
  showDateNavigation?: boolean;
  /** Показывать ли кнопку "Сегодня" */
  showTodayButton?: boolean;
  /** Показывать ли выбор даты */
  showDatePicker?: boolean;
  /** Показывать ли кнопку добавления записи */
  showAddButton?: boolean;
  /** Показывать ли кнопку настроек */
  showSettingsButton?: boolean;
  /** Показывать ли кнопку обновления */
  showRefreshButton?: boolean;
  /** Обработчик изменения даты */
  onDateChange?: (date: Date) => void;
  /** Обработчик изменения вида */
  onViewChange?: (view: CalendarView) => void;
  /** Обработчик перехода к сегодняшнему дню */
  onToday?: () => void;
  /** Обработчик добавления записи */
  onAddAppointment?: () => void;
  /** Обработчик открытия настроек */
  onSettings?: () => void;
  /** Обработчик обновления данных */
  onRefresh?: () => void;
  /** Кастомный класс */
  className?: string;
}

/**
 * CalendarHeader - заголовок календаря с навигацией и управлением
 * 
 * Содержит навигацию по датам, переключение видов календаря,
 * кнопки действий и выбор даты.
 */
export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  currentView,
  title = 'Календарь записей',
  showViewSelector = true,
  showDateNavigation = true,
  showTodayButton = true,
  showDatePicker = true,
  showAddButton = true,
  showSettingsButton = true,
  showRefreshButton = true,
  onDateChange,
  onViewChange,
  onToday,
  onAddAppointment,
  onSettings,
  onRefresh,
  className
}) => {
  const getDateTitle = (): string => {
    const date = dayjs(currentDate);
    
    switch (currentView) {
      case 'day':
        return date.format('D MMMM YYYY, dddd');
      case 'week':
        const weekStart = date.startOf('week');
        const weekEnd = date.endOf('week');
        if (weekStart.month() === weekEnd.month()) {
          return `${weekStart.format('D')}–${weekEnd.format('D')} ${weekStart.format('MMMM YYYY')}`;
        } else {
          return `${weekStart.format('D MMM')}–${weekEnd.format('D MMM YYYY')}`;
        }
      case 'month':
        return date.format('MMMM YYYY');
      case 'agenda':
        return date.format('MMMM YYYY');
      default:
        return date.format('MMMM YYYY');
    }
  };

  const getNavigationStep = (): { amount: number; unit: 'day' | 'week' | 'month' } => {
    switch (currentView) {
      case 'day':
        return { amount: 1, unit: 'day' };
      case 'week':
        return { amount: 1, unit: 'week' };
      case 'month':
      case 'agenda':
        return { amount: 1, unit: 'month' };
      default:
        return { amount: 1, unit: 'day' };
    }
  };

  const handlePrevious = () => {
    const { amount, unit } = getNavigationStep();
    const newDate = dayjs(currentDate).subtract(amount, unit).toDate();
    onDateChange?.(newDate);
  };

  const handleNext = () => {
    const { amount, unit } = getNavigationStep();
    const newDate = dayjs(currentDate).add(amount, unit).toDate();
    onDateChange?.(newDate);
  };

  const handleDatePickerChange = (date: Dayjs | null) => {
    if (date) {
      onDateChange?.(date.toDate());
    }
  };

  const handleTodayClick = () => {
    onToday?.();
  };

  const viewOptions = [
    { label: 'День', value: 'day', icon: <CalendarOutlined /> },
    { label: 'Неделя', value: 'week', icon: <TableOutlined /> },
    { label: 'Месяц', value: 'month', icon: <AppstoreOutlined /> },
    { label: 'Повестка', value: 'agenda', icon: <BarsOutlined /> },
  ];

  return (
    <div className={`crm-calendar-header ${className || ''}`}>
      {/* Левая секция - заголовок и навигация */}
      <div className="crm-calendar-header__left">
        <div className="crm-calendar-header__title-section">
          <Title level={3} className="crm-calendar-header__title">
            {title}
          </Title>
          
          {showDateNavigation && (
            <Space size="small" className="crm-calendar-header__navigation">
              <Button
                type="text"
                icon={<LeftOutlined />}
                onClick={handlePrevious}
                className="crm-calendar-header__nav-button"
              />
              
              <div className="crm-calendar-header__date-title">
                <Text strong>{getDateTitle()}</Text>
              </div>
              
              <Button
                type="text"
                icon={<RightOutlined />}
                onClick={handleNext}
                className="crm-calendar-header__nav-button"
              />
            </Space>
          )}
        </div>

        {/* Кнопка "Сегодня" и выбор даты */}
        <Space size="small" className="crm-calendar-header__date-controls">
          {showTodayButton && (
            <Button onClick={handleTodayClick}>
              Сегодня
            </Button>
          )}
          
          {showDatePicker && (
            <DatePicker
              value={dayjs(currentDate)}
              onChange={handleDatePickerChange}
              allowClear={false}
              placeholder="Выберите дату"
              locale={locale.DatePicker}
              className="crm-calendar-header__date-picker"
            />
          )}
        </Space>
      </div>

      {/* Правая секция - переключатель видов и действия */}
      <div className="crm-calendar-header__right">
        <Space size={16}>
          {/* Переключатель видов */}
          {showViewSelector && (
            <Segmented
              value={currentView}
              onChange={(value) => onViewChange?.(value as CalendarView)}
              options={viewOptions}
              className="crm-calendar-header__view-selector"
            />
          )}

          {/* Кнопки действий */}
          <Space size="small" className="crm-calendar-header__actions">
            {showRefreshButton && (
              <Tooltip title="Обновить">
                <Button
                  type="text"
                  icon={<ReloadOutlined />}
                  onClick={onRefresh}
                />
              </Tooltip>
            )}

            {showAddButton && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={onAddAppointment}
              >
                Новая запись
              </Button>
            )}

            {showSettingsButton && (
              <Tooltip title="Настройки календаря">
                <Button
                  type="text"
                  icon={<SettingOutlined />}
                  onClick={onSettings}
                />
              </Tooltip>
            )}
          </Space>
        </Space>
      </div>
    </div>
  );
};