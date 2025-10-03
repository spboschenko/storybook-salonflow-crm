// src/components/CrmFormLayout/CrmFormLayout.tsx
import React from 'react';
import { Form, Card, Button, Space, Divider } from 'antd';
import type { FormProps, CardProps } from 'antd';

export interface CrmFormLayoutProps extends Omit<FormProps, 'onFinish'> {
  /** Заголовок формы */
  title?: string;
  /** Описание формы */
  description?: string;
  /** Содержимое формы */
  children: React.ReactNode;
  /** Обработчик отправки формы */
  onSubmit?: (values: any) => void;
  /** Обработчик отмены */
  onCancel?: () => void;
  /** Показывать ли кнопки в футере */
  showFooter?: boolean;
  /** Текст кнопки отправки */
  submitButtonText?: string;
  /** Текст кнопки отмены */
  cancelButtonText?: string;
  /** Загружается ли отправка */
  submitLoading?: boolean;
  /** Отключить ли кнопку отправки */
  submitDisabled?: boolean;
  /** Кастомные кнопки в футере */
  footerButtons?: React.ReactNode;
  /** Оборачивать ли в Card */
  wrapped?: boolean;
  /** Пропсы для Card (если wrapped = true) */
  cardProps?: CardProps;
  /** Максимальная ширина формы */
  maxWidth?: number | string;
}

/**
 * Универсальный компонент макета формы для CRM системы
 * Обеспечивает единообразие форм по всему приложению
 */
export const CrmFormLayout: React.FC<CrmFormLayoutProps> = ({
  title,
  description,
  children,
  onSubmit,
  onCancel,
  showFooter = true,
  submitButtonText = 'Сохранить',
  cancelButtonText = 'Отмена',
  submitLoading = false,
  submitDisabled = false,
  footerButtons,
  wrapped = true,
  cardProps,
  maxWidth = '100%',
  layout = 'vertical',
  ...formProps
}) => {
  const handleFinish = (values: any) => {
    onSubmit?.(values);
  };

  const renderFooter = () => {
    if (!showFooter) return null;

    return (
      <>
        <Divider style={{ margin: '24px 0 16px' }} />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          gap: '8px',
        }}>
          {footerButtons || (
            <Space>
              {onCancel && (
                <Button 
                  onClick={onCancel}
                  style={{ minWidth: '80px' }}
                >
                  {cancelButtonText}
                </Button>
              )}
              <Button
                type="primary"
                htmlType="submit"
                loading={submitLoading}
                disabled={submitDisabled}
                style={{ 
                  minWidth: '80px',
                  background: 'var(--salon-accent)',
                  borderColor: 'var(--salon-accent)',
                }}
              >
                {submitButtonText}
              </Button>
            </Space>
          )}
        </div>
      </>
    );
  };

  const renderHeader = () => {
    if (!title && !description) return null;

    return (
      <div style={{ marginBottom: '24px' }}>
        {title && (
          <h2 style={{
            fontFamily: '"Poppins", "PT Sans", sans-serif',
            fontSize: '20px',
            fontWeight: 600,
            color: '#000000d9',
            margin: '0 0 8px 0',
          }}>
            {title}
          </h2>
        )}
        {description && (
          <p style={{
            color: '#00000073',
            fontSize: '14px',
            margin: '0',
            lineHeight: 1.5,
          }}>
            {description}
          </p>
        )}
      </div>
    );
  };

  const formContent = (
    <div style={{ maxWidth }}>
      {renderHeader()}
      <Form
        layout={layout}
        onFinish={handleFinish}
        className="crm-form-layout"
        {...formProps}
      >
        {children}
        {renderFooter()}
      </Form>
    </div>
  );

  if (!wrapped) {
    return formContent;
  }

  return (
    <Card
      bordered={false}
      style={{
        borderRadius: '8px',
        boxShadow: 'var(--salon-shadow-card)',
      }}
      styles={{
        body: {
          padding: '24px',
        },
      }}
      {...cardProps}
    >
      {formContent}
    </Card>
  );
};

export default CrmFormLayout;