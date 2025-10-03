// src/stories/DesignSystem/Forms/CrmInput.stories.tsx
import type { Meta, StoryObj } from '@storybook/react/*';
import { CrmInput } from '../../../components/CrmInput/CrmInput';

const meta: Meta<typeof CrmInput> = {
  title: 'Design System/Forms/CrmInput',
  component: CrmInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## CrmInput

Базовый компонент поля ввода для CRM системы на основе Ant Design Input.

### Особенности:
- Поддержка лейбла и обязательных полей
- Встроенная валидация с отображением ошибок
- Подсказки (helper text)
- Префиксы и суффиксы (иконки, текст)
- Различные типы полей (text, email, password, number)
- Полная интеграция с Ant Design темой

### Основное применение:
- Формы регистрации и авторизации
- Поля поиска
- Ввод персональных данных
- Настройки пользователя
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Метка поля',
    },
    placeholder: {
      control: 'text',
      description: 'Подсказка для пользователя',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel'],
      description: 'Тип поля ввода',
    },
    required: {
      control: 'boolean',
      description: 'Обязательное поле',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключенное состояние',
    },
    error: {
      control: 'text',
      description: 'Текст ошибки',
    },
    helperText: {
      control: 'text',
      description: 'Дополнительная подсказка',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Полная ширина контейнера',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Имя пользователя',
    placeholder: 'Введите имя',
  },
};

export const Required: Story = {
  args: {
    label: 'Email (обязательно)',
    placeholder: 'example@email.com',
    type: 'email',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Пароль',
    placeholder: 'Введите пароль',
    type: 'password',
    required: true,
    error: 'Пароль должен содержать минимум 8 символов',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Телефон',
    placeholder: '+7 (999) 123-45-67',
    type: 'tel',
    helperText: 'Введите номер в формате +7 (999) 123-45-67',
  },
};

export const Disabled: Story = {
  args: {
    label: 'ID пользователя',
    value: 'USER_12345',
    disabled: true,
    helperText: 'Это поле генерируется автоматически',
  },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '16px', maxWidth: '400px' }}>
      <CrmInput
        label="Текстовое поле"
        placeholder="Введите текст"
        type="text"
      />
      <CrmInput
        label="Email"
        placeholder="example@email.com"
        type="email"
      />
      <CrmInput
        label="Пароль"
        placeholder="Введите пароль"
        type="password"
      />
      <CrmInput
        label="Номер"
        placeholder="123"
        type="number"
      />
      <CrmInput
        label="Телефон"
        placeholder="+7 (999) 123-45-67"
        type="tel"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация различных типов полей ввода',
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '16px', maxWidth: '400px' }}>
      <CrmInput
        label="Обычное поле"
        placeholder="Введите значение"
      />
      <CrmInput
        label="Обязательное поле"
        placeholder="Обязательно к заполнению"
        required
      />
      <CrmInput
        label="Поле с ошибкой"
        placeholder="Поле с ошибкой"
        error="Это поле обязательно для заполнения"
        value=""
      />
      <CrmInput
        label="Поле с подсказкой"
        placeholder="Поле с helper text"
        helperText="Дополнительная информация о поле"
      />
      <CrmInput
        label="Отключенное поле"
        value="Недоступно для редактирования"
        disabled
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация всех возможных состояний поля ввода',
      },
    },
  },
};