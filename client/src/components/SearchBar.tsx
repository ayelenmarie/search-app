import { ChangeEvent, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Colors } from '../style/Colors';
import Logo from '../images/Logo_ML.png';
import Search from '../images/ic_Search.png';

type SearchBarProps = {
  onSubmit: (value: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = useCallback(
    (value: React.FormEvent<HTMLFormElement>) => {
      value.preventDefault();
      onSubmit(inputValue);
      setInputValue('');
    },
    [onSubmit, inputValue]
  );

  return (
    <Container data-test-id="SearchBar">
      <WidthContainer>
        <Link to="/">
          <img src={Logo} alt="Logo Mercado Libre" />
        </Link>
        <Form onSubmit={(value) => handleSubmit(value)}>
          <SearchInput
            type="text"
            placeholder="Nunca dejes de buscar"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.currentTarget.value)
            }
            value={inputValue}
            aria-label="search-input"
          />
          <ButtonContainer>
            <img src={Search} alt="Buscar" />
          </ButtonContainer>
        </Form>
      </WidthContainer>
    </Container>
  );
};

/*
 * Styles
 */

const Container = styled.div`
  padding: 8px;
  background-color: ${Colors.YELLOW};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WidthContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-left: 32px;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
