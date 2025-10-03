// src/theme.ts
import { ThemeConfig } from 'antd';

/**
 * Ant Design Theme Configuration для SalonFlow CRM
 * 
 * Цветовая схема:
 * - Primary Color: Soft Lavender (#E6E6FA)
 * - Accent Color: Pale Violet-Red (#DB7093)
 * 
 * Шрифты:
 * - Headline Font: Poppins
 * - Body Font: PT Sans
 */
export const salonFlowTheme: ThemeConfig = {
  token: {
    // ==========================================
    // ОСНОВНЫЕ ЦВЕТА
    // ==========================================
    
    // Основной цвет - более насыщенный лавандовый для лучшей видимости
    colorPrimary: '#9370DB', // Medium Slate Blue
    
    // Успех
    colorSuccess: '#52c41a',
    
    // Предупреждение  
    colorWarning: '#faad14',
    
    // Ошибка
    colorError: '#ff4d4f',
    
    // Информация
    colorInfo: '#1677ff',
    
    // ==========================================
    // АКЦЕНТНЫЕ ЦВЕТА
    // ==========================================
    
    // Pale Violet-Red для акцентов
    colorLink: '#DB7093',
    colorLinkHover: '#C9608A',
    colorLinkActive: '#B55080',
    
    // ==========================================
    // ФОНОВЫЕ ЦВЕТА
    // ==========================================
    
    // Основной фон
    colorBgContainer: '#ffffff',
    
    // Альтернативный фон
    colorBgLayout: '#f5f5f5',
    
    // Фон элементов
    colorBgElevated: '#ffffff',
    
    // ==========================================
    // ГРАНИЦЫ И РАЗДЕЛИТЕЛИ
    // ==========================================
    
    colorBorder: '#d9d9d9',
    colorBorderSecondary: '#f0f0f0',
    
    // ==========================================
    // ТЕКСТ
    // ==========================================
    
    colorText: '#000000d9',
    colorTextSecondary: '#00000073',
    colorTextTertiary: '#00000040',
    colorTextQuaternary: '#00000026',
    
    // ==========================================
    // ШРИФТЫ
    // ==========================================
    
    // Семейства шрифтов
    fontFamily: '"PT Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamilyCode: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
    
    // Размеры шрифтов
    fontSize: 14,
    fontSizeLG: 16,
    fontSizeXL: 20,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,
    
    // Толщина шрифтов
    fontWeightStrong: 600,
    
    // Высота строки
    lineHeight: 1.5715,
    lineHeightLG: 1.5,
    lineHeightSM: 1.66,
    
    // ==========================================
    // ОТСТУПЫ И РАЗМЕРЫ
    // ==========================================
    
    // Базовые отступы
    padding: 16,
    paddingXS: 8,
    paddingSM: 12,
    paddingLG: 24,
    paddingXL: 32,
    
    // Поля
    margin: 16,
    marginXS: 8,
    marginSM: 12,
    marginLG: 24,
    marginXL: 32,
    
    // Радиус скругления
    borderRadius: 6,
    borderRadiusLG: 8,
    borderRadiusSM: 4,
    borderRadiusXS: 2,
    
    // ==========================================
    // ТЕНИ
    // ==========================================
    
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
    boxShadowSecondary: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
    
    // ==========================================
    // АНИМАЦИИ
    // ==========================================
    
    motionDurationFast: '0.1s',
    motionDurationMid: '0.2s',
    motionDurationSlow: '0.3s',
  },
  
  // ==========================================
  // КОМПОНЕНТ-СПЕЦИФИЧНЫЕ НАСТРОЙКИ
  // ==========================================
  
  components: {
    // Кнопки
    Button: {
      fontWeight: 500,
      borderRadius: 6,
    },
    
    // Модальные окна
    Modal: {
      borderRadius: 8,
      fontFamily: '"Poppins", "PT Sans", sans-serif',
    },
    
    // Формы
    Form: {
      itemMarginBottom: 24,
      labelFontSize: 14,
      labelColor: '#000000d9',
    },
    
    // Поля ввода
    Input: {
      borderRadius: 6,
      paddingBlock: 8,
      paddingInline: 12,
    },
    
    // Выпадающие списки
    Select: {
      borderRadius: 6,
    },
    
    // Таблицы
    Table: {
      headerBg: '#fafafa',
      headerColor: '#000000d9',
      rowHoverBg: '#f5f5f5',
    },
    
    // Карточки
    Card: {
      borderRadius: 8,
      headerBg: 'transparent',
    },
    
    // Заголовки
    Typography: {
      titleMarginBottom: '0.5em',
      titleMarginTop: '1.2em',
      fontFamilyCode: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
    },
    
    // Меню
    Menu: {
      itemBorderRadius: 6,
      subMenuItemBorderRadius: 6,
    },
    
    // Вкладки
    Tabs: {
      itemColor: '#00000073',
      itemSelectedColor: '#DB7093',
      itemHoverColor: '#DB7093',
      inkBarColor: '#DB7093',
    },
  },
};

/**
 * CSS переменные для дополнительных стилей
 */
export const cssVariables = {
  // Градиенты для специальных элементов
  primaryGradient: 'linear-gradient(135deg, #E6E6FA 0%, #DDA0DD 100%)',
  accentGradient: 'linear-gradient(135deg, #DB7093 0%, #C9608A 100%)',
  
  // Дополнительные цвета для статусов
  statusSuccess: '#f6ffed',
  statusWarning: '#fffbe6', 
  statusError: '#fff2f0',
  statusInfo: '#e6f7ff',
  
  // Тени для карточек и модалей
  cardShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  modalShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  
  // Переходы
  transitionFast: 'all 0.1s cubic-bezier(0.08, 0.82, 0.17, 1)',
  transitionNormal: 'all 0.2s cubic-bezier(0.08, 0.82, 0.17, 1)',
  transitionSlow: 'all 0.3s cubic-bezier(0.08, 0.82, 0.17, 1)',
};

export default salonFlowTheme;