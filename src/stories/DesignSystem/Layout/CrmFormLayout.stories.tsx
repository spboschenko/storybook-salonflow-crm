// src/stories/DesignSystem/Layout/CrmFormLayout.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Form, Input, Select, DatePicker, Switch, InputNumber, Button } from 'antd';
import { CrmFormLayout } from '../../../components/CrmFormLayout/CrmFormLayout';

const { TextArea } = Input;
const { Option } = Select;

const meta: Meta<typeof CrmFormLayout> = {
  title: 'Design System/Layout/CrmFormLayout',
  component: CrmFormLayout,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Универсальный компонент макета формы для CRM системы. Обеспечивает единообразие форм по всему приложению.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Заголовок формы',
    },
    description: {
      control: 'text',
      description: 'Описание формы',
    },
    showFooter: {
      control: 'boolean',
      description: 'Показывать ли кнопки в футере',
    },
    wrapped: {
      control: 'boolean',
      description: 'Оборачивать ли в Card',
    },
    submitLoading: {
      control: 'boolean',
      description: 'Загружается ли отправка',
    },
    submitDisabled: {
      control: 'boolean',
      description: 'Отключить ли кнопку отправки',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Базовые поля формы клиента
const ClientFormFields = () => (
  <>
    <Form.Item label="Имя" name="firstName" rules={[{ required: true, message: 'Введите имя' }]}>
      <Input placeholder="Введите имя" />
    </Form.Item>
    <Form.Item label="Фамилия" name="lastName" rules={[{ required: true, message: 'Введите фамилию' }]}>
      <Input placeholder="Введите фамилию" />
    </Form.Item>
    <Form.Item label="Телефон" name="phone" rules={[{ required: true, message: 'Введите телефон' }]}>
      <Input placeholder="+7 (999) 123-45-67" />
    </Form.Item>
    <Form.Item label="Email" name="email" rules={[{ type: 'email', message: 'Неверный формат email' }]}>
      <Input placeholder="email@example.com" />
    </Form.Item>
    <Form.Item label="Предпочтительный способ связи" name="contactMethod">
      <Select placeholder="Выберите способ связи">
        <Option value="phone">Телефон</Option>
        <Option value="email">Email</Option>
        <Option value="sms">SMS</Option>
      </Select>
    </Form.Item>
    <Form.Item label="Заметки" name="notes">
      <TextArea rows={3} placeholder="Дополнительная информация о клиенте" />
    </Form.Item>
  </>
);

// Stories
export const Default: Story = {
  args: {
    title: 'Добавить клиента',
    description: 'Заполните форму для добавления нового клиента в систему',
    onSubmit: (values) => console.log('Form submitted:', values),
    onCancel: () => console.log('Form cancelled'),
    children: <ClientFormFields />,
  },
};

export const WithoutCard: Story = {
  args: {
    title: 'Редактировать клиента',
    description: 'Внесите необходимые изменения в данные клиента',
    wrapped: false,
    onSubmit: (values) => console.log('Form submitted:', values),
    children: <ClientFormFields />,
  },
};

export const WithoutFooter: Story = {
  args: {
    title: 'Просмотр клиента',
    description: 'Информация о клиенте (только для чтения)',
    showFooter: false,
    children: <ClientFormFields />,
  },
};

export const Loading: Story = {
  args: {
    title: 'Сохранение данных',
    description: 'Пожалуйста, подождите. Данные сохраняются...',
    submitLoading: true,
    onSubmit: (values) => console.log('Form submitted:', values),
    children: <ClientFormFields />,
  },
};

export const CustomButtons: Story = {
  args: {
    title: 'Создать услугу',
    description: 'Настройте параметры новой услуги',
    footerButtons: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button>Сохранить как черновик</Button>
        <Button type="primary">Создать и активировать</Button>
      </div>
    ),
    children: (
      <>
        <Form.Item label="Название услуги" name="name" rules={[{ required: true }]}>
          <Input placeholder="Например: Полный груминг" />
        </Form.Item>
        <Form.Item label="Описание" name="description">
          <TextArea rows={3} placeholder="Подробное описание услуги" />
        </Form.Item>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Form.Item label="Цена (₽)" name="price" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: '100%' }} placeholder="3000" />
          </Form.Item>
          <Form.Item label="Длительность (мин)" name="duration" rules={[{ required: true }]}>
            <InputNumber min={15} style={{ width: '100%' }} placeholder="90" />
          </Form.Item>
        </div>
        <Form.Item label="Категория" name="category" rules={[{ required: true }]}>
          <Select placeholder="Выберите категорию">
            <Option value="grooming">Груминг</Option>
            <Option value="bathing">Мытье</Option>
            <Option value="nails">Стрижка когтей</Option>
            <Option value="teeth">Чистка зубов</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Активна" name="isActive" valuePropName="checked">
          <Switch />
        </Form.Item>
      </>
    ),
  },
};

export const TwoColumn: Story = {
  args: {
    title: 'Регистрация питомца',
    description: 'Внесите подробную информацию о питомце для ведения медицинской карты',
    maxWidth: '800px',
    onSubmit: (values) => console.log('Pet form submitted:', values),
    children: (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Form.Item label="Кличка" name="name" rules={[{ required: true }]}>
            <Input placeholder="Барсик" />
          </Form.Item>
          <Form.Item label="Порода" name="breed" rules={[{ required: true }]}>
            <Input placeholder="Британская короткошерстная" />
          </Form.Item>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <Form.Item label="Вид животного" name="species" rules={[{ required: true }]}>
            <Select placeholder="Выберите вид">
              <Option value="cat">Кошка</Option>
              <Option value="dog">Собака</Option>
              <Option value="rabbit">Кролик</Option>
              <Option value="bird">Птица</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Размер" name="size" rules={[{ required: true }]}>
            <Select placeholder="Размер">
              <Option value="XS">XS</Option>
              <Option value="S">S</Option>
              <Option value="M">M</Option>
              <Option value="L">L</Option>
              <Option value="XL">XL</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Возраст (лет)" name="age">
            <InputNumber min={0} max={50} style={{ width: '100%' }} />
          </Form.Item>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Form.Item label="Вес (кг)" name="weight">
            <InputNumber min={0} precision={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Окрас" name="color">
            <Input placeholder="Описание окраса" />
          </Form.Item>
        </div>

        <Form.Item label="Особенности поведения" name="behaviorNotes">
          <TextArea rows={3} placeholder="Агрессивность, боязливость, особые привычки..." />
        </Form.Item>

        <Form.Item label="Медицинские особенности" name="medicalNotes">
          <TextArea rows={3} placeholder="Аллергии, хронические заболевания, принимаемые лекарства..." />
        </Form.Item>
      </>
    ),
  },
};

export const Appointment: Story = {
  args: {
    title: 'Запись на прием',
    description: 'Создайте новую запись для клиента',
    submitButtonText: 'Записать',
    cancelButtonText: 'Отмена',
    onSubmit: (values) => console.log('Appointment submitted:', values),
    children: (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Form.Item label="Клиент" name="clientId" rules={[{ required: true }]}>
            <Select placeholder="Выберите клиента">
              <Option value="1">Анна Петрова</Option>
              <Option value="2">Михаил Иванов</Option>
              <Option value="3">Елена Сидорова</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Питомец" name="petId" rules={[{ required: true }]}>
            <Select placeholder="Выберите питомца">
              <Option value="1">Барсик (кот)</Option>
              <Option value="2">Рекс (собака)</Option>
              <Option value="3">Мурка (кошка)</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item label="Услуги" name="services" rules={[{ required: true }]}>
          <Select mode="multiple" placeholder="Выберите услуги">
            <Option value="grooming">Полный груминг</Option>
            <Option value="bathing">Мытье и сушка</Option>
            <Option value="nails">Стрижка когтей</Option>
            <Option value="teeth">Чистка зубов</Option>
          </Select>
        </Form.Item>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Form.Item label="Дата и время" name="datetime" rules={[{ required: true }]}>
            <DatePicker 
              showTime 
              style={{ width: '100%' }}
              placeholder="Выберите дату и время"
            />
          </Form.Item>
          <Form.Item label="Длительность (мин)" name="duration">
            <InputNumber min={30} style={{ width: '100%' }} placeholder="90" />
          </Form.Item>
        </div>

        <Form.Item label="Особые пожелания" name="specialRequests">
          <TextArea rows={2} placeholder="Дополнительные пожелания клиента" />
        </Form.Item>

        <Form.Item label="Заметки" name="notes">
          <TextArea rows={2} placeholder="Внутренние заметки" />
        </Form.Item>
      </>
    ),
  },
};