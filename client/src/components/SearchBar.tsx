import { useState, useCallback } from 'react';
import styled from 'styled-components';

import { Colors } from '../style/Colors';
import Logo from '../images/Logo_ML.png';
import Search from '../images/ic_Search.png';

type SearchBarProps = {
  onClick: (inputValue: string | undefined) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ onClick }) => {
  const [inputValue, setInputValue] = useState<string | undefined>();
  console.log(inputValue);

  const handleClick = useCallback(() => {
    onClick(inputValue);
  }, [inputValue, onClick]);

  return (
    <Container>
      <img src={Logo} alt="Logo Mercado Libre" />
      <SearchInput
        placeholder="Nunca dejes de buscar"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <ButtonContainer onClick={handleClick}>
        <img src={Search} alt="Buscar" />
      </ButtonContainer>
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
const SearchInput = styled.input`
  width: 70%;
  border: none;
  margin-left: 32px;
  padding: 8px 16px 8px 16px;
  font-size: 18px;
  ::placeholder {
    color: ${Colors.GREY_500};
  }
  :focus {
    outline: none;
  }
`;
const ButtonContainer = styled.button`
  border: none;
  padding: 8px;
  width: 40px;
`;
