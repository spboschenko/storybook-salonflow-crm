// src/stories/DesignSystem/Forms/CrmTextArea.stories.tsx
import type { Meta, StoryObj } from '@storybook/react/*';
import { CrmTextArea } from '../../../components/CrmTextArea/CrmTextArea';

const meta: Meta<typeof CrmTextArea> = {
  title: 'Design System/Forms/CrmTextArea',
  component: CrmTextArea,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## CrmTextArea

Базовый компонент текстовой области для CRM системы на основе Ant Design TextArea.

### Особенности:
- Поддержка лейбла и обязательных полей
- Встроенная валидация с отображением ошибок
- Подсказки (helper text)
- Автоматическое изменение размера
- Настраиваемое количество строк
- Полная интеграция с Ant Design темой

### Основное применение:
- Многострочные поля ввода (комментарии, описания)
- Формы обратной связи
- Поля для заметок и текстового контента
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
    rows: {
      control: { type: 'number', min: 2, max: 10, step: 1 },
      description: 'Количество строк',
    },
    autoSize: {
      control: 'boolean',
      description: 'Автоматическое изменение размера',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Полная ширина контейнера',
    },
    maxLength: {
      control: 'number',
      description: 'Максимальная длина текста',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Комментарий',
    placeholder: 'Введите ваш комментарий...',
    rows: 4,
    fullWidth: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Описание (обязательно)',
    placeholder: 'Опишите детали...',
    required: true,
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    label: 'Комментарий',
    placeholder: 'Введите комментарий...',
    required: true,
    error: 'Комментарий обязателен для заполнения',
    value: '',
    rows: 3,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Дополнительная информация',
    placeholder: 'Любые дополнительные заметки...',
    helperText: 'Эта информация поможет нам лучше понять ваши потребности',
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Системная информация',
    value: 'Эта информация недоступна для редактирования',
    disabled: true,
    rows: 3,
  },
};

export const AutoSize: Story = {
  args: {
    label: 'Автоматический размер',
    placeholder: 'Вводите текст, размер поля будет увеличиваться...',
    autoSize: { minRows: 2, maxRows: 6 },
    helperText: 'Поле автоматически расширяется от 2 до 6 строк',
  },
};

export const WithCharacterLimit: Story = {
  args: {
    label: 'Краткое описание',
    placeholder: 'Максимум 200 символов...',
    maxLength: 200,
    showCount: true,
    rows: 3,
    helperText: 'Кратко опишите суть в нескольких предложениях',
  },
};

export const LongForm: Story = {
  args: {
    label: 'Подробное описание',
    placeholder: 'Введите развернутое описание...',
    rows: 8,
    helperText: 'Чем подробнее опишете, тем лучше мы сможем помочь',
  },
};

// Демонстрация различных состояний в одной истории
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '24px', maxWidth: '600px' }}>
      <CrmTextArea
        label="Обычное поле"
        placeholder="Введите текст..."
        rows={3}
      />
      
      <CrmTextArea
        label="Обязательное поле"
        placeholder="Обязательно к заполнению"
        required
        rows={3}
      />
      
      <CrmTextArea
        label="Поле с ошибкой"
        placeholder="Поле с ошибкой"
        error="Это поле обязательно для заполнения"
        value=""
        rows={3}
      />
      
      <CrmTextArea
        label="Поле с подсказкой"
        placeholder="Поле с helper text"
        helperText="Дополнительная информация о поле"
        rows={3}
      />
      
      <CrmTextArea
        label="Отключенное поле"
        value="Недоступно для редактирования"
        disabled
        rows={3}
      />
      
      <CrmTextArea
        label="Автоматический размер"
        placeholder="Попробуйте ввести много текста..."
        autoSize={{ minRows: 2, maxRows: 5 }}
        helperText="Поле расширяется автоматически"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация всех возможных состояний компонента CrmTextArea',
      },
    },
  },
};

// История для тестирования интерактивности
export const Interactive: Story = {
  args: {
    label: 'Интерактивная текстовая область',
    placeholder: 'Попробуйте ввести текст...',
    helperText: 'Введите текст для тестирования компонента',
    rows: 4,
    maxLength: 500,
    showCount: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Интерактивная версия для тестирования пользовательского ввода',
      },
    },
  },
};