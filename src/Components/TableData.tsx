import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimmer, Loader, Segment, Table } from 'semantic-ui-react';
import { useFlexLayout, useResizeColumns, useTable } from 'react-table';
import { useAppSelector } from '../Hooks/storeHooks';

const TableData: React.FC = () => {
  const { t } = useTranslation();
  const { activeCategory } = useAppSelector((state) => state.tableReducer);
  const { searchingResults } = useAppSelector((state) => state.tableReducer);
  const { isLoading } = useAppSelector((state) => state.tableReducer);

  const columns = useMemo(
    () =>
      activeCategory.columns.map((item: { name: string }) => {
        return {
          Header: `${t(item.name)}`,
          accessor: item.name,
        };
      }),
    [t, activeCategory]
  );

  const data = useMemo(() => {
    return searchingResults.items;
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

  return (
    <>
      {isLoading ? (
        <Segment>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </Segment>
      ) : (
        <Table selectable celled {...getTableProps()}>
          <Table.Header>
            {headerGroups.map((headerGroup) => (
              <Table.Row {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((col) => (
                  <Table.HeaderCell {...col.getHeaderProps()}>
                    {col.render('Header')}
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <Table.Row {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Table.Cell {...cell.getCellProps()}>
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
    </>
  );
};

export default TableData;
