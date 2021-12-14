import React from 'react';
import { Input } from '@mui/material';
import { Form, Loader, Segment, Checkbox } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../Hooks/storeHooks';

interface Props {
  setValue: (e?: any) => void;
  value: string;
  type: string;
  column: any;
}

const PopupInputs: React.FC<Props> = ({ setValue, value, type, column }) => {
  const { t } = useTranslation();
  const { filteredItems } = useAppSelector((state) => state.tableReducer);
  switch (type) {
    case 'Date':
      return (
        <Input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder="dd.mm.yyyy"
        />
      );

    case 'Number':
    case 'Integer':
      return (
        <Input
          type="number"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder={column.Header}
        />
      );

    case 'Select':
    case 'Enum':
    case 'MultiSelect':
      return (
        <Form>
          {filteredItems.selectorsIsLoading ? (
            <Segment className="filter-stub">
              <Loader active>{t('data_loading')}</Loader>
            </Segment>
          ) : (
            filteredItems.selectorFields?.map((field: any) => {
              return (
                <Form.Field key={field.name}>
                  <Checkbox
                    checked={value === field.value}
                    radio={type !== `MultiSelect`}
                    value={field.name}
                    name="checkboxRadioGroup"
                    label={field.name}
                    onChange={() => setValue(field.value)}
                  />
                </Form.Field>
              );
            })
          )}
        </Form>
      );

    case 'Boolean':
      return (
        <Checkbox toggle checked={!!value} onChange={() => setValue(!value)} />
      );
    default:
      return (
        <Input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder={column.Header}
        />
      );
  }
};

export default PopupInputs;
