import React, { useEffect, useState } from 'react';
import { Item } from 'semantic-ui-react';

import { useAppDispatch, useAppSelector } from '../Hooks/storeHooks';
import { forSelectRequest, popupRequest } from '../Store/reducers/tableReducer';
import PopupInputs from './PopupInputs';

interface Props {
  column: any;
}

const PopupContent: React.FC<Props> = ({ column }) => {
  const [value, setValue] = useState<string | boolean | undefined>();
  const dispatch = useAppDispatch();
  const { activeCategory } = useAppSelector((state) => state.tableReducer);

  useEffect(() => {
    const config = {
      filter: { [column.id]: value },
    };
    dispatch(popupRequest({ name: activeCategory.name, config }));
  }, [activeCategory.name, column.id, dispatch, value]);

  useEffect(() => {
    const { id } = column;
    dispatch(forSelectRequest({ name: activeCategory.name, id }));
  }, [activeCategory.name, column, dispatch]);

  return (
    <Item>
      <PopupInputs
        setValue={setValue}
        value={value}
        type={column.type}
        column={column}
      />
    </Item>
  );
};

export default PopupContent;
