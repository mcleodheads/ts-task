import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimmer,
  Divider,
  Icon,
  Loader,
  Popup,
  Segment,
  Table,
} from 'semantic-ui-react';
import { Row, useFlexLayout, useResizeColumns, useTable } from 'react-table';

import { useAppDispatch, useAppSelector } from '../Hooks/storeHooks';
import ModalTable from './ModalTable';
import PopupContent from './PopupContent';
import { popupRequest } from '../Store/reducers/tableReducer';
import { ICell } from '../Types/TableTypes/TableTypes';

import '../Assets/index.css';

const TableData: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [chosenRow, setChosenRow] = useState({});
  const [chosenCell, setChosenCell] = useState<ICell>({
    value: '',
    column: {},
    row: {},
  });
  const { t } = useTranslation();
  const { activeCategory } = useAppSelector((state) => state.tableReducer);
  const { searchingResults } = useAppSelector((state) => state.tableReducer);
  const { isLoading } = useAppSelector((state) => state.tableReducer);
  const { filteredItems } = useAppSelector((state) => state.tableReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const config = { filter: {} };
    dispatch(popupRequest({ name: activeCategory.name, config }));
  }, [activeCategory, dispatch]);

  const columns = useMemo(
    () =>
      activeCategory?.columns.map((item: { name: string; type: string }) => {
        return {
          Header: `${t(item.name)}`,
          accessor: item.name,
          type: item.type,
        };
      }),
    [activeCategory?.columns, t]
  );

  const data = useMemo(() => {
    return searchingResults?.items;
  }, [searchingResults]);

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: Math.round(window.innerWidth * (10 / 100)),
      width: Math.round(window.innerWidth * (15 / 100)),
      maxWidth: Math.round(window.innerWidth * (25 / 100)),
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
      },
      useResizeColumns,
      useFlexLayout
    );

  const modalCaller = (cell: ICell) => {
    setModalOpen(true);
    setChosenRow(cell.row.original);
    setChosenCell(cell);
  };

  return (
    <div className="table-wrapper">
      {isLoading ? (
        <Segment>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </Segment>
      ) : (
        <Table className="table" selectable celled {...getTableProps()}>
          <Table.Header>
            {headerGroups.map((headerGroup) => (
              <Table.Row {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Table.HeaderCell {...column.getHeaderProps()}>
                    <div className="headerTable">
                      {column.render('Header')}
                      <Popup
                        content={<PopupContent column={column} />}
                        pinned
                        on="click"
                        position="top right"
                        trigger={
                          <Icon className="table-popup-trigger" name="filter" />
                        }
                      />
                      <Divider className="table-divider" />
                    </div>
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body {...getTableBodyProps()}>
            {rows
              .filter((row: Row<any>) => {
                return filteredItems.data.includes(row.original.id);
              })
              .map((row) => {
                prepareRow(row);
                return (
                  <Table.Row {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <Table.Cell
                        {...cell.getCellProps()}
                        onClick={() => modalCaller(cell)}
                      >
                        {/* eslint-disable-next-line no-nested-ternary */}
                        {cell.value !== null
                          ? cell.value?.name !== undefined
                            ? `${t(cell.value?.name)}`
                            : `${
                                Array.isArray(cell.value)
                                  ? cell.value.map((item) => item.name)
                                  : `${t(cell.value)}`
                              }`
                          : `${t('emptyValue')}`}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      )}
      {modalOpen ? (
        <ModalTable
          chosenCell={chosenCell}
          activeCategory={activeCategory}
          row={chosenRow}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      ) : null}
    </div>
  );
};

export default TableData;
