import styled from 'styled-components';
import NumberFormat from 'react-number-format';

import { Colors } from '../style/Colors';
import Shipping from '../images/ic_shipping.png';
import { useHistory } from 'react-router';

/*
 * Types
 */

export type ItemType = {
  condition: string;
  freeShipping: boolean;
  id: string;
  picture: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  title: string;
  location: string;
};

type ItemProps = {
  item: ItemType;
};

/*
 * Item Component
 */

export const Item: React.FC<ItemProps> = ({ item }) => {
  let history = useHistory();

  const hasFreeShipping = item?.freeShipping;

  return (
    <ContainerButton onClick={() => history.push(`/items/${item.id}`)}>
      <ContentContainer>
        <Image src={item.picture} alt={item.title} />
        <PriceContainer>
          <NumberFormat
            // Asuming we only need round part of number, I used amount alone
            value={item.price.amount}
            displayType={'text'}
            decimalSeparator=","
            thousandSeparator="."
            prefix={'$ '}
            data-testid="Price"
          />
          {hasFreeShipping && <ShippingTag src={Shipping} alt="Envío gratis" />}
        </PriceContainer>
        <Location>{item.location}</Location>
        <Title>{item.title}</Title>
      </ContentContainer>
    </ContainerButton>
  );
};

/*
 * Styles
 */

const ContainerButton = styled.button`
  border: none;
  text-decoration: none;
  color: inherit;
  padding: 0;
  background-color: ${Colors.WHITE};
  border-bottom: 1px solid ${Colors.GREY_300};
`;

const ContentContainer = styled.div`
  padding: 8px;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: 25% 75%;
  align-content: start;

  @media (max-width: 650px) {
    grid-template-columns: 100%;
    grid-template-rows: 1fr;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 650px) {
    padding-top: 16px;
  }
`;

const ShippingTag = styled.img`
  margin-left: 8px;
  width: 16px;
  height: 16px;
`;

const Image = styled.img`
  margin-right: 16px;
  width: 100px;
  height: 100px;
  grid-row-start: 1;
  grid-row-end: 3;
  justify-self: center;

  @media (max-width: 650px) {
    grid-row: 1 / 2;
    width: 150px;
    height: 150px;
  }
`;

const Title = styled.p`
  font-size: 18px;
  margin: 0px;
  text-align: start;
  @media (max-width: 650px) {
    order: -2;
    padding-top: 16px;
  }
`;

const Location = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${Colors.GREY_500};
  text-align: end;

  @media (max-width: 650px) {
    order: -4;
    margin: 0;
    padding-top: 8px;
    text-align: start;
  }
`;
