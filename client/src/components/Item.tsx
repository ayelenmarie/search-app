import styled from 'styled-components';
import NumberFormat from 'react-number-format';

import { Colors } from '../style/Colors';
import Shipping from '../images/ic_shipping.png';
import { Link } from 'react-router-dom';

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
  const hasFreeShipping = item?.freeShipping;

  return (
    <ContainerLink
      to={{
        pathname: `/items/${item.id}`,
      }}
    >
      <Container>
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
            />
            {hasFreeShipping && (
              <ShippingTag src={Shipping} alt="Envío gratis" />
            )}
          </PriceContainer>
          <Location>{item.location}</Location>
          <Title>{item.title}</Title>
        </ContentContainer>
      </Container>
    </ContainerLink>
  );
};

/*
 * Styles
 */

const ContainerLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

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

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    grid-template-rows: 2fr 1fr 1fr 1fr;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
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
  align-self: start;
  @media (max-width: 650px) {
    order: -2;
  }
`;

const Location = styled.p`
  margin-left: 16px;
  font-size: 12px;
  color: ${Colors.GREY_500};

  @media (max-width: 650px) {
    order: -4;
    margin: 0;
  }
`;
