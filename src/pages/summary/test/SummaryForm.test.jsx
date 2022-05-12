import { fireEvent, render, screen } from '@testing-library/react';
import { SummaryForm } from '../SummaryForm';

test('checkbox is unchecked by default', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: /i agree to terms and conditions/i
  });

  expect(checkbox).not.toBeChecked();
});

test('checking/unchecking checkbox enables/disables button', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: /i agree to terms and conditions/i
  });
  const button = screen.getByRole('button', { name: /confirm order/i });

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
});
