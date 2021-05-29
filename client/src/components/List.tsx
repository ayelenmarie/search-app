import { isEmpty } from 'lodash';

import { ItemType, Item } from './Item';
import styled from 'styled-components';
import { Colors } from '../style/Colors';

type ListProps = {
  items: ItemType[];
};

const List: React.FC<ListProps> = ({ items }) => {
  const hasItems = !isEmpty(items);
  return (
    <ContentContainer>
      <ItemsList>
        {hasItems &&
          items?.map((item: any) => {
            return <Item item={item} />;
          })}
      </ItemsList>
    </ContentContainer>
  );
};

/*
 * Styles
 */

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
`;

const ItemsList = styled.div`
  background-color: ${Colors.WHITE};
  width: 75%;
`;

export default List;
