// src/stories/Test.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button, Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const TestComponent = () => (
  <Card style={{ maxWidth: 400 }}>
    <Title level={3}>Тест SalonFlow CRM</Title>
    <Paragraph>
      Это тестовый компонент для проверки работы Storybook с темой Ant Design.
    </Paragraph>
    <Button type="primary" size="large">
      Основная кнопка
    </Button>
    <Button type="default" style={{ marginLeft: 8 }}>
      Обычная кнопка
    </Button>
  </Card>
);

const meta: Meta<typeof TestComponent> = {
  title: 'Test/Basic Test',
  component: TestComponent,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};