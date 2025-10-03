// src/stories/DesignSystem/Forms/CrmDatePicker.stories.tsx
import type { Meta, StoryObj } from '@storybook/react/*';
import { CrmDatePicker, CrmDateRangePicker, CrmTimePicker } from '../../../components/CrmDatePicker/CrmDatePicker';
import dayjs from 'dayjs';

const meta: Meta<typeof CrmDatePicker> = {
  title: 'Design System/Forms/CrmDatePicker',
  component: CrmDatePicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## CrmDatePicker

Набор компонентов для выбора даты и времени в CRM системе на основе Ant Design DatePicker.

### Включает:
- **CrmDatePicker** - выбор одной даты
- **CrmDateRangePicker** - выбор диапазона дат
- **CrmTimePicker** - выбор времени

### Особенности:
- Поддержка русской локализации
- Встроенная валидация с отображением ошибок
- Подсказки (helper text)
- Различные размеры компонентов
- Полная интеграция с формами
- Настраиваемые форматы даты и времени

### Основное применение:
- Бронирование и планирование
- Фильтры по датам в отчетах
- Формы регистрации событий
- Настройки периодов работы
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
    error: {
      control: 'text',
      description: 'Текст ошибки',
    },
    helperText: {
      control: 'text',
      description: 'Дополнительная подсказка',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Размер компонента',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Полная ширина контейнера',
    },
    showTime: {
      control: 'boolean',
      description: 'Показать выбор времени',
    },
    format: {
      control: 'text',
      description: 'Формат отображения даты',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Дата приема',
    placeholder: 'Выберите дату',
    fullWidth: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Дата рождения (обязательно)',
    placeholder: 'ДД.ММ.ГГГГ',
    required: true,
    format: 'DD.MM.YYYY',
  },
};

export const WithTime: Story = {
  args: {
    label: 'Дата и время встречи',
    placeholder: 'Выберите дату и время',
    showTime: true,
    format: 'DD.MM.YYYY HH:mm',
  },
};

export const WithError: Story = {
  args: {
    label: 'Дата начала',
    placeholder: 'Выберите дату',
    required: true,
    error: 'Дата начала обязательна для заполнения',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Предпочтительная дата',
    placeholder: 'Выберите удобную дату',
    helperText: 'Мы постараемся подобрать ближайшее свободное время',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Дата создания',
    value: dayjs('2024-01-15'),
    disabled: true,
    helperText: 'Дата автоматически устанавливается системой',
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Дата доставки',
    placeholder: 'Выберите дату доставки',
    defaultValue: dayjs().add(1, 'day'),
    helperText: 'По умолчанию установлена завтрашняя дата',
  },
};

// Истории для разных размеров
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CrmDatePicker 
        label="Маленький размер" 
        size="small"
        placeholder="Выберите дату"
      />
      <CrmDatePicker 
        label="Средний размер" 
        size="medium"
        placeholder="Выберите дату"
      />
      <CrmDatePicker 
        label="Большой размер" 
        size="large"
        placeholder="Выберите дату"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация различных размеров компонента даты',
      },
    },
  },
};

// История для диапазона дат
export const DateRange: Story = {
  render: () => (
    <CrmDateRangePicker
      label="Период отпуска"
      placeholder={['Дата начала', 'Дата окончания']}
      helperText="Выберите даты начала и окончания отпуска"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Компонент для выбора диапазона дат',
      },
    },
  },
};

export const DateRangeWithError: Story = {
  render: () => (
    <CrmDateRangePicker
      label="Период проекта"
      placeholder={['Дата начала', 'Дата окончания']}
      required
      error="Необходимо указать период выполнения проекта"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Диапазон дат с отображением ошибки',
      },
    },
  },
};

export const DateRangeWithTime: Story = {
  render: () => (
    <CrmDateRangePicker
      label="Период мероприятия"
      placeholder={['Начало', 'Окончание']}
      showTime={{ format: 'HH:mm' }}
      format="DD.MM.YYYY HH:mm"
      helperText="Укажите точное время начала и окончания"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Диапазон дат с выбором времени',
      },
    },
  },
};

// История для выбора времени
export const TimePicker: Story = {
  render: () => (
    <CrmTimePicker
      label="Время записи"
      placeholder="Выберите время"
      format="HH:mm"
      helperText="Выберите удобное время для записи"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Компонент для выбора времени',
      },
    },
  },
};

export const TimePickerWithError: Story = {
  render: () => (
    <CrmTimePicker
      label="Время начала работы"
      placeholder="ЧЧ:ММ"
      required
      error="Время начала работы обязательно для заполнения"
      format="HH:mm"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Выбор времени с отображением ошибки',
      },
    },
  },
};

export const TimePickerWithSeconds: Story = {
  render: () => (
    <CrmTimePicker
      label="Точное время"
      placeholder="ЧЧ:ММ:СС"
      format="HH:mm:ss"
      helperText="Выберите время с точностью до секунд"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Выбор времени с секундами',
      },
    },
  },
};

// Демонстрация всех компонентов
export const AllComponents: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '24px', maxWidth: '600px' }}>
      <div>
        <h4>Выбор даты</h4>
        <CrmDatePicker
          label="Дата события"
          placeholder="Выберите дату"
          helperText="Обычный выбор даты"
        />
      </div>

      <div>
        <h4>Дата с временем</h4>
        <CrmDatePicker
          label="Дата и время встречи"
          placeholder="Выберите дату и время"
          showTime={{ format: 'HH:mm' }}
          format="DD.MM.YYYY HH:mm"
          helperText="Выбор даты с указанием времени"
        />
      </div>

      <div>
        <h4>Диапазон дат</h4>
        <CrmDateRangePicker
          label="Период отчета"
          placeholder={['Начало периода', 'Конец периода']}
          helperText="Выберите диапазон дат для отчета"
        />
      </div>

      <div>
        <h4>Выбор времени</h4>
        <CrmTimePicker
          label="Время работы"
          placeholder="Выберите время"
          format="HH:mm"
          helperText="Укажите время начала работы"
        />
      </div>

      <div>
        <h4>С ошибками валидации</h4>
        <CrmDatePicker
          label="Обязательная дата"
          placeholder="Выберите дату"
          required
          error="Это поле обязательно для заполнения"
        />
      </div>

      <div>
        <h4>Отключенные поля</h4>
        <CrmDatePicker
          label="Дата создания"
          value={dayjs('2024-01-15')}
          disabled
          helperText="Поле недоступно для редактирования"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация всех компонентов для работы с датой и временем',
      },
    },
  },
};