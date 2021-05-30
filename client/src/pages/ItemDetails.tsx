import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';
import { isEmpty } from 'lodash';

import { Colors } from '../style/Colors';
import NumberFormat from 'react-number-format';
import { Error } from '../components/Error';

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

  const getItemDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/items/${id}`);
      setLoading(false);
      if (response.data.error) {
        setError(response.data.error);
      } else {
        setItemDetails(response.data.itemDetails);
      }
    } catch (error) {
      setError(error);
    }
  }, [id]);

  useEffect(() => {
    getItemDetails();
  }, [getItemDetails]);

  return (
    <Container>
      {loading ? (
        <LoadingContainer>
          <ClipLoader color={Colors.BLUE} loading={loading} size={150} />
        </LoadingContainer>
      ) : (
        <>
          {hasError && <Error />}
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
  width: 100%;
  display: inline-block;
  padding: 16px;
  background-color: ${Colors.WHITE};

  @media (max-width: 650px) {
    margin: 8px;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  align-content: start;

  @media (max-width: 1000px) {
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
  max-width: 380px;
  width: auto;
  height: auto;

  @media (max-width: 1000px) {
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
  max-width: 250px;
  height: 5vh;
  background-color: ${Colors.BLUE};
  border: none;
  border-radius: 4px;

  @media (max-width: 1000px) {
    width: 250px;
    align-self: center;
  }
`;

const ButtonText = styled.p`
  margin: 8px;
  font-size: 16px;
  color: ${Colors.WHITE};
`;

const DescriptionContainer = styled.div`
  max-width: 50vw;
  grid-row-start: 4;
  grid-row-end: 5;
  grid-column-start: 1;
  grid-column-end: 1;

  @media (max-width: 1000px) {
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
  font-size: 16px;
  padding: 32px 0 0 0;
  color: ${Colors.GREY_700};
  white-space: break-spaces;
`;

export default ItemDetails;
