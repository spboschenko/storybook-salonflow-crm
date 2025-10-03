import type { Meta } from '@storybook/react/*';

const meta: Meta = {
  title: 'Documentation/Welcome',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <div style={{ 
          padding: '40px',
          fontFamily: '"PT Sans", sans-serif',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '60px',
            background: 'linear-gradient(135deg, #9370DB 0%, #B19CD9 100%)',
            color: 'white',
            padding: '60px 40px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(147, 112, 219, 0.3)'
          }}>
            <h1 style={{ 
              fontSize: '3.5rem', 
              margin: '0 0 16px 0',
              fontFamily: '"Poppins", sans-serif',
              fontWeight: '700'
            }}>
              SalonFlow CRM
            </h1>
            <h2 style={{ 
              fontSize: '1.5rem', 
              margin: '0 0 24px 0',
              fontWeight: '400',
              opacity: '0.9'
            }}>
              Дизайн-система компонентов
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              margin: '0 auto',
              opacity: '0.8',
              maxWidth: '600px'
            }}>
              Консистентная библиотека компонентов для создания современных интерфейсов CRM системы
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '32px',
            marginBottom: '60px'
          }}>
            <div style={{ 
              padding: '32px',
              border: '1px solid #e8e8e8',
              borderRadius: '12px',
              background: '#ffffff',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{ 
                color: '#9370DB',
                fontSize: '1.4rem',
                marginBottom: '16px',
                fontFamily: '"Poppins", sans-serif'
              }}>
                🎨 Дизайн-система
              </h3>
              <p style={{ 
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '16px'
              }}>
                Полный набор компонентов для форм, навигации и интерфейса с едиными принципами дизайна
              </p>
              <ul style={{ 
                color: '#666',
                lineHeight: '1.6',
                paddingLeft: '20px'
              }}>
                <li>Формы: кнопки, поля ввода, селекты, чекбоксы</li>
                <li>Навигация: меню, breadcrumbs, пагинация</li>
                <li>Макет: модальные окна, карточки, контейнеры</li>
              </ul>
            </div>

            <div style={{ 
              padding: '32px',
              border: '1px solid #e8e8e8',
              borderRadius: '12px',
              background: '#ffffff',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{ 
                color: '#9370DB',
                fontSize: '1.4rem',
                marginBottom: '16px',
                fontFamily: '"Poppins", sans-serif'
              }}>
                ⚡ Технологии
              </h3>
              <p style={{ 
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '16px'
              }}>
                Современный стек технологий для разработки масштабируемых приложений
              </p>
              <ul style={{ 
                color: '#666',
                lineHeight: '1.6',
                paddingLeft: '20px'
              }}>
                <li>React 18 + TypeScript</li>
                <li>Ant Design UI Framework</li>
                <li>Storybook для разработки компонентов</li>
                <li>CSS Modules для стилизации</li>
              </ul>
            </div>

            <div style={{ 
              padding: '32px',
              border: '1px solid #e8e8e8',
              borderRadius: '12px',
              background: '#ffffff',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{ 
                color: '#9370DB',
                fontSize: '1.4rem',
                marginBottom: '16px',
                fontFamily: '"Poppins", sans-serif'
              }}>
                🎯 Принципы
              </h3>
              <p style={{ 
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '16px'
              }}>
                Фундаментальные принципы проектирования наших компонентов
              </p>
              <ul style={{ 
                color: '#666',
                lineHeight: '1.6',
                paddingLeft: '20px'
              }}>
                <li>Консистентность интерфейса</li>
                <li>Доступность (a11y)</li>
                <li>Переиспользуемость кода</li>
                <li>Типобезопасность</li>
              </ul>
            </div>
          </div>

          <div style={{ 
            background: '#f8f9fa',
            padding: '40px',
            borderRadius: '12px',
            marginBottom: '40px'
          }}>
            <h2 style={{ 
              fontSize: '2rem',
              marginBottom: '24px',
              color: '#333',
              fontFamily: '"Poppins", sans-serif'
            }}>
              Цветовая палитра
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '20px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '100%',
                  height: '80px',
                  backgroundColor: '#9370DB',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  boxShadow: '0 4px 12px rgba(147, 112, 219, 0.3)'
                }} />
                <h4 style={{ margin: '0 0 4px 0', color: '#333' }}>Primary</h4>
                <code style={{ color: '#666', fontSize: '0.9rem' }}>#9370DB</code>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '100%',
                  height: '80px',
                  backgroundColor: '#B19CD9',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  boxShadow: '0 4px 12px rgba(177, 156, 217, 0.3)'
                }} />
                <h4 style={{ margin: '0 0 4px 0', color: '#333' }}>Primary Light</h4>
                <code style={{ color: '#666', fontSize: '0.9rem' }}>#B19CD9</code>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '100%',
                  height: '80px',
                  backgroundColor: '#52c41a',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  boxShadow: '0 4px 12px rgba(82, 196, 26, 0.3)'
                }} />
                <h4 style={{ margin: '0 0 4px 0', color: '#333' }}>Success</h4>
                <code style={{ color: '#666', fontSize: '0.9rem' }}>#52c41a</code>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '100%',
                  height: '80px',
                  backgroundColor: '#ff4d4f',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  boxShadow: '0 4px 12px rgba(255, 77, 79, 0.3)'
                }} />
                <h4 style={{ margin: '0 0 4px 0', color: '#333' }}>Error</h4>
                <code style={{ color: '#666', fontSize: '0.9rem' }}>#ff4d4f</code>
              </div>
            </div>
          </div>

          <div style={{ 
            background: '#ffffff',
            border: '1px solid #e8e8e8',
            padding: '40px',
            borderRadius: '12px'
          }}>
            <h2 style={{ 
              fontSize: '2rem',
              marginBottom: '24px',
              color: '#333',
              fontFamily: '"Poppins", sans-serif'
            }}>
              Типографика
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '32px'
            }}>
              <div>
                <h3 style={{ 
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: '1.5rem',
                  marginBottom: '8px',
                  color: '#333'
                }}>
                  Заголовки
                </h3>
                <p style={{ color: '#666', marginBottom: '16px' }}>
                  Poppins - для заголовков и акцентов
                </p>
                <div style={{ fontFamily: '"Poppins", sans-serif' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>H1 Heading</div>
                  <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>H2 Heading</div>
                  <div style={{ fontSize: '1.25rem', marginBottom: '8px' }}>H3 Heading</div>
                </div>
              </div>
              <div>
                <h3 style={{ 
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: '1.5rem',
                  marginBottom: '8px',
                  color: '#333'
                }}>
                  Основной текст
                </h3>
                <p style={{ color: '#666', marginBottom: '16px' }}>
                  PT Sans - для основного контента
                </p>
                <div style={{ fontFamily: '"PT Sans", sans-serif' }}>
                  <div style={{ fontSize: '1rem', marginBottom: '8px' }}>Body Text Regular</div>
                  <div style={{ fontSize: '0.875rem', marginBottom: '8px' }}>Small Text</div>
                  <div style={{ fontSize: '0.75rem', marginBottom: '8px' }}>Caption Text</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ 
            textAlign: 'center',
            marginTop: '60px',
            padding: '40px',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            borderRadius: '12px'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem',
              marginBottom: '16px',
              color: '#333',
              fontFamily: '"Poppins", sans-serif'
            }}>
              Начните изучение
            </h2>
            <p style={{ 
              color: '#666',
              marginBottom: '24px',
              fontSize: '1.1rem'
            }}>
              Исследуйте компоненты в боковом меню и посмотрите примеры их использования
            </p>
            <div style={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <span style={{ 
                padding: '8px 16px',
                background: '#9370DB',
                color: 'white',
                borderRadius: '20px',
                fontSize: '0.9rem'
              }}>
                Design System → Forms
              </span>
              <span style={{ 
                padding: '8px 16px',
                background: '#52c41a',
                color: 'white',
                borderRadius: '20px',
                fontSize: '0.9rem'
              }}>
                Examples → Complete Forms
              </span>
              <span style={{ 
                padding: '8px 16px',
                background: '#1890ff',
                color: 'white',
                borderRadius: '20px',
                fontSize: '0.9rem'
              }}>
                Design System → Navigation
              </span>
            </div>
          </div>
        </div>
      )
    }
  }
};

export default meta;

export const WelcomePage = {};