/*
 * Styles
 */

import styled from 'styled-components';
import { Colors } from '../style/Colors';

export const Error = () => {
  return (
    <Container>
      <Text>Ocurrió un error, inténtelo de nuevo más tarde.</Text>
    </Container>
  );
};

/*
 * Styles
 */

const Container = styled.div`
  background-color: ${Colors.WHITE};
`;

const Text = styled.p`
  font-size: 24px;
  color: red;
`;
