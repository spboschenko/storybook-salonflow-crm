// src/stories/DesignSystem/Forms/CrmToggleComponents.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CrmCheckbox } from '../../../components/CrmCheckbox/CrmCheckbox';
import { CrmRadio } from '../../../components/CrmRadio/CrmRadio';
import { CrmToggleWrapper, CrmToggleGroup } from '../../../components/CrmToggleWrapper/CrmToggleWrapper';
import { Radio } from 'antd';

const meta: Meta = {
  title: 'Design System/Forms/CrmToggleComponents',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## CRM Toggle Components

Новая архитектура компонентов переключателей с сеткой 2x2 и универсальными обёртками.

### Компоненты:
- **CrmCheckbox** - тонкий базовый чекбокс с CSS Grid 2x2
- **CrmRadio** - тонкий базовый радиокнопка с CSS Grid 2x2
- **CrmToggleWrapper** - универсальная обёртка для вариантов отображения
- **CrmToggleGroup** - универсальная группа переключателей

### Структура Grid 2x2:
\`\`\`
[Переключатель] [Label        ]
[             ] [Description  ]
\`\`\`

### Варианты отображения:
- **default** - базовый вид без дополнительного оформления
- **button** - в виде кнопки с border и hover эффектами
- **card** - в виде карточки с тенью и скруглением

### Консистентность:
- Spacing: 12px gap между переключателем и label
- Font sizes: 12px (small), 14px (medium), 16px (large)
- Стили соответствуют CrmButton компоненту
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: 'select',
      options: ['default', 'button', 'card'],
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Базовые тонкие компоненты
export const BasicComponents: Story = {
  render: () => {
    const [checkboxValues, setCheckboxValues] = useState<string[]>([]);
    const [radioValue, setRadioValue] = useState<string>('');

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <div>
          <h3>Тонкие базовые компоненты</h3>
          
          <h4>CrmCheckbox</h4>
          <div style={{ marginBottom: '24px' }}>
            <CrmCheckbox
              label="Простой чекбокс"
              description="Описание для чекбокса"
              checked={checkboxValues.includes('simple')}
              onChange={(e: CheckboxChangeEvent) => {
                if (e.target.checked) {
                  setCheckboxValues([...checkboxValues, 'simple']);
                } else {
                  setCheckboxValues(checkboxValues.filter(v => v !== 'simple'));
                }
              }}
            />
            <div style={{ marginTop: '16px' }}>
              <CrmCheckbox
                label="Чекбокс без описания"
                checked={checkboxValues.includes('no-desc')}
                onChange={(e: CheckboxChangeEvent) => {
                  if (e.target.checked) {
                    setCheckboxValues([...checkboxValues, 'no-desc']);
                  } else {
                    setCheckboxValues(checkboxValues.filter(v => v !== 'no-desc'));
                  }
                }}
              />
            </div>
            <div style={{ marginTop: '16px' }}>
              <CrmCheckbox
                label="Отключенный чекбокс"
                description="Этот чекбокс отключен"
                disabled
              />
            </div>
          </div>

          <h4>CrmRadio</h4>
          <Radio.Group 
            value={radioValue} 
            onChange={(e) => setRadioValue(e.target.value)}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <CrmRadio
                value="option1"
                label="Первая опция"
                description="Описание первой опции"
              />
              <CrmRadio
                value="option2"
                label="Вторая опция"
                description="Описание второй опции"
              />
              <CrmRadio
                value="option3"
                label="Третья опция без описания"
              />
              <CrmRadio
                value="option4"
                label="Отключенная опция"
                description="Эта опция отключена"
                disabled
              />
            </div>
          </Radio.Group>
        </div>

        <div>
          <h3>Размеры</h3>
          
          <h4>Small</h4>
          <CrmCheckbox
            size="small"
            label="Маленький чекбокс"
            description="Описание маленького размера"
          />
          <div style={{ marginTop: '16px' }}>
            <CrmRadio
              size="small"
              label="Маленькая радиокнопка"
              description="Описание маленького размера"
            />
          </div>

          <h4 style={{ marginTop: '24px' }}>Medium (default)</h4>
          <CrmCheckbox
            size="medium"
            label="Средний чекбокс"
            description="Описание среднего размера"
          />
          <div style={{ marginTop: '16px' }}>
            <CrmRadio
              size="medium"
              label="Средняя радиокнопка"
              description="Описание среднего размера"
            />
          </div>

          <h4 style={{ marginTop: '24px' }}>Large</h4>
          <CrmCheckbox
            size="large"
            label="Большой чекбокс"
            description="Описание большого размера"
          />
          <div style={{ marginTop: '16px' }}>
            <CrmRadio
              size="large"
              label="Большая радиокнопка"
              description="Описание большого размера"
            />
          </div>
        </div>
      </div>
    );
  },
};

// Варианты отображения с обёртками
export const WrappedVariants: Story = {
  render: () => {
    const [checkboxValues, setCheckboxValues] = useState<string[]>([]);
    const [radioValue, setRadioValue] = useState<string>('');

    return (
      <div>
        <h3>Варианты отображения с CrmToggleWrapper</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
          <div>
            <h4>Default</h4>
            <CrmToggleWrapper
              type="checkbox"
              variant="default"
              toggleProps={{
                label: "Default чекбокс",
                description: "Базовый вариант",
                checked: checkboxValues.includes('default-checkbox'),
                onChange: (e: CheckboxChangeEvent) => {
                  if (e.target.checked) {
                    setCheckboxValues([...checkboxValues, 'default-checkbox']);
                  } else {
                    setCheckboxValues(checkboxValues.filter(v => v !== 'default-checkbox'));
                  }
                }
              }}
            />
            <div style={{ marginTop: '16px' }}>
              <Radio.Group value={radioValue} onChange={(e) => setRadioValue(e.target.value)}>
                <CrmToggleWrapper
                  type="radio"
                  variant="default"
                  toggleProps={{
                    value: "default-radio",
                    label: "Default радио",
                    description: "Базовый вариант"
                  }}
                />
              </Radio.Group>
            </div>
          </div>

          <div>
            <h4>Button</h4>
            <CrmToggleWrapper
              type="checkbox"
              variant="button"
              toggleProps={{
                label: "Button чекбокс",
                description: "В виде кнопки",
                checked: checkboxValues.includes('button-checkbox'),
                onChange: (e: CheckboxChangeEvent) => {
                  if (e.target.checked) {
                    setCheckboxValues([...checkboxValues, 'button-checkbox']);
                  } else {
                    setCheckboxValues(checkboxValues.filter(v => v !== 'button-checkbox'));
                  }
                }
              }}
            />
            <div style={{ marginTop: '16px' }}>
              <Radio.Group value={radioValue} onChange={(e) => setRadioValue(e.target.value)}>
                <CrmToggleWrapper
                  type="radio"
                  variant="button"
                  toggleProps={{
                    value: "button-radio",
                    label: "Button радио",
                    description: "В виде кнопки"
                  }}
                />
              </Radio.Group>
            </div>
          </div>

          <div>
            <h4>Card</h4>
            <CrmToggleWrapper
              type="checkbox"
              variant="card"
              toggleProps={{
                label: "Card чекбокс",
                description: "В виде карточки",
                checked: checkboxValues.includes('card-checkbox'),
                onChange: (e: CheckboxChangeEvent) => {
                  if (e.target.checked) {
                    setCheckboxValues([...checkboxValues, 'card-checkbox']);
                  } else {
                    setCheckboxValues(checkboxValues.filter(v => v !== 'card-checkbox'));
                  }
                }
              }}
            />
            <div style={{ marginTop: '16px' }}>
              <Radio.Group value={radioValue} onChange={(e) => setRadioValue(e.target.value)}>
                <CrmToggleWrapper
                  type="radio"
                  variant="card"
                  toggleProps={{
                    value: "card-radio",
                    label: "Card радио",
                    description: "В виде карточки"
                  }}
                />
              </Radio.Group>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Группы переключателей
export const ToggleGroups: Story = {
  render: () => {
    const [checkboxGroupValue, setCheckboxGroupValue] = useState<(string | number)[]>(['option1']);
    const [radioGroupValue, setRadioGroupValue] = useState<string | number>('option1');

    const options = [
      {
        label: "Первая опция",
        value: "option1",
        description: "Описание первой опции"
      },
      {
        label: "Вторая опция",
        value: "option2",
        description: "Описание второй опции"
      },
      {
        label: "Третья опция",
        value: "option3",
        description: "Описание третьей опции"
      },
      {
        label: "Отключенная опция",
        value: "option4",
        description: "Эта опция отключена",
        disabled: true
      }
    ];

    return (
      <div>
        <h3>Группы переключателей</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          <div>
            <h4>Checkbox Group</h4>
            <CrmToggleGroup
              type="checkbox"
              title="Выберите несколько опций"
              options={options}
              value={checkboxGroupValue}
              onChange={(value) => setCheckboxGroupValue(value as (string | number)[])}
              helperText="Можно выбрать несколько вариантов"
            />

            <div style={{ marginTop: '32px' }}>
              <h5>Button Variant</h5>
              <CrmToggleGroup
                type="checkbox"
                variant="button"
                direction="horizontal"
                title="Button Group"
                options={options.slice(0, 3)}
                value={checkboxGroupValue}
                onChange={(value) => setCheckboxGroupValue(value as (string | number)[])}
              />
            </div>
          </div>

          <div>
            <h4>Radio Group</h4>
            <CrmToggleGroup
              type="radio"
              title="Выберите одну опцию"
              required
              options={options}
              value={radioGroupValue}
              onChange={(value) => setRadioGroupValue(value as string | number)}
              helperText="Можно выбрать только один вариант"
            />

            <div style={{ marginTop: '32px' }}>
              <h5>Card Variant</h5>
              <CrmToggleGroup
                type="radio"
                variant="card"
                title="Card Group"
                options={options.slice(0, 3)}
                value={radioGroupValue}
                onChange={(value) => setRadioGroupValue(value as string | number)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Сравнение всех размеров и вариантов
export const AllVariantsComparison: Story = {
  render: () => {
    return (
      <div>
        <h3>Сравнение всех размеров и вариантов</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          <div>
            <h5>Размер / Вариант</h5>
            <div style={{ height: '32px', display: 'flex', alignItems: 'center' }}>
              <strong>Small</strong>
            </div>
            <div style={{ height: '32px', display: 'flex', alignItems: 'center' }}>
              <strong>Medium</strong>
            </div>
            <div style={{ height: '32px', display: 'flex', alignItems: 'center' }}>
              <strong>Large</strong>
            </div>
          </div>

          <div>
            <h5>Default</h5>
            <div style={{ marginBottom: '8px' }}>
              <CrmCheckbox size="small" label="Small checkbox" description="Small description" />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <CrmCheckbox size="medium" label="Medium checkbox" description="Medium description" />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <CrmCheckbox size="large" label="Large checkbox" description="Large description" />
            </div>
          </div>

          <div>
            <h5>Button</h5>
            <div style={{ marginBottom: '8px' }}>
              <CrmToggleWrapper
                type="checkbox"
                variant="button"
                size="small"
                toggleProps={{
                  label: "Small button",
                  description: "Small description"
                }}
              />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <CrmToggleWrapper
                type="checkbox"
                variant="button"
                size="medium"
                toggleProps={{
                  label: "Medium button",
                  description: "Medium description"
                }}
              />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <CrmToggleWrapper
                type="checkbox"
                variant="button"
                size="large"
                toggleProps={{
                  label: "Large button",
                  description: "Large description"
                }}
              />
            </div>
          </div>

          <div>
            <h5>Card</h5>
            <div style={{ marginBottom: '8px' }}>
              <CrmToggleWrapper
                type="checkbox"
                variant="card"
                size="small"
                toggleProps={{
                  label: "Small card",
                  description: "Small description"
                }}
              />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <CrmToggleWrapper
                type="checkbox"
                variant="card"
                size="medium"
                toggleProps={{
                  label: "Medium card",
                  description: "Medium description"
                }}
              />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <CrmToggleWrapper
                type="checkbox"
                variant="card"
                size="large"
                toggleProps={{
                  label: "Large card",
                  description: "Large description"
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: '40px' }}>
          <h4>Визуальное выравнивание</h4>
          <p>Проверка одинакового расстояния между переключателем и label:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '400px' }}>
            <CrmCheckbox label="Короткий текст" />
            <CrmCheckbox label="Очень длинный текст с переносом строки для проверки выравнивания" />
            <CrmCheckbox label="Средний текст" description="С описанием" />
            <CrmRadio label="Радио короткий" />
            <CrmRadio label="Радио длинный текст для проверки выравнивания" description="И описание" />
          </div>
        </div>
      </div>
    );
  },
};

// Интерактивная площадка
export const Playground: Story = {
  render: (args) => {
    const [checkboxValue, setCheckboxValue] = useState(false);
    const [radioValue, setRadioValue] = useState('option1');

    return (
      <div style={{ maxWidth: '600px' }}>
        <h3>Интерактивная площадка</h3>
        
        <div style={{ marginBottom: '32px' }}>
          <h4>Checkbox</h4>
          <CrmToggleWrapper
            type="checkbox"
            variant={args.variant}
            size={args.size}
            toggleProps={{
              label: "Интерактивный чекбокс",
              description: "Описание чекбокса для тестирования",
              checked: checkboxValue,
              onChange: (e: CheckboxChangeEvent) => setCheckboxValue(e.target.checked)
            }}
          />
          <p>Состояние: {checkboxValue ? 'выбран' : 'не выбран'}</p>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h4>Radio Group</h4>
          <CrmToggleGroup
            type="radio"
            variant={args.variant}
            direction={args.direction}
            size={args.size}
            title="Группа радиокнопок"
            options={[
              { label: "Первая опция", value: "option1", description: "Описание первой" },
              { label: "Вторая опция", value: "option2", description: "Описание второй" },
              { label: "Третья опция", value: "option3", description: "Описание третьей" }
            ]}
            value={radioValue}
            onChange={(value) => setRadioValue(value as string)}
            helperText="Выберите одну из опций"
          />
          <p>Выбрано: {radioValue}</p>
        </div>
      </div>
    );
  },
  args: {
    variant: 'default',
    size: 'medium',
    direction: 'vertical',
  },
};