// src/components/SidebarMenu/SidebarMenu.tsx
import React, { useState } from 'react';
import { Button, Typography, Avatar } from 'antd';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined,
  UserOutlined 
} from '@ant-design/icons';
import { SidebarSection, MenuItemConfig } from '../SidebarSection/SidebarSection';
import './SidebarMenu.css';

const { Title, Text } = Typography;

export interface SidebarSectionConfig {
  id: string;
  title?: string;
  items: MenuItemConfig[];
  showDivider?: boolean;
}

export interface SidebarMenuProps {
  /** Логотип компании */
  logo?: React.ReactNode;
  /** Название компании */
  companyName?: string;
  /** Секции меню */
  sections: SidebarSectionConfig[];
  /** Свернутое ли меню по умолчанию */
  defaultCollapsed?: boolean;
  /** Информация о пользователе */
  user?: {
    name: string;
    role: string;
    avatar?: string;
  };
  /** Показывать ли переключатель свертывания */
  showCollapseToggle?: boolean;
  /** Дополнительный CSS класс */
  className?: string;
  /** Обработчик клика по элементу меню */
  onItemClick?: (sectionId: string, itemId: string) => void;
  /** Обработчик изменения состояния свертывания */
  onCollapseChange?: (collapsed: boolean) => void;
}

/**
 * Основной компонент бокового меню CRM системы
 * Включает логотип, навигационные секции и управление состоянием
 */
export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  logo,
  companyName = 'SalonFlow CRM',
  sections,
  defaultCollapsed = false,
  user,
  showCollapseToggle = true,
  className = '',
  onItemClick,
  onCollapseChange,
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const handleCollapseToggle = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    if (onCollapseChange) {
      onCollapseChange(newCollapsed);
    }
  };

  const handleItemClick = (sectionId: string, itemId: string) => {
    if (onItemClick) {
      onItemClick(sectionId, itemId);
    }
  };

  const sidebarClass = [
    'sidebar-menu',
    collapsed && 'sidebar-menu--collapsed',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={sidebarClass}>
      {/* Заголовок с логотипом */}
      <div className="sidebar-menu__header">
        {logo && (
          <div className="sidebar-menu__logo">
            {logo}
          </div>
        )}
        {!collapsed && (
          <div className="sidebar-menu__company">
            <Title level={4} className="sidebar-menu__company-name">
              {companyName}
            </Title>
          </div>
        )}
        {showCollapseToggle && (
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={handleCollapseToggle}
            className="sidebar-menu__collapse-btn"
            title={collapsed ? 'Развернуть меню' : 'Свернуть меню'}
          />
        )}
      </div>

      {/* Навигационные секции */}
      <div className="sidebar-menu__content">
        <div className="sidebar-menu__sections">
          {sections.map((section) => (
            <SidebarSection
              key={section.id}
              title={section.title}
              items={section.items}
              showDivider={section.showDivider}
              collapsed={collapsed}
              onItemClick={(itemId) => handleItemClick(section.id, itemId)}
            />
          ))}
        </div>

        {/* Информация о пользователе */}
        {user && (
          <div className="sidebar-menu__user">
            <div className="sidebar-menu__user-info">
              <Avatar 
                src={user.avatar}
                icon={<UserOutlined />}
                size={collapsed ? 32 : 40}
                className="sidebar-menu__user-avatar"
              />
              {!collapsed && (
                <div className="sidebar-menu__user-details">
                  <Text strong className="sidebar-menu__user-name">
                    {user.name}
                  </Text>
                  <Text type="secondary" className="sidebar-menu__user-role">
                    {user.role}
                  </Text>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};