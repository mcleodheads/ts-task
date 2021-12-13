import React, { useEffect } from 'react';
import CategorySelector from '../Components/CategorySelector';
import TableData from '../Components/TableData';
import { useAppDispatch } from '../Hooks/storeHooks';
import { configurationRequest } from '../Store/reducers/tableReducer';

const Table: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(configurationRequest());
  }, [dispatch]);

  return (
    <div>
      <CategorySelector />
      <div>
        <TableData />
      </div>
    </div>
  );
};

export default Table;
