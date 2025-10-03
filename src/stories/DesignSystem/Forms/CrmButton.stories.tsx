// src/stories/DesignSystem/Forms/CrmButton.stories.tsx// src/components/CrmButton/CrmButton.tsx

import type { Meta, StoryObj } from '@storybook/react/*';import React from 'react';

import { CrmButton } from '../../../components/CrmButton/CrmButton';import { Button, ButtonProps } from 'antd';

import './CrmButton.css';

const meta: Meta<typeof CrmButton> = {

  title: 'Design System/Forms/CrmButton',export interface CrmButtonProps extends Omit<ButtonProps, 'type' | 'variant'> {

  component: CrmButton,  /** Вариант кнопки */

  parameters: {  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'link';

    layout: 'centered',  /** Размер кнопки */

    docs: {  size?: 'small' | 'middle' | 'large';

      description: {  /** Полная ширина */

        component: `  fullWidth?: boolean;

## CrmButton  /** Дополнительный CSS класс */

  className?: string;

Базовый компонент кнопки для CRM системы на основе Ant Design Button.}



### Особенности:/**

- Различные варианты стилизации (primary, secondary, success, warning, danger, ghost) * Базовый компонент кнопки CRM системы

- Размеры (small, medium, large) * Расширяет стандартную кнопку AntD с кастомными вариантами для SalonFlow

- Состояния загрузки и отключения */

- Поддержка иконокexport const CrmButton: React.FC<CrmButtonProps> = ({

- Полная интеграция с темой SalonFlow  variant = 'primary',

  size = 'middle',

### Основное применение:  fullWidth = false,

- Отправка форм  className = '',

- Действия пользователя  children,

- Навигация  ...props

- Подтверждение операций}) => {

        `,  const getButtonType = (): ButtonProps['type'] => {

      },    switch (variant) {

    },      case 'primary':

  },        return 'primary';

  argTypes: {      case 'secondary':

    variant: {        return 'default';

      control: 'select',      case 'ghost':

      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'ghost'],        return undefined;

      description: 'Вариант стилизации кнопки',      case 'link':

    },        return 'link';

    size: {      default:

      control: 'select',        return 'default';

      options: ['small', 'medium', 'large'],    }

      description: 'Размер кнопки',  };

    },

    loading: {  const buttonClass = [

      control: 'boolean',    'crm-button',

      description: 'Состояние загрузки',    `crm-button--${variant}`,

    },    fullWidth && 'crm-button--full-width',

    disabled: {    className,

      control: 'boolean',  ].filter(Boolean).join(' ');

      description: 'Отключенное состояние',

    },  return (

    fullWidth: {    <Button

      control: 'boolean',      type={getButtonType()}

      description: 'Растянуть на всю ширину',      size={size}

    },      className={buttonClass}

    children: {      {...props}

      control: 'text',    >

      description: 'Текст кнопки',      {children}

    },    </Button>

  },  );

  tags: ['autodocs'],};
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success Button',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    loading: true,
    children: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Button',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <CrmButton variant="primary" size="small">
        Small
      </CrmButton>
      <CrmButton variant="primary" size="medium">
        Medium
      </CrmButton>
      <CrmButton variant="primary" size="large">
        Large
      </CrmButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация различных размеров кнопок',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
      <CrmButton variant="primary">Primary</CrmButton>
      <CrmButton variant="secondary">Secondary</CrmButton>
      <CrmButton variant="success">Success</CrmButton>
      <CrmButton variant="warning">Warning</CrmButton>
      <CrmButton variant="danger">Danger</CrmButton>
      <CrmButton variant="ghost">Ghost</CrmButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Все доступные варианты кнопок',
      },
    },
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
};