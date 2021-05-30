import styled from 'styled-components';

import ArrowIcon from '../images/right-arrow-angle.png';
import { Colors } from '../style/Colors';

/*
 * Types
 */

type BreadcrumbProps = {
  categories: string[];
};

/*
 * Breadcrumb Component
 */

export const Breadcrumb = ({ categories }: BreadcrumbProps) => {
  return (
    <Container>
      {categories &&
        categories?.map((category: string, index: number, arr) => {
          return (
            <>
              {index != arr.length - 1 ? (
                <>
                  <Category key={index}>{category}</Category>
                  <Arrow src={ArrowIcon} />
                </>
              ) : (
                <Category key={index}>{category}</Category>
              )}
            </>
          );
        })}
    </Container>
  );
};

/*
 * Styles
 */

const Container = styled.ul`
  margin: 0 0 16px 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: baseline;
`;

const Category = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${Colors.GREY_500};

  :last-child {
    font-weight: 700;
  }
`;

const Arrow = styled.img`
  margin: 0 8px 0 8px;
  width: 10px;
  height: 10px;
  outline-color: ${Colors.GREY_500};
`;
