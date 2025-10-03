// src/components/SimpleCard/SimpleCard.tsx
import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

export interface SimpleCardProps {
  title: string;
  content: string;
  color?: 'primary' | 'secondary' | 'default';
}

export const SimpleCard: React.FC<SimpleCardProps> = ({
  title,
  content,
  color = 'default'
}) => {
  const cardStyle = {
    backgroundColor: color === 'primary' ? 'var(--color-primary-light)' : 
                    color === 'secondary' ? 'var(--color-secondary-light)' : 
                    undefined,
    borderColor: color === 'primary' ? 'var(--color-primary)' : 
                color === 'secondary' ? 'var(--color-secondary)' : 
                undefined,
  };

  return (
    <Card style={cardStyle}>
      <Title level={4}>{title}</Title>
      <Text>{content}</Text>
    </Card>
  );
};