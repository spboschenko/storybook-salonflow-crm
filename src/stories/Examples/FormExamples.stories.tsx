// src/stories/Examples/FormExamples.stories.tsx
import type { Meta, StoryObj } from '@storybook/react/*';
import React, { useState } from 'react';
import { CrmButton } from '../../components/CrmButton/CrmButton';
import { CrmInput } from '../../components/CrmInput/CrmInput';
import { CrmSelect } from '../../components/CrmSelect/CrmSelect';
import { CrmTextArea } from '../../components/CrmTextArea/CrmTextArea';
import { CrmCheckbox, CrmCheckboxGroup } from '../../components/CrmCheckbox/CrmCheckbox';
import { CrmRadioGroup } from '../../components/CrmRadio/CrmRadio';
import { CrmDatePicker, CrmDateRangePicker, CrmTimePicker } from '../../components/CrmDatePicker/CrmDatePicker';
import dayjs from 'dayjs';

const meta: Meta = {
  title: 'Examples/Complete Forms',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Комплексные примеры форм

Демонстрация реальных сценариев использования всех компонентов CRM системы.

### Включенные формы:
- **Регистрация клиента** - полная форма с валидацией
- **Бронирование услуги** - форма записи с выбором времени  
- **Настройки профиля** - форма пользовательских настроек
- **Отчет по продажам** - форма с фильтрами и параметрами
- **Обратная связь** - контактная форма

### Демонстрируемые возможности:
- Интеграция всех типов полей
- Обработка состояний валидации
- Логическая группировка элементов
- Адаптивное поведение
- Консистентный дизайн
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Форма регистрации клиента
export const CustomerRegistration: Story = {
  render: () => {
    const [formData, setFormData] = useState<{
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      birthDate: any;
      gender: string;
      services: string[];
      newsletter: boolean;
      agreement: boolean;
    }>({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: null,
      gender: '',
      services: [],
      newsletter: false,
      agreement: false,
    });

    const [errors, setErrors] = useState<{
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      agreement?: string;
    }>({});

    const handleSubmit = () => {
      const newErrors: any = {};
      
      if (!formData.firstName) newErrors.firstName = 'Имя обязательно для заполнения';
      if (!formData.lastName) newErrors.lastName = 'Фамилия обязательна для заполнения';
      if (!formData.email) newErrors.email = 'Email обязателен для заполнения';
      if (!formData.phone) newErrors.phone = 'Телефон обязателен для заполнения';
      if (!formData.agreement) newErrors.agreement = 'Необходимо согласие с условиями';

      setErrors(newErrors);
      
      if (Object.keys(newErrors).length === 0) {
        alert('Форма успешно отправлена!');
      }
    };

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '24px', color: '#333' }}>Регистрация нового клиента</h2>
        
        <div style={{ display: 'grid', gap: '16px' }}>
          {/* Основная информация */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <CrmInput
              label="Имя"
              placeholder="Введите имя"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              error={errors.firstName}
              required
            />
            <CrmInput
              label="Фамилия"
              placeholder="Введите фамилию"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              error={errors.lastName}
              required
            />
          </div>

          {/* Контактная информация */}
          <CrmInput
            label="Email"
            type="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            error={errors.email}
            required
          />

          <CrmInput
            label="Телефон"
            placeholder="+7 (999) 123-45-67"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            error={errors.phone}
            required
          />

          {/* Дополнительная информация */}
          <CrmDatePicker
            label="Дата рождения"
            placeholder="Выберите дату"
            value={formData.birthDate}
            onChange={(date) => setFormData({...formData, birthDate: date})}
            helperText="Поможет нам подготовить персональные предложения"
          />

          <CrmRadioGroup
            title="Пол"
            options={[
              { label: 'Мужской', value: 'male' },
              { label: 'Женский', value: 'female' },
              { label: 'Не указывать', value: 'not_specified' },
            ]}
            value={formData.gender}
            onChange={(value: any) => setFormData({...formData, gender: value.target.value})}
            direction="horizontal"
          />

          {/* Услуги */}
          <CrmCheckboxGroup
            title="Интересующие услуги"
            options={[
              { label: 'Стрижка', value: 'haircut' },
              { label: 'Окрашивание', value: 'coloring' },
              { label: 'Укладка', value: 'styling' },
              { label: 'Маникюр', value: 'manicure' },
              { label: 'Педикюр', value: 'pedicure' },
              { label: 'Массаж', value: 'massage' },
            ]}
            value={formData.services}
            onChange={(services: any) => setFormData({...formData, services: services as string[]})}
            helperText="Выберите услуги, которые вас интересуют"
            direction="horizontal"
          />

          {/* Согласия */}
          <div style={{ marginTop: '16px' }}>
            <CrmCheckbox
              label="Получать новости и специальные предложения"
              checked={formData.newsletter}
              onChange={(e) => setFormData({...formData, newsletter: e.target.checked})}
              helperText="Мы будем присылать только полезную информацию"
            />

            <CrmCheckbox
              label="Согласен с условиями обслуживания и политикой конфиденциальности"
              checked={formData.agreement}
              onChange={(e) => setFormData({...formData, agreement: e.target.checked})}
              error={errors.agreement}
              required
            />
          </div>

          {/* Кнопки */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <CrmButton
              variant="primary"
              onClick={handleSubmit}
              style={{ flex: 1 }}
            >
              Зарегистрировать клиента
            </CrmButton>
            <CrmButton
              variant="secondary"
              onClick={() => {
                setFormData({
                  firstName: '', lastName: '', email: '', phone: '',
                  birthDate: null, gender: '', services: [],
                  newsletter: false, agreement: false
                });
                setErrors({});
              }}
            >
              Очистить
            </CrmButton>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Комплексная форма регистрации клиента с валидацией и различными типами полей',
      },
    },
  },
};

// Форма бронирования
export const ServiceBooking: Story = {
  render: () => {
    const [bookingData, setBookingData] = useState<{
      client: string;
      service: string;
      master: string;
      date: any;
      time: any;
      duration: string;
      notes: string;
      sendReminder: boolean;
      paymentMethod: string;
    }>({
      client: '',
      service: '',
      master: '',
      date: null,
      time: null,
      duration: '',
      notes: '',
      sendReminder: true,
      paymentMethod: 'cash',
    });

    const clientOptions = [
      { label: 'Анна Петрова', value: 'anna_petrova' },
      { label: 'Мария Сидорова', value: 'maria_sidorova' },
      { label: 'Елена Козлова', value: 'elena_kozlova' },
    ];

    const serviceOptions = [
      { label: 'Стрижка женская (60 мин)', value: 'haircut_female', duration: 60 },
      { label: 'Окрашивание (120 мин)', value: 'coloring', duration: 120 },
      { label: 'Маникюр (45 мин)', value: 'manicure', duration: 45 },
      { label: 'Укладка (30 мин)', value: 'styling', duration: 30 },
    ];

    const masterOptions = [
      { label: 'Светлана Иванова (стилист)', value: 'svetlana_ivanova' },
      { label: 'Ольга Смирнова (колорист)', value: 'olga_smirnova' },
      { label: 'Наталья Петрова (мастер маникюра)', value: 'natalia_petrova' },
    ];

    return (
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '24px', color: '#333' }}>Бронирование услуги</h2>
        
        <div style={{ display: 'grid', gap: '20px' }}>
          {/* Основная информация */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <CrmSelect
              label="Клиент"
              placeholder="Выберите клиента"
              options={clientOptions}
              value={bookingData.client}
              onChange={(value) => setBookingData({...bookingData, client: value})}
              showSearch
              required
            />

            <CrmSelect
              label="Услуга"
              placeholder="Выберите услугу"
              options={serviceOptions}
              value={bookingData.service}
              onChange={(value) => {
                const selectedService = serviceOptions.find(s => s.value === value);
                setBookingData({
                  ...bookingData, 
                  service: value,
                  duration: selectedService?.duration?.toString() || ''
                });
              }}
              required
            />
          </div>

          <CrmSelect
            label="Мастер"
            placeholder="Выберите мастера"
            options={masterOptions}
            value={bookingData.master}
            onChange={(value) => setBookingData({...bookingData, master: value})}
            helperText="Выберите мастера в зависимости от услуги"
            required
          />

          {/* Дата и время */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <CrmDatePicker
              label="Дата записи"
              placeholder="Выберите дату"
              value={bookingData.date}
              onChange={(date) => setBookingData({...bookingData, date})}
              disabledDate={(current) => current && current < dayjs().startOf('day')}
              required
            />

            <CrmTimePicker
              label="Время записи"
              placeholder="Выберите время"
              value={bookingData.time}
              onChange={(time) => setBookingData({...bookingData, time})}
              format="HH:mm"
              minuteStep={15}
              required
            />

            <CrmInput
              label="Длительность (мин)"
              placeholder="60"
              value={bookingData.duration}
              onChange={(e) => setBookingData({...bookingData, duration: e.target.value})}
              type="number"
              disabled
              helperText="Автоматически"
            />
          </div>

          {/* Дополнительная информация */}
          <CrmTextArea
            label="Комментарии к записи"
            placeholder="Особые пожелания, аллергии, предпочтения..."
            value={bookingData.notes}
            onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
            rows={3}
            helperText="Любая дополнительная информация для мастера"
          />

          {/* Настройки */}
          <div style={{ marginTop: '16px' }}>
            <CrmCheckbox
              label="Отправить напоминание клиенту"
              checked={bookingData.sendReminder}
              onChange={(e) => setBookingData({...bookingData, sendReminder: e.target.checked})}
              helperText="SMS за 1 час до записи"
            />
          </div>

          <CrmRadioGroup
            title="Способ оплаты"
            options={[
              { label: 'Наличные', value: 'cash', description: 'Оплата в салоне' },
              { label: 'Банковская карта', value: 'card', description: 'Терминал в салоне' },
              { label: 'Предоплата онлайн', value: 'online', description: 'Оплата при бронировании' },
            ]}
            value={bookingData.paymentMethod}
            onChange={(value: any) => setBookingData({...bookingData, paymentMethod: value.target.value})}
            variant="card"
          />

          {/* Кнопки */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <CrmButton
              variant="primary"
              size="large"
              style={{ flex: 1 }}
              onClick={() => alert('Запись успешно создана!')}
            >
              Создать запись
            </CrmButton>
            <CrmButton
              variant="secondary"
              size="large"
              onClick={() => alert('Отправить клиенту подтверждение')}
            >
              Отправить подтверждение
            </CrmButton>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Форма бронирования услуги с выбором времени, мастера и дополнительными настройками',
      },
    },
  },
};

// Форма настроек профиля
export const ProfileSettings: Story = {
  render: () => {
    const [profileData, setProfileData] = useState<{
      workingDays: string[];
      workingHours: {
        start: any;
        end: any;
      };
      notifications: {
        email: boolean;
        sms: boolean;
        push: boolean;
        reminders: boolean;
      };
      language: string;
      theme: string;
      autoBackup: boolean;
    }>({
      workingDays: ['mon', 'tue', 'wed', 'thu', 'fri'],
      workingHours: {
        start: dayjs('09:00', 'HH:mm'),
        end: dayjs('18:00', 'HH:mm'),
      },
      notifications: {
        email: true,
        sms: false,
        push: true,
        reminders: true,
      },
      language: 'ru',
      theme: 'light',
      autoBackup: true,
    });

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '24px', color: '#333' }}>Настройки профиля</h2>
        
        <div style={{ display: 'grid', gap: '24px' }}>
          {/* Рабочие дни */}
          <CrmCheckboxGroup
            title="Рабочие дни"
            options={[
              { label: 'Понедельник', value: 'mon' },
              { label: 'Вторник', value: 'tue' },
              { label: 'Среда', value: 'wed' },
              { label: 'Четверг', value: 'thu' },
              { label: 'Пятница', value: 'fri' },
              { label: 'Суббота', value: 'sat' },
              { label: 'Воскресенье', value: 'sun' },
            ]}
            value={profileData.workingDays}
            onChange={(days: any) => setProfileData({...profileData, workingDays: days as string[]})}
            direction="horizontal"
            helperText="Выберите дни, когда вы принимаете клиентов"
          />

          {/* Рабочие часы */}
          <div>
            <h4 style={{ marginBottom: '12px', color: '#333' }}>Рабочие часы</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <CrmTimePicker
                label="Начало работы"
                value={profileData.workingHours.start}
                onChange={(time) => setProfileData({
                  ...profileData, 
                  workingHours: {...profileData.workingHours, start: time}
                })}
                format="HH:mm"
              />
              <CrmTimePicker
                label="Окончание работы"
                value={profileData.workingHours.end}
                onChange={(time) => setProfileData({
                  ...profileData, 
                  workingHours: {...profileData.workingHours, end: time}
                })}
                format="HH:mm"
              />
            </div>
          </div>

          {/* Уведомления */}
          <div>
            <h4 style={{ marginBottom: '12px', color: '#333' }}>Уведомления</h4>
            <div style={{ display: 'grid', gap: '8px' }}>
              <CrmCheckbox
                label="Email уведомления"
                checked={profileData.notifications.email}
                onChange={(e) => setProfileData({
                  ...profileData,
                  notifications: {...profileData.notifications, email: e.target.checked}
                })}
                helperText="Получать уведомления на почту"
              />
              <CrmCheckbox
                label="SMS уведомления"
                checked={profileData.notifications.sms}
                onChange={(e) => setProfileData({
                  ...profileData,
                  notifications: {...profileData.notifications, sms: e.target.checked}
                })}
                helperText="Получать SMS о важных событиях"
              />
              <CrmCheckbox
                label="Push уведомления"
                checked={profileData.notifications.push}
                onChange={(e) => setProfileData({
                  ...profileData,
                  notifications: {...profileData.notifications, push: e.target.checked}
                })}
                helperText="Уведомления в браузере"
              />
              <CrmCheckbox
                label="Напоминания о записях"
                checked={profileData.notifications.reminders}
                onChange={(e) => setProfileData({
                  ...profileData,
                  notifications: {...profileData.notifications, reminders: e.target.checked}
                })}
                helperText="Напоминания за 15 минут до приема"
              />
            </div>
          </div>

          {/* Интерфейс */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <CrmSelect
              label="Язык интерфейса"
              options={[
                { label: 'Русский', value: 'ru' },
                { label: 'English', value: 'en' },
                { label: 'Español', value: 'es' },
              ]}
              value={profileData.language}
              onChange={(value) => setProfileData({...profileData, language: value})}
            />

            <CrmRadioGroup
              title="Тема оформления"
              options={[
                { label: 'Светлая', value: 'light' },
                { label: 'Темная', value: 'dark' },
                { label: 'Автоматически', value: 'auto' },
              ]}
              value={profileData.theme}
              onChange={(value: any) => setProfileData({...profileData, theme: value.target.value})}
              direction="horizontal"
            />
          </div>

          {/* Дополнительные настройки */}
          <CrmCheckbox
            label="Автоматическое резервное копирование"
            checked={profileData.autoBackup}
            onChange={(e) => setProfileData({...profileData, autoBackup: e.target.checked})}
            helperText="Ежедневное сохранение данных в облако"
          />

          {/* Кнопки */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <CrmButton
              variant="primary"
              onClick={() => alert('Настройки сохранены!')}
              style={{ flex: 1 }}
            >
              Сохранить настройки
            </CrmButton>
            <CrmButton
              variant="ghost"
              onClick={() => alert('Настройки сброшены к значениям по умолчанию')}
            >
              Сбросить
            </CrmButton>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Форма настроек профиля с рабочим временем, уведомлениями и персонализацией',
      },
    },
  },
};

// Форма отчета
export const SalesReport: Story = {
  render: () => {
    const [reportData, setReportData] = useState<{
      dateRange: any;
      reportType: string;
      services: string[];
      masters: string[];
      clients: string;
      includeDetails: boolean;
      format: string;
      email: string;
    }>({
      dateRange: null,
      reportType: 'summary',
      services: [],
      masters: [],
      clients: 'all',
      includeDetails: false,
      format: 'pdf',
      email: '',
    });

    return (
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '24px', color: '#333' }}>Отчет по продажам</h2>
        
        <div style={{ display: 'grid', gap: '20px' }}>
          {/* Период отчета */}
          <CrmDateRangePicker
            label="Период отчета"
            placeholder={['Дата начала', 'Дата окончания']}
            value={reportData.dateRange}
            onChange={(range) => setReportData({...reportData, dateRange: range})}
            helperText="Выберите период для анализа продаж"
            required
          />

          {/* Тип отчета */}
          <CrmRadioGroup
            title="Тип отчета"
            options={[
              { 
                label: 'Сводный', 
                value: 'summary',
                description: 'Общая статистика за период'
              },
              { 
                label: 'Детальный', 
                value: 'detailed',
                description: 'Подробная информация по каждой услуге'
              },
              { 
                label: 'По мастерам', 
                value: 'by_masters',
                description: 'Анализ работы каждого мастера'
              },
              { 
                label: 'По клиентам', 
                value: 'by_clients',
                description: 'Активность и предпочтения клиентов'
              },
            ]}
            value={reportData.reportType}
            onChange={(value: any) => setReportData({...reportData, reportType: value.target.value})}
            variant="card"
            required
          />

          {/* Фильтры */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <CrmSelect
              label="Услуги"
              placeholder="Все услуги"
              options={[
                { label: 'Стрижка', value: 'haircut' },
                { label: 'Окрашивание', value: 'coloring' },
                { label: 'Укладка', value: 'styling' },
                { label: 'Маникюр', value: 'manicure' },
                { label: 'Педикюр', value: 'pedicure' },
              ]}
              value={reportData.services}
              onChange={(value) => setReportData({...reportData, services: value})}
              mode="multiple"
              helperText="Оставьте пустым для всех услуг"
            />

            <CrmSelect
              label="Мастера"
              placeholder="Все мастера"
              options={[
                { label: 'Светлана Иванова', value: 'svetlana' },
                { label: 'Ольга Смирнова', value: 'olga' },
                { label: 'Наталья Петрова', value: 'natalia' },
              ]}
              value={reportData.masters}
              onChange={(value) => setReportData({...reportData, masters: value})}
              mode="multiple"
              helperText="Оставьте пустым для всех мастеров"
            />
          </div>

          {/* Дополнительные параметры */}
          <CrmRadioGroup
            title="Клиенты"
            options={[
              { label: 'Все клиенты', value: 'all' },
              { label: 'Только новые', value: 'new' },
              { label: 'Только постоянные', value: 'regular' },
            ]}
            value={reportData.clients}
            onChange={(value: any) => setReportData({...reportData, clients: value.target.value})}
            direction="horizontal"
          />

          <CrmCheckbox
            label="Включить детализацию по каждой записи"
            checked={reportData.includeDetails}
            onChange={(e) => setReportData({...reportData, includeDetails: e.target.checked})}
            helperText="Добавит таблицу со всеми записями за период"
          />

          {/* Формат и доставка */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
            <CrmSelect
              label="Формат файла"
              options={[
                { label: 'PDF документ', value: 'pdf' },
                { label: 'Excel таблица', value: 'excel' },
                { label: 'CSV файл', value: 'csv' },
              ]}
              value={reportData.format}
              onChange={(value) => setReportData({...reportData, format: value})}
            />

            <CrmInput
              label="Email для отправки (опционально)"
              type="email"
              placeholder="report@salon.com"
              value={reportData.email}
              onChange={(e) => setReportData({...reportData, email: e.target.value})}
              helperText="Отчет будет отправлен на указанную почту"
            />
          </div>

          {/* Кнопки */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <CrmButton
              variant="primary"
              size="large"
              onClick={() => alert('Отчет формируется...')}
              style={{ flex: 1 }}
            >
              Сформировать отчет
            </CrmButton>
            <CrmButton
              variant="secondary"
              size="large"
              onClick={() => alert('Предварительный просмотр')}
            >
              Предпросмотр
            </CrmButton>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Форма генерации отчетов с фильтрами, параметрами и настройками экспорта',
      },
    },
  },
};