// src/stories/DesignSystem/Forms/CrmRadio.stories.tsx
import type { Meta, StoryObj } from '@storybook/react/*';
import { CrmRadio, CrmRadioGroup } from '../../../components/CrmRadio/CrmRadio';

const meta: Meta<typeof CrmRadio> = {
  title: 'Design System/Forms/CrmRadio',
  component: CrmRadio,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## CrmRadio

Базовый компонент радиокнопки для CRM системы на основе Ant Design Radio.

### Особенности:
- Поддержка различных вариантов отображения (default, button, card)
- Разные размеры (small, medium, large)
- Описания для опций
- Группировка радиокнопок с общими настройками
- Горизонтальное и вертикальное расположение
- Встроенная валидация с отображением ошибок

### Основное применение:
- Выбор одного варианта из нескольких
- Настройки с взаимоисключающими опциями
- Форма с обязательным выбором
- Переключение режимов работы
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Метка радиокнопки',
    },
    description: {
      control: 'text',
      description: 'Текст описания',
    },
    checked: {
      control: 'boolean',
      description: 'Состояние выбора',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключенное состояние',
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
    value: {
      control: 'text',
      description: 'Значение радиокнопки',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Опция по умолчанию',
    value: 'default',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Премиум план',
    description: 'Включает все функции и приоритетную поддержку',
    value: 'premium',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Недоступная опция',
    description: 'Эта опция временно недоступна',
    disabled: true,
    value: 'disabled',
  },
};

export const ButtonVariant: Story = {
  args: {
    label: 'Кнопка-радио',
    description: 'Выглядит как кнопка',
    variant: 'button',
    value: 'button',
  },
};

export const CardVariant: Story = {
  args: {
    label: 'Карточка-радио',
    description: 'Отображается в виде карточки с детальным описанием',
    variant: 'card',
    value: 'card',
  },
};

// Истории для разных размеров
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CrmRadio 
        label="Маленькая радиокнопка" 
        description="Компактный размер"
        size="small" 
        value="small"
      />
      <CrmRadio 
        label="Средняя радиокнопка" 
        description="Стандартный размер"
        size="medium" 
        value="medium"
      />
      <CrmRadio 
        label="Большая радиокнопка" 
        description="Увеличенный размер для лучшей видимости"
        size="large" 
        value="large"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация различных размеров радиокнопок',
      },
    },
  },
};

// Истории для различных вариантов
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CrmRadio 
        label="Обычная радиокнопка" 
        description="Стандартный вид"
        variant="default" 
        value="default"
      />
      <CrmRadio 
        label="Кнопка-радио" 
        description="В виде кнопки"
        variant="button" 
        value="button"
      />
      <CrmRadio 
        label="Карточка-радио" 
        description="В виде карточки с расширенным описанием"
        variant="card" 
        value="card"
      />
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

// История для группы радиокнопок
export const RadioGroup: Story = {
  render: () => (
    <CrmRadioGroup
      title="Выберите план подписки"
      options={[
        { 
          label: 'Базовый', 
          value: 'basic',
          description: 'Основные функции для малого бизнеса'
        },
        { 
          label: 'Стандартный', 
          value: 'standard',
          description: 'Расширенные возможности и аналитика'
        },
        { 
          label: 'Премиум', 
          value: 'premium',
          description: 'Все функции + приоритетная поддержка'
        },
        { 
          label: 'Корпоративный', 
          value: 'enterprise',
          description: 'Индивидуальные решения для крупного бизнеса',
          disabled: true
        },
      ]}
      value="standard"
      helperText="Вы можете изменить план в любое время"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Группа связанных радиокнопок с общими настройками',
      },
    },
  },
};

export const RadioGroupHorizontal: Story = {
  render: () => (
    <CrmRadioGroup
      title="Способ доставки"
      direction="horizontal"
      options={[
        { label: 'Самовывоз', value: 'pickup' },
        { label: 'Курьер', value: 'courier' },
        { label: 'Почта', value: 'mail' },
      ]}
      value="courier"
      helperText="Выберите удобный способ получения"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Горизонтальное расположение группы радиокнопок',
      },
    },
  },
};

export const RadioGroupButtons: Story = {
  render: () => (
    <CrmRadioGroup
      title="Тип аккаунта"
      variant="button"
      direction="horizontal"
      options={[
        { 
          label: 'Личный', 
          value: 'personal',
          description: 'Для индивидуального использования'
        },
        { 
          label: 'Бизнес', 
          value: 'business',
          description: 'Для компании или предпринимательства'
        },
        { 
          label: 'Образование', 
          value: 'education',
          description: 'Для учебных заведений'
        },
      ]}
      value="business"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Группа радиокнопок в виде кнопок',
      },
    },
  },
};

export const RadioGroupCards: Story = {
  render: () => (
    <CrmRadioGroup
      title="Выберите тариф"
      variant="card"
      options={[
        { 
          label: 'Стартер', 
          value: 'starter',
          description: 'До 10 пользователей • Базовые отчеты • Email поддержка'
        },
        { 
          label: 'Профессиональный', 
          value: 'pro',
          description: 'До 100 пользователей • Расширенная аналитика • Приоритетная поддержка'
        },
        { 
          label: 'Корпоративный', 
          value: 'enterprise',
          description: 'Неограниченные пользователи • API доступ • Персональный менеджер'
        },
      ]}
      value="pro"
      helperText="Все планы включают 30-дневный пробный период"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Группа радиокнопок в виде карточек с подробными описаниями',
      },
    },
  },
};

export const RadioGroupWithError: Story = {
  render: () => (
    <CrmRadioGroup
      title="Согласие на обработку данных"
      required
      options={[
        { 
          label: 'Согласен', 
          value: 'agree',
          description: 'Я даю согласие на обработку персональных данных'
        },
        { 
          label: 'Не согласен', 
          value: 'disagree',
          description: 'Я не даю согласие на обработку данных'
        },
      ]}
      error="Необходимо выбрать один из вариантов"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Группа радиокнопок с отображением ошибки валидации',
      },
    },
  },
};

// Демонстрация всех состояний
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '24px', maxWidth: '800px' }}>
      <div>
        <h4>Обычные радиокнопки</h4>
        <CrmRadioGroup
          options={[
            { label: 'Не выбрана', value: 'option1' },
            { label: 'Выбрана', value: 'option2' },
            { label: 'Отключена', value: 'option3', disabled: true },
          ]}
          value="option2"
        />
      </div>

      <div>
        <h4>С описаниями</h4>
        <CrmRadioGroup
          options={[
            { 
              label: 'Опция 1', 
              value: 'desc1',
              description: 'Подробное описание первой опции'
            },
            { 
              label: 'Опция 2', 
              value: 'desc2',
              description: 'Подробное описание второй опции'
            },
          ]}
          value="desc1"
        />
      </div>

      <div>
        <h4>Кнопки-радио</h4>
        <CrmRadioGroup
          variant="button"
          direction="horizontal"
          options={[
            { label: 'Опция 1', value: 'btn1' },
            { label: 'Опция 2', value: 'btn2' },
            { label: 'Отключена', value: 'btn3', disabled: true },
          ]}
          value="btn1"
        />
      </div>

      <div>
        <h4>Карточки-радио</h4>
        <CrmRadioGroup
          variant="card"
          options={[
            { 
              label: 'Базовый план', 
              value: 'card1',
              description: 'Идеально для начинающих'
            },
            { 
              label: 'Премиум план', 
              value: 'card2',
              description: 'Расширенные возможности'
            },
          ]}
          value="card2"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация всех возможных состояний и вариантов радиокнопок',
      },
    },
  },
};