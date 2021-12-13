import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../Hooks/storeHooks';

const TableData: React.FC = () => {
  const { t } = useTranslation();
  const searchingResults = useAppSelector(
    (state) => state.tableReducer.searchingResults
  );

  return <div>Table</div>;
};

export default TableData;
