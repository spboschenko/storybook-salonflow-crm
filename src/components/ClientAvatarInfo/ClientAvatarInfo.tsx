// src/components/ClientAvatarInfo/ClientAvatarInfo.tsx
import React from 'react';
import { Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

export interface Client {
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  avatar?: string;
}

export interface ClientAvatarInfoProps {
  /** Данные клиента */
  client: Pick<Client, 'firstName' | 'lastName' | 'phone' | 'email' | 'avatar'>;
  /** Размер аватара */
  size?: 'small' | 'default' | 'large' | number;
  /** Показывать ли дополнительную информацию (телефон/email) */
  showDetails?: boolean;
  /** Кастомный CSS класс */
  className?: string;
  /** Обработчик клика по компоненту */
  onClick?: () => void;
}

/**
 * Атомарный компонент для отображения информации о клиенте с аватаром
 * Используется во всех местах приложения где нужно показать клиента
 */
export const ClientAvatarInfo: React.FC<ClientAvatarInfoProps> = ({
  client,
  size = 'default',
  showDetails = true,
  className = '',
  onClick,
}) => {
  const fullName = `${client.firstName} ${client.lastName}`;
  const contactInfo = client.phone || client.email;

  return (
    <div 
      className={`client-avatar-info ${className}`}
      onClick={onClick}
      style={{ 
        cursor: onClick ? 'pointer' : 'default',
        transition: 'var(--salon-transition-fast)',
      }}
    >
      <Avatar
        size={size}
        src={client.avatar}
        icon={<UserOutlined />}
        style={{
          backgroundColor: 'var(--salon-primary)',
          color: 'var(--salon-accent)',
        }}
      />
      
      <div className="client-info">
        <Text 
          className="client-name"
          strong
          style={{ 
            color: '#000000d9',
            fontSize: size === 'small' ? '12px' : '14px',
          }}
        >
          {fullName}
        </Text>
        
        {showDetails && contactInfo && (
          <Text 
            className="client-details"
            type="secondary"
            style={{ 
              fontSize: size === 'small' ? '11px' : '12px',
              display: 'block',
            }}
          >
            {contactInfo}
          </Text>
        )}
      </div>
    </div>
  );
};

export default ClientAvatarInfo;