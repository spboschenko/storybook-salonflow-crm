// src/stories/DesignSystem/Forms/CrmSelect.stories.tsx
import type { Meta, StoryObj } from '@storybook/react/*';
import { CrmSelect } from '../../../components/CrmSelect/CrmSelect';

const meta: Meta<typeof CrmSelect> = {
  title: 'Design System/Forms/CrmSelect',
  component: CrmSelect,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## CrmSelect

Базовый компонент выпадающего списка для CRM системы на основе Ant Design Select.

### Особенности:
- Поддержка лейбла и обязательных полей
- Встроенная валидация с отображением ошибок
- Подсказки (helper text)
- Поиск по опциям
- Множественный выбор
- Состояния загрузки
- Группировка опций

### Основное применение:
- Выбор значений из предопределенного списка
- Категории и теги
- Настройки и фильтры
- Связанные данные
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
    required: {
      control: 'boolean',
      description: 'Обязательное поле',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключенное состояние',
    },
    loading: {
      control: 'boolean',
      description: 'Состояние загрузки',
    },
    showSearch: {
      control: 'boolean',
      description: 'Показать поиск',
    },
    error: {
      control: 'text',
      description: 'Текст ошибки',
    },
    helperText: {
      control: 'text',
      description: 'Дополнительная подсказка',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const cityOptions = [
  { label: 'Москва', value: 'moscow' },
  { label: 'Санкт-Петербург', value: 'spb' },
  { label: 'Новосибирск', value: 'novosibirsk' },
  { label: 'Екатеринбург', value: 'ekaterinburg' },
  { label: 'Казань', value: 'kazan' },
];

const serviceOptions = [
  { label: 'Стрижка', value: 'haircut' },
  { label: 'Окрашивание', value: 'coloring' },
  { label: 'Укладка', value: 'styling' },
  { label: 'Маникюр', value: 'manicure' },
  { label: 'Педикюр', value: 'pedicure' },
];

export const Default: Story = {
  args: {
    label: 'Выберите город',
    placeholder: 'Выберите город',
    options: cityOptions,
  },
};

export const Required: Story = {
  args: {
    label: 'Услуга (обязательно)',
    placeholder: 'Выберите услугу',
    options: serviceOptions,
    required: true,
  },
};

export const WithSearch: Story = {
  args: {
    label: 'Город с поиском',
    placeholder: 'Начните вводить название',
    options: cityOptions,
    showSearch: true,
    helperText: 'Вы можете найти город по названию',
  },
};

export const MultipleSelect: Story = {
  args: {
    label: 'Множественный выбор',
    placeholder: 'Выберите несколько услуг',
    options: serviceOptions,
    mode: 'multiple',
    helperText: 'Можно выбрать несколько вариантов',
  },
};

export const WithError: Story = {
  args: {
    label: 'Обязательное поле',
    placeholder: 'Выберите значение',
    options: cityOptions,
    required: true,
    error: 'Поле обязательно для заполнения',
  },
};

export const Loading: Story = {
  args: {
    label: 'Загрузка данных',
    placeholder: 'Загружаем список...',
    options: [],
    loading: true,
    helperText: 'Данные загружаются с сервера',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Отключенное поле',
    value: 'moscow',
    options: cityOptions,
    disabled: true,
    helperText: 'Поле недоступно для изменения',
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '16px', maxWidth: '400px' }}>
      <CrmSelect
        label="Обычный выбор"
        placeholder="Выберите значение"
        options={cityOptions}
      />
      <CrmSelect
        label="Обязательное поле"
        placeholder="Обязательно к заполнению"
        options={serviceOptions}
        required
      />
      <CrmSelect
        label="С поиском"
        placeholder="Поиск по списку"
        options={cityOptions}
        showSearch
      />
      <CrmSelect
        label="Множественный выбор"
        placeholder="Несколько значений"
        options={serviceOptions}
        mode="multiple"
      />
      <CrmSelect
        label="С ошибкой"
        placeholder="Поле с ошибкой"
        options={cityOptions}
        error="Поле обязательно для заполнения"
      />
      <CrmSelect
        label="Загрузка"
        placeholder="Загружаем..."
        options={[]}
        loading
      />
      <CrmSelect
        label="Отключенное"
        value="moscow"
        options={cityOptions}
        disabled
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация всех возможных состояний выпадающего списка',
      },
    },
  },
};