import React, { useEffect } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../Hooks/storeHooks';
import { modalRequest } from '../Store/reducers/tableReducer';
import { IActiveCategory, ICell } from '../Types/TableTypes/TableTypes';
import ModalInput from './ModalInput';

interface Props {
  open: boolean;
  onClose: () => void;
  row: any;
  activeCategory: IActiveCategory;
  chosenCell: any;
}

const ModalTable: React.FC<Props> = ({
  open,
  onClose,
  row,
  activeCategory,
  chosenCell,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const data = {
      name: activeCategory?.name,
      id: row.id,
    };
    dispatch(modalRequest(data));
  }, [activeCategory?.name, dispatch, open, row.id]);

  return (
    <>
      {Object.keys(row).length !== 0 ? (
        <Modal size="large" dimmer="blurring" open={open} onClose={onClose}>
          <Modal.Content>
            <div className="inputs-wrapper">
              {chosenCell.row.cells.map((cell: ICell) => (
                <div className="single-input" key={cell.column.id}>
                  {t(cell.column.Header)}
                  <ModalInput type={cell.value} cell={cell} />
                </div>
              ))}
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={onClose}>
              {`${t(`CancelButton`)}`}
            </Button>
            <Button positive onClick={onClose}>
              {`${t(`SaveButton`)}`}
            </Button>
          </Modal.Actions>
        </Modal>
      ) : null}
    </>
  );
};

export default ModalTable;
