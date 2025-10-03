// src/components/ClientAvatarInfo/ClientAvatarInfo.stories.ts
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ClientAvatarInfo } from './ClientAvatarInfo';

const meta: Meta<typeof ClientAvatarInfo> = {
  title: 'CRM Components/ClientAvatarInfo',
  component: ClientAvatarInfo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Атомарный компонент для отображения информации о клиенте с аватаром. Используется во всех местах приложения где нужно показать клиента.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large', 40, 64],
      description: 'Размер аватара',
    },
    showDetails: {
      control: 'boolean',
      description: 'Показывать ли дополнительную информацию (телефон/email)',
    },
    onClick: {
      action: 'clicked',
      description: 'Обработчик клика по компоненту',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Базовые данные клиента для stories
const mockClient = {
  firstName: 'Анна',
  lastName: 'Петрова',
  phone: '+7 (999) 123-45-67',
  email: 'anna.petrova@example.com',
  avatar: undefined,
};

const mockClientWithAvatar = {
  ...mockClient,
  firstName: 'Михаил',
  lastName: 'Иванов',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
};

// Stories
export const Default: Story = {
  args: {
    client: mockClient,
    size: 'default',
    showDetails: true,
  },
};

export const WithAvatar: Story = {
  args: {
    client: mockClientWithAvatar,
    size: 'default',
    showDetails: true,
  },
};

export const Small: Story = {
  args: {
    client: mockClient,
    size: 'small',
    showDetails: true,
  },
};

export const Large: Story = {
  args: {
    client: mockClientWithAvatar,
    size: 'large',
    showDetails: true,
  },
};

export const CustomSize: Story = {
  args: {
    client: mockClient,
    size: 64,
    showDetails: true,
  },
};

export const WithoutDetails: Story = {
  args: {
    client: mockClient,
    size: 'default',
    showDetails: false,
  },
};

export const OnlyPhone: Story = {
  args: {
    client: {
      firstName: 'Елена',
      lastName: 'Сидорова',
      phone: '+7 (999) 987-65-43',
      email: undefined,
      avatar: undefined,
    },
    size: 'default',
    showDetails: true,
  },
};

export const OnlyEmail: Story = {
  args: {
    client: {
      firstName: 'Дмитрий',
      lastName: 'Козлов',
      phone: '',
      email: 'dmitry.kozlov@example.com',
      avatar: undefined,
    },
    size: 'default',
    showDetails: true,
  },
};

export const Clickable: Story = {
  args: {
    client: mockClientWithAvatar,
    size: 'default',
    showDetails: true,
    onClick: () => alert('Клик по клиенту!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Компонент с обработчиком клика. При клике курсор изменяется на pointer.',
      },
    },
  },
};

export const LongName: Story = {
  args: {
    client: {
      firstName: 'Александра-Виктория',
      lastName: 'Романова-Петрова',
      phone: '+7 (999) 111-22-33',
      email: 'alexandra.viktoria.romanova.petrova@very-long-domain.example.com',
      avatar: undefined,
    },
    size: 'default',
    showDetails: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Тест с длинными именами и email для проверки переноса текста.',
      },
    },
  },
};