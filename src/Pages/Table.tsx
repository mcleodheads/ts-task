import React, { useEffect } from 'react';
import CategorySelector from '../Components/CategorySelector';
import TableData from '../Components/TableData';
import { useAppDispatch, useAppSelector } from '../Hooks/storeHooks';
import { configurationRequest } from '../Store/reducers/tableReducer';

const Table: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeCategory } = useAppSelector((state) => state.tableReducer);
  useEffect(() => {
    dispatch(configurationRequest());
  }, [dispatch]);

  return (
    <div>
      <CategorySelector />
      {activeCategory?.name !== '' ? (
        <div>
          <TableData />
        </div>
      ) : null}
    </div>
  );
};

export default Table;
