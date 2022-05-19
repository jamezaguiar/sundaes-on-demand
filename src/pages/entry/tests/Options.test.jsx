import { render, screen } from '@testing-library/react';
import { Options } from '../Options';

test('displays image for each scoops option from server', async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const scoopAltText = scoopImages.map(element => element.alt);
  expect(scoopAltText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each toppings option from server', async () => {
  render(<Options optionType="toppings" />);

  const toppingImages = await screen.findAllByRole('img', {
    name: /topping$/i
  });
  expect(toppingImages).toHaveLength(3);

  const toppingAltText = toppingImages.map(element => element.alt);
  expect(toppingAltText).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping'
  ]);
});
