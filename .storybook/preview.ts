import type { Preview } from '@storybook/react';
import { ConfigProvider } from 'antd';
import React from 'react';
import salonFlowTheme from '../src/theme';
import 'antd/dist/reset.css';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1f1f1f',
        },
        {
          name: 'salon-bg',
          value: '#f5f5f5',
        },
      ],
    },
  },
  decorators: [
    (Story) => {
      return React.createElement(
        ConfigProvider,
        { theme: salonFlowTheme },
        React.createElement(
          'div',
          { 
            style: { 
              padding: '20px', 
              minHeight: '100vh',
              backgroundColor: '#ffffff'
            } 
          },
          React.createElement(Story)
        )
      );
    },
  ],
};

export default preview;