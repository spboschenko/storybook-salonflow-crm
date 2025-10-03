// src/stories/DesignSystem/Forms/CrmCheckbox.stories.tsx
import type { Meta, StoryObj } from '@storybook/react/*';
import { CrmCheckbox, CrmCheckboxGroup } from '../../../components/CrmCheckbox/CrmCheckbox';

const meta: Meta<typeof CrmCheckbox> = {
  title: 'Design System/Forms/CrmCheckbox',
  component: CrmCheckbox,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## CrmCheckbox

Базовый компонент чекбокса для CRM системы на основе Ant Design Checkbox.

### Особенности:
- Поддержка различных вариантов отображения (default, button, card)
- Разные размеры (small, medium, large)
- Встроенная валидация с отображением ошибок
- Подсказки (helper text)
- Промежуточное состояние (indeterminate)
- Группировка чекбоксов с общими настройками

### Основное применение:
- Выбор одного или нескольких элементов
- Согласие с условиями
- Настройки пользователя
- Фильтры и параметры поиска
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Метка чекбокса',
    },
    checked: {
      control: 'boolean',
      description: 'Состояние выбора',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключенное состояние',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Промежуточное состояние',
    },
    error: {
      control: 'text',
      description: 'Текст ошибки',
    },
    helperText: {
      control: 'text',
      description: 'Дополнительная подсказка',
    },
    variant: {
      control: 'select',
      options: ['default', 'button', 'card'],
      description: 'Вариант отображения',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Размер компонента',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Согласен с условиями',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Выбранный чекбокс',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Отключенный чекбокс',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Отключенный выбранный',
    disabled: true,
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Промежуточное состояние',
    indeterminate: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Обязательное согласие',
    checked: false,
    error: 'Необходимо согласиться с условиями',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Получать уведомления',
    helperText: 'Вы сможете изменить это в настройках позже',
  },
};

export const ButtonVariant: Story = {
  args: {
    label: 'Кнопка-чекбокс',
    variant: 'button',
  },
};

export const CardVariant: Story = {
  args: {
    label: 'Карточка-чекбокс',
    variant: 'card',
    helperText: 'Выберите этот вариант для продолжения',
  },
};

// Истории для разных размеров
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CrmCheckbox label="Маленький чекбокс" size="small" />
      <CrmCheckbox label="Средний чекбокс" size="medium" />
      <CrmCheckbox label="Большой чекбокс" size="large" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация различных размеров чекбокса',
      },
    },
  },
};

// Истории для различных вариантов
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CrmCheckbox label="Обычный чекбокс" variant="default" />
      <CrmCheckbox label="Кнопка-чекбокс" variant="button" />
      <CrmCheckbox label="Карточка-чекбокс" variant="card" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация различных вариантов отображения',
      },
    },
  },
};

// История для группы чекбоксов
export const CheckboxGroup: Story = {
  render: () => (
    <CrmCheckboxGroup
      title="Выберите услуги"
      options={[
        { label: 'Стрижка', value: 'haircut' },
        { label: 'Окрашивание', value: 'coloring' },
        { label: 'Укладка', value: 'styling' },
        { label: 'Маникюр', value: 'manicure' },
        { label: 'Педикюр', value: 'pedicure', disabled: true },
      ]}
      value={['haircut', 'coloring']}
      helperText="Можно выбрать несколько услуг"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Группа связанных чекбоксов с общими настройками',
      },
    },
  },
};

export const CheckboxGroupHorizontal: Story = {
  render: () => (
    <CrmCheckboxGroup
      title="Дни недели"
      direction="horizontal"
      options={[
        { label: 'Пн', value: 'mon' },
        { label: 'Вт', value: 'tue' },
        { label: 'Ср', value: 'wed' },
        { label: 'Чт', value: 'thu' },
        { label: 'Пт', value: 'fri' },
        { label: 'Сб', value: 'sat' },
        { label: 'Вс', value: 'sun' },
      ]}
      value={['mon', 'tue', 'wed', 'thu', 'fri']}
      helperText="Выберите рабочие дни"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Горизонтальное расположение группы чекбоксов',
      },
    },
  },
};

export const CheckboxGroupWithError: Story = {
  render: () => (
    <CrmCheckboxGroup
      title="Обязательные соглашения"
      options={[
        { label: 'Пользовательское соглашение', value: 'terms' },
        { label: 'Политика конфиденциальности', value: 'privacy' },
        { label: 'Согласие на обработку данных', value: 'data' },
      ]}
      value={['terms']}
      error="Необходимо согласиться со всеми пунктами"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Группа чекбоксов с отображением ошибки валидации',
      },
    },
  },
};

// Демонстрация всех состояний
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '24px', maxWidth: '600px' }}>
      <div>
        <h4>Обычные чекбоксы</h4>
        <CrmCheckbox label="Не выбран" />
        <CrmCheckbox label="Выбран" checked />
        <CrmCheckbox label="Промежуточное состояние" indeterminate />
        <CrmCheckbox label="Отключен" disabled />
        <CrmCheckbox label="Отключен и выбран" disabled checked />
      </div>

      <div>
        <h4>С дополнительной информацией</h4>
        <CrmCheckbox 
          label="С подсказкой" 
          helperText="Дополнительная информация" 
        />
        <CrmCheckbox 
          label="С ошибкой" 
          error="Обязательное поле" 
        />
      </div>

      <div>
        <h4>Кнопки-чекбоксы</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <CrmCheckbox label="Опция 1" variant="button" />
          <CrmCheckbox label="Опция 2" variant="button" checked />
          <CrmCheckbox label="Отключена" variant="button" disabled />
        </div>
      </div>

      <div>
        <h4>Карточки-чекбоксы</h4>
        <CrmCheckbox label="Базовый план" variant="card" />
        <CrmCheckbox label="Премиум план" variant="card" checked />
        <CrmCheckbox label="Недоступный план" variant="card" disabled />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация всех возможных состояний и вариантов чекбоксов',
      },
    },
  },
};