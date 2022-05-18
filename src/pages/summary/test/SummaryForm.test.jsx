import {
  act,
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react';
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

test('popover responds to hover', async () => {
  render(<SummaryForm />);

  const user = userEvent.setup();

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );

  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);

  await user.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);

  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out

  await user.unhover(termsAndConditions);

  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
