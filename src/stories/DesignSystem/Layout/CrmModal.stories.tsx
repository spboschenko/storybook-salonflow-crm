// src/stories/DesignSystem/Layout/CrmModal.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { CrmModal } from '../../../components/CrmModal/CrmModal';

const meta: Meta<typeof CrmModal> = {
  title: 'Design System/Layout/CrmModal',
  component: CrmModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Универсальный компонент модального окна для CRM системы. Обеспечивает единообразие модальных окон по всему приложению.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Показывать ли модальное окно',
    },
    title: {
      control: 'text',
      description: 'Заголовок модального окна',
    },
    showSaveButton: {
      control: 'boolean',
      description: 'Показывать ли кнопку "Сохранить"',
    },
    showCancelButton: {
      control: 'boolean',
      description: 'Показывать ли кнопку "Отмена"',
    },
    saveLoading: {
      control: 'boolean',
      description: 'Загружается ли сохранение',
    },
    width: {
      control: 'number',
      description: 'Ширина модального окна',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Компонент-обертка для демонстрации работы с состоянием
const ModalDemo = ({ modalProps, triggerText }: any) => {
  const [open, setOpen] = useState(false);

  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);
  const handleSave = () => {
    console.log('Сохранение...');
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {triggerText || 'Открыть модальное окно'}
      </Button>
      <CrmModal
        {...modalProps}
        open={open}
        onCancel={handleCancel}
        onSave={handleSave}
      />
    </>
  );
};

// Stories
export const Default: Story = {
  render: (args) => (
    <ModalDemo
      modalProps={args}
      triggerText="Базовое модальное окно"
    />
  ),
  args: {
    title: 'Базовое модальное окно',
    children: (
      <div>
        <p>Это содержимое модального окна.</p>
        <p>Здесь может быть любой контент: формы, таблицы, текст и т.д.</p>
      </div>
    ),
  },
};

export const WithForm: Story = {
  render: (args) => (
    <ModalDemo
      modalProps={args}
      triggerText="Модальное окно с формой"
    />
  ),
  args: {
    title: 'Добавить нового клиента',
    width: 700,
    children: (
      <Form layout="vertical">
        <Form.Item label="Имя" name="firstName" required>
          <Input placeholder="Введите имя" />
        </Form.Item>
        <Form.Item label="Фамилия" name="lastName" required>
          <Input placeholder="Введите фамилию" />
        </Form.Item>
        <Form.Item label="Телефон" name="phone" required>
          <Input placeholder="+7 (999) 123-45-67" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" placeholder="email@example.com" />
        </Form.Item>
        <Form.Item label="Предпочтительный способ связи" name="contactMethod">
          <Select
            placeholder="Выберите способ связи"
            options={[
              { label: 'Телефон', value: 'phone' },
              { label: 'Email', value: 'email' },
              { label: 'SMS', value: 'sms' },
            ]}
          />
        </Form.Item>
      </Form>
    ),
  },
};

export const Loading: Story = {
  render: (args) => (
    <ModalDemo
      modalProps={args}
      triggerText="Модальное окно с загрузкой"
    />
  ),
  args: {
    title: 'Сохранение данных',
    saveLoading: true,
    children: (
      <div>
        <p>Пожалуйста, подождите. Данные сохраняются...</p>
      </div>
    ),
  },
};

export const CustomButtons: Story = {
  render: (args) => (
    <ModalDemo
      modalProps={args}
      triggerText="Кастомные кнопки"
    />
  ),
  args: {
    title: 'Удаление клиента',
    footerButtons: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button>Отмена</Button>
        <Button type="primary" danger>
          Удалить
        </Button>
        <Button type="default">
          Архивировать
        </Button>
      </div>
    ),
    children: (
      <div>
        <p>Вы уверены, что хотите удалить клиента "Анна Петрова"?</p>
        <p style={{ color: '#ff4d4f' }}>
          <strong>Внимание:</strong> Это действие нельзя отменить.
        </p>
      </div>
    ),
  },
};

export const WithoutFooter: Story = {
  render: (args) => (
    <ModalDemo
      modalProps={args}
      triggerText="Без футера"
    />
  ),
  args: {
    title: 'Информационное окно',
    showSaveButton: false,
    showCancelButton: false,
    children: (
      <div>
        <p>Это информационное модальное окно без кнопок в футере.</p>
        <p>Закрыть его можно только по клику на крестик или по Escape.</p>
      </div>
    ),
  },
};

export const Wide: Story = {
  render: (args) => (
    <ModalDemo
      modalProps={args}
      triggerText="Широкое модальное окно"
    />
  ),
  args: {
    title: 'Широкое модальное окно',
    width: 1000,
    children: (
      <div>
        <p>Это широкое модальное окно для отображения большого количества контента.</p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '16px',
          marginTop: '16px' 
        }}>
          <div>
            <h4>Левая колонка</h4>
            <p>Содержимое левой колонки</p>
          </div>
          <div>
            <h4>Правая колонка</h4>
            <p>Содержимое правой колонки</p>
          </div>
        </div>
      </div>
    ),
  },
};

export const CustomTexts: Story = {
  render: (args) => (
    <ModalDemo
      modalProps={args}
      triggerText="Кастомные тексты кнопок"
    />
  ),
  args: {
    title: 'Подтверждение записи',
    saveButtonText: 'Подтвердить',
    cancelButtonText: 'Пропустить',
    children: (
      <div>
        <p>Подтвердить запись клиента на груминг?</p>
        <ul>
          <li>Клиент: Анна Петрова</li>
          <li>Питомец: Барсик (кот)</li>
          <li>Услуга: Полный груминг</li>
          <li>Дата: 15 октября 2025, 14:00</li>
          <li>Стоимость: 3000 ₽</li>
        </ul>
      </div>
    ),
  },
};