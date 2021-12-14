import React, { useEffect, useState } from 'react';
import { Item } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../Hooks/storeHooks';
import { forSelectRequest, popupRequest } from '../Store/reducers/tableReducer';
import PopupInputs from './PopupInputs';

interface Props {
  column: any;
}

const PopupContent = ({ column }: Props) => {
  const [value, setValue] = useState<string>('');
  const dispatch = useAppDispatch();
  const { activeCategory } = useAppSelector((state) => state.tableReducer);

  useEffect(() => {
    const config = {
      filter: { [column.id]: value },
    };
    dispatch(popupRequest({ name: activeCategory.name, config }));
  }, [value]);

  useEffect(() => {
    const { id } = column;
    dispatch(forSelectRequest({ name: activeCategory.name, id }));
  }, []);

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
