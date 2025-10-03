// src/components/CrmModal/CrmModal.tsx
import React from 'react';
import { Modal, Button, Space } from 'antd';
import type { ModalProps } from 'antd';

export interface CrmModalProps extends Omit<ModalProps, 'footer'> {
  /** Заголовок модального окна */
  title: string;
  /** Содержимое модального окна */
  children: React.ReactNode;
  /** Показывать ли модальное окно */
  open: boolean;
  /** Обработчик закрытия модального окна */
  onCancel: () => void;
  /** Показывать ли кнопку "Сохранить" */
  showSaveButton?: boolean;
  /** Текст кнопки "Сохранить" */
  saveButtonText?: string;
  /** Обработчик сохранения */
  onSave?: () => void;
  /** Загружается ли сохранение */
  saveLoading?: boolean;
  /** Показывать ли кнопку "Отмена" */
  showCancelButton?: boolean;
  /** Текст кнопки "Отмена" */
  cancelButtonText?: string;
  /** Кастомные кнопки в футере */
  footerButtons?: React.ReactNode;
  /** Ширина модального окна */
  width?: number | string;
  /** Центрировать ли модальное окно */
  centered?: boolean;
}

/**
 * Универсальный компонент модального окна для CRM системы
 * Обеспечивает единообразие модальных окон по всему приложению
 */
export const CrmModal: React.FC<CrmModalProps> = ({
  title,
  children,
  open,
  onCancel,
  showSaveButton = true,
  saveButtonText = 'Сохранить',
  onSave,
  saveLoading = false,
  showCancelButton = true,
  cancelButtonText = 'Отмена',
  footerButtons,
  width = 600,
  centered = true,
  ...modalProps
}) => {
  const footer = footerButtons || (
    <Space>
      {showCancelButton && (
        <Button 
          onClick={onCancel}
          style={{ minWidth: '80px' }}
        >
          {cancelButtonText}
        </Button>
      )}
      {showSaveButton && (
        <Button
          type="primary"
          onClick={onSave}
          loading={saveLoading}
          style={{ 
            minWidth: '80px',
            background: 'var(--salon-accent)',
            borderColor: 'var(--salon-accent)',
          }}
        >
          {saveButtonText}
        </Button>
      )}
    </Space>
  );

  return (
    <Modal
      title={
        <div style={{ 
          fontFamily: '"Poppins", "PT Sans", sans-serif',
          fontWeight: 600,
          fontSize: '16px',
          color: '#000000d9',
        }}>
          {title}
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={footer}
      width={width}
      centered={centered}
      className="crm-modal"
      styles={{
        content: {
          borderRadius: '8px',
          boxShadow: 'var(--salon-shadow-modal)',
        },
        header: {
          borderBottom: '1px solid #f0f0f0',
          paddingBottom: '16px',
          marginBottom: '0',
        },
        body: {
          padding: '24px',
        },
        footer: {
          borderTop: '1px solid #f0f0f0',
          paddingTop: '16px',
          marginTop: '0',
        },
      }}
      {...modalProps}
    >
      {children}
    </Modal>
  );
};

export default CrmModal;