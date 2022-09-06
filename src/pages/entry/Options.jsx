import axios from 'axios';
import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { AlertBanner } from '../common/AlertBanner';
import { ScoopOption } from './ScoopOption';
import { ToppingOption } from './ToppingOption';

/**
 * Options component
 * @param {{optionType: 'scoops' | 'toppings'}} props
 */
export function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then(response => {
        setItems(response.data);
        setHasError(false);
      })
      .catch(() => {
        setHasError(true);
      });
  }, [optionType]);

  if (hasError) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

  const optionItems = items.map(item => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
}
