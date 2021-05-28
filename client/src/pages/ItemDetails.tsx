import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

import { Colors } from '../style/Colors';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

/*
 * Types
 */

export type ItemDetailsType = {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  freeShipping: string;
  soldQuantity: string;
  description: string;
};

const ItemDefault = {
  id: '',
  title: '',
  price: {
    currency: '',
    amount: 0,
    decimals: 0,
  },
  picture: '',
  condition: '',
  freeShipping: '',
  soldQuantity: '',
  description: '',
};

/*
 * Item Details Component
 */

const ItemDetails = (props: RouteComponentProps<{ id: string }>) => {
  const id = props.match.params.id;
  const [itemDetails, setItemDetails] = useState<ItemDetailsType>(ItemDefault);
  const [error, setError] = useState('');

  const hasError = !isEmpty(error);
  const hasItemDetails = !isEmpty(itemDetails);

  useEffect(() => {
    fetch(`http://localhost:8080/api/items/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setItemDetails(res?.item);
      })
      .catch((error) => setError(error));
  }, [id]);

  return (
    <Container>
      {hasError && <p>ERROR</p>}
      {hasItemDetails && (
        <ContentContainer>
          <p>{itemDetails.title}</p>
        </ContentContainer>
      )}
    </Container>
  );
};

/*
 * Styles
 */

const Container = styled.div`
  padding: 8px;
  margin: 16px;
  background-color: ${Colors.WHITE};
  border-bottom: 1px solid ${Colors.GREY_300};
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: 1fr;
  align-content: start;
`;

export default ItemDetails;
