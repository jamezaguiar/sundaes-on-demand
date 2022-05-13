import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SummaryForm } from '../SummaryForm';

test('checkbox is unchecked by default', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: /i agree to terms and conditions/i
  });

  expect(checkbox).not.toBeChecked();
});

test('checking/unchecking checkbox enables/disables button', async () => {
  render(<SummaryForm />);

  const user = userEvent.setup();

  const checkbox = screen.getByRole('checkbox', {
    name: /i agree to terms and conditions/i
  });
  const button = screen.getByRole('button', { name: /confirm order/i });

  await act(async () => {
    await user.click(checkbox);
  });
  expect(button).toBeEnabled();

  await act(async () => {
    await user.click(checkbox);
  });
  expect(button).toBeDisabled();
});

test.todo('popover responds to hover');
