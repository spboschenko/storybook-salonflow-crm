// src/components/SidebarMenuItem/SidebarMenuItem.tsx
import React from 'react';
import { Badge, Typography } from 'antd';
import './SidebarMenuItem.css';

const { Text } = Typography;

export interface SidebarMenuItemProps {
  /** Иконка элемента меню (React node) */
  icon?: React.ReactNode;
  /** Текст элемента меню */
  label: string;
  /** Активен ли элемент меню */
  active?: boolean;
  /** Отключен ли элемент меню */
  disabled?: boolean;
  /** Количество уведомлений/бейдж */
  badgeCount?: number;
  /** Обработчик клика */
  onClick?: () => void;
  /** Дополнительный CSS класс */
  className?: string;
  /** Режим отображения (collapsed - свернутый) */
  collapsed?: boolean;
}

/**
 * Атомарный компонент элемента бокового меню
 * Используется для создания навигационных пунктов в боковом меню CRM системы
 */
export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  icon,
  label,
  active = false,
  disabled = false,
  badgeCount,
  onClick,
  className = '',
  collapsed = false,
}) => {
  const itemClass = [
    'sidebar-menu-item',
    active && 'sidebar-menu-item--active',
    disabled && 'sidebar-menu-item--disabled',
    collapsed && 'sidebar-menu-item--collapsed',
    className,
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={itemClass}
      onClick={handleClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-label={label}
    >
      {icon && (
        <span className="sidebar-menu-item__icon">
          {icon}
        </span>
      )}
      
      {!collapsed && (
        <Text className="sidebar-menu-item__label">
          {label}
        </Text>
      )}

      {!collapsed && badgeCount && badgeCount > 0 && (
        <Badge 
          count={badgeCount} 
          size="small" 
          className="sidebar-menu-item__badge"
        />
      )}
    </div>
  );
};