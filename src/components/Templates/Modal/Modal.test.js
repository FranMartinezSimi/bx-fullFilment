import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Modal from './index';

test('Render content', () => {
  const config = {
    title: 'Modal Title',
    showModal: true
  }
  const component = render(<Modal title={config.title} showModal={config.showModal} />);
  component.getByText('Modal Title');
});

test('Click button close should be calls once', () => {
  const config = {
    title: 'Modal Title',
    showModal: true
  }
  const mockHandler = jest.fn();
  const component = render(<Modal title={config.title} showModal={config.showModal} onClick={mockHandler}/>);
  const button = component.getByTestId('printed-username');
  fireEvent.click(button);

  expect(mockHandler).toHaveBeenCalledTimes(1);
})