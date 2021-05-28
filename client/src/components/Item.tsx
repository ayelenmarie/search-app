import styled from 'styled-components';

import { Colors } from '../style/Colors';

type ItemProps = {
  item: any;
};

export const Item: React.FC<ItemProps> = ({ item }) => {
  return (
    <Container>
      <p>{item.title}</p>
    </Container>
  );
};

/*
 * Styles
 */

const Container = styled.div`
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${Colors.YELLOW};
`;
