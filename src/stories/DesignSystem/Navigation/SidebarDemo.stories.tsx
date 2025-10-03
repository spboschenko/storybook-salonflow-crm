// src/stories/DesignSystem/Navigation/SidebarDemo.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { 
  UserOutlined, 
  CalendarOutlined, 
  ScissorOutlined, 
  SettingOutlined,
  DashboardOutlined,
  BellOutlined,
  HeartOutlined,
  ShopOutlined,
  BarChartOutlined,
  CreditCardOutlined
} from '@ant-design/icons';
import { SidebarMenu } from '../../../components/SidebarMenu/SidebarMenu';

const meta: Meta<typeof SidebarMenu> = {
  title: 'Design System/Navigation/Sidebar Demo',
  component: SidebarMenu,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Демонстрация компонентов бокового меню для CRM системы SalonFlow.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', display: 'flex' }}>
        <Story />
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5' }}>
          <h2>SalonFlow CRM</h2>
          <p>Добро пожаловать в систему управления груминг салоном!</p>
          <p>Используйте боковое меню для навигации по системе.</p>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Основные данные для груминг салона
const groomingSections = [
  {
    id: 'main',
    title: 'Основное',
    showDivider: true,
    items: [
      {
        id: 'dashboard',
        icon: <DashboardOutlined />,
        label: 'Дашборд',
        active: true,
      },
      {
        id: 'clients',
        icon: <UserOutlined />,
        label: 'Клиенты',
        badgeCount: 12,
      },
      {
        id: 'pets',
        icon: <HeartOutlined />,
        label: 'Питомцы',
        badgeCount: 45,
      },
      {
        id: 'appointments',
        icon: <CalendarOutlined />,
        label: 'Записи на сегодня',
        badgeCount: 8,
      },
    ],
  },
  {
    id: 'services',
    title: 'Услуги',
    showDivider: true,
    items: [
      {
        id: 'grooming',
        icon: <ScissorOutlined />,
        label: 'Груминг',
      },
      {
        id: 'spa',
        icon: <ShopOutlined />,
        label: 'SPA процедуры',
      },
    ],
  },
  {
    id: 'analytics',
    title: 'Аналитика',
    showDivider: true,
    items: [
      {
        id: 'reports',
        icon: <BarChartOutlined />,
        label: 'Отчеты',
      },
      {
        id: 'finance',
        icon: <CreditCardOutlined />,
        label: 'Финансы',
      },
    ],
  },
  {
    id: 'settings',
    title: 'Настройки',
    items: [
      {
        id: 'settings',
        icon: <SettingOutlined />,
        label: 'Настройки системы',
      },
      {
        id: 'notifications',
        icon: <BellOutlined />,
        label: 'Уведомления',
        badgeCount: 3,
      },
    ],
  },
];

// Полное меню CRM системы
export const FullCRMSidebar: Story = {
  args: {
    logo: <span style={{ fontSize: '24px' }}>🐾</span>,
    companyName: 'SalonFlow CRM',
    sections: groomingSections,
    defaultCollapsed: false,
    showCollapseToggle: true,
    user: {
      name: 'Анна Петрова',
      role: 'Администратор',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
    },
  },
};

// Свернутое меню
export const CollapsedSidebar: Story = {
  args: {
    logo: <span style={{ fontSize: '24px' }}>🐾</span>,
    companyName: 'SalonFlow CRM',
    sections: groomingSections,
    defaultCollapsed: true,
    showCollapseToggle: true,
    user: {
      name: 'Анна Петрова',
      role: 'Администратор',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
    },
  },
};

// Меню для грумера
export const GroomerSidebar: Story = {
  args: {
    logo: <span style={{ fontSize: '24px' }}>✂️</span>,
    companyName: 'SalonFlow',
    sections: [
      {
        id: 'work',
        title: 'Рабочий день',
        showDivider: true,
        items: [
          {
            id: 'schedule',
            icon: <CalendarOutlined />,
            label: 'Мое расписание',
            active: true,
            badgeCount: 5,
          },
          {
            id: 'clients-today',
            icon: <UserOutlined />,
            label: 'Клиенты сегодня',
            badgeCount: 7,
          },
        ],
      },
      {
        id: 'services',
        title: 'Услуги',
        items: [
          {
            id: 'grooming',
            icon: <ScissorOutlined />,
            label: 'Груминг',
          },
          {
            id: 'spa',
            icon: <ShopOutlined />,
            label: 'SPA',
          },
        ],
      },
    ],
    defaultCollapsed: false,
    showCollapseToggle: true,
    user: {
      name: 'Михаил Волков',
      role: 'Грумер',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mikhail',
    },
  },
};