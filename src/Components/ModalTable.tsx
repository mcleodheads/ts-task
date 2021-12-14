import React, { useEffect } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../Hooks/storeHooks';
import { forSelectRequest, modalRequest } from '../Store/reducers/tableReducer';
import { IActiveCategory, ICell } from '../Types/TableTypes/TableTypes';
import ModalInput from './ModalInput';

interface Props {
  open: boolean;
  onClose: () => void;
  row: any;
  activeCategory: IActiveCategory;
  chosenCell: any;
}

const ModalTable = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const data = {
      name: props.activeCategory?.name,
      id: props.row.id,
    };
    dispatch(modalRequest(data));
  }, [props.open]);

  return (
    <>
      {Object.keys(props.row).length !== 0 ? (
        <Modal
          size="large"
          dimmer="blurring"
          open={props.open}
          onClose={props.onClose}
        >
          <Modal.Content>
            <div className="inputs-wrapper">
              {props.chosenCell.row.cells.map((cell: ICell) => (
                <div className="single-input" key={cell.column.id}>
                  {t(cell.column.Header)}
                  <ModalInput type={cell.value} cell={cell} />
                </div>
              ))}
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={props.onClose}>
              {`${t(`CancelButton`)}`}
            </Button>
            <Button positive onClick={props.onClose}>
              {`${t(`SaveButton`)}`}
            </Button>
          </Modal.Actions>
        </Modal>
      ) : null}
    </>
  );
};

export default ModalTable;
