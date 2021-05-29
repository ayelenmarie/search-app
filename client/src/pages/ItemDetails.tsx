import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

import { Colors } from '../style/Colors';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import NumberFormat from 'react-number-format';

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
  const [loading, setLoading] = useState<boolean>(false);

  const hasError = !isEmpty(error);
  const hasItemDetails = !isEmpty(itemDetails);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/api/items/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setLoading(false);
        if (res.error) {
          setError(res.error);
        } else {
          setItemDetails(res.itemDetails);
        }
      })
      .catch((error) => setError(error));
  }, [id]);

  return (
    <Container>
      {loading ? (
        <p>LOADING</p>
      ) : (
        <>
          {hasError && <p>ERROR</p>}
          {hasItemDetails && (
            <ContentContainer>
              <Image src={itemDetails.picture} />
              <TitleContainer>
                <Condition>{`${itemDetails.condition} - ${itemDetails.soldQuantity} vendidos`}</Condition>
                <Title>{itemDetails.title}</Title>
                <Price
                  // Asuming we only need round part of number, I used amount alone
                  value={itemDetails.price.amount}
                  displayType={'text'}
                  decimalSeparator=","
                  thousandSeparator="."
                  prefix={'$ '}
                />
                <Button>
                  <ButtonText>Comprar</ButtonText>
                </Button>
              </TitleContainer>
              <DescriptionContainer>
                <DescriptionTitle>Descripción del producto</DescriptionTitle>
                <Description>{itemDetails.description}</Description>
              </DescriptionContainer>
            </ContentContainer>
          )}
        </>
      )}
    </Container>
  );
};

/*
 * Styles
 */

const Container = styled.div`
  display: inline-block;
  padding: 16px;
  margin: 48px;
  background-color: ${Colors.WHITE};

  @media (max-width: 650px) {
    margin: 8px;
  }
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 6fr 4fr;
  align-content: start;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const TitleContainer = styled.div`
  max-width: 80%;
  margin-top: 32px;
  display: flex;
  flex-direction: column;

  @media (min-width: 1000px) {
    justify-self: end;
  }
`;

const Condition = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${Colors.GREY_700};
`;

const Title = styled.p`
  margin: 16px 0 0 0;
  font-size: 24px;
  font-weight: 600;
`;

const Image = styled.img`
  max-width: 50vw;
  width: auto;
  height: auto;

  @media (max-width: 1000px) {
    max-width: 380px;
  }

  @media (max-width: 650px) {
    max-width: 30vw;
    justify-self: center;
  }
`;

const Price = styled(NumberFormat)`
  font-size: 46px;
  font-weight: 300;
  margin-top: 32px;
`;

const Button = styled.button`
  margin-top: 32px;
  width: 250px;
  height: 5vh;
  background-color: ${Colors.BLUE};
  border: none;
  border-radius: 4px;
  @media (max-width: 650px) {
    min-width: 150px;
    max-width: 200px;
    align-self: center;
  }
`;

const ButtonText = styled.p`
  margin: 8px;
  font-size: 16px;
  color: ${Colors.WHITE};
`;

const DescriptionContainer = styled.div`
  grid-row-start: 4;
  grid-row-end: 5;
  grid-column-start: 1;
  grid-column-end: 3;

  @media (max-width: 650px) {
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 1;
    grid-column-end: 1;
    margin-top: 32px;
  }
`;

const DescriptionTitle = styled.p`
  font-size: 28px;
  margin: 0;
  color: ${Colors.GREY_900};
`;

const Description = styled.p`
  width: 90vw;
  font-size: 16px;
  margin: 0 !important;
  padding: 32px 0 0 0;
  color: ${Colors.GREY_700};
  white-space: break-spaces;
`;

export default ItemDetails;
