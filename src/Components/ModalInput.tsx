import React from 'react';

import { Checkbox, Dropdown, Input } from 'semantic-ui-react';

interface Props {
  type: string;
  cell: any;
}

const ModalInput: React.FC<Props> = ({ type, cell }) => {
  switch (type) {
    case 'Boolean':
      return <Checkbox defaultChecked={cell.value} toggle />;
    case 'Number':
    case 'Integer':
      return <Input type="number" placeholder={`${cell.value}`} />;
    case 'Select':
    case 'Enum':
      return (
        <Dropdown
          options={[{ value: '1', key: '1', text: '1' }]}
          selection
          placeholder={cell.value?.name ? `${cell.value?.name}` : undefined}
        />
      );
    case 'MultiSelect':
      return (
        <Dropdown
          multiple
          options={[{ value: '1', key: '1', text: '1' }]}
          selection
          placeholder={cell.value?.name ? `${cell.value?.name}` : undefined}
        />
      );
    default:
      return <Input placeholder={`${cell.value}`} />;
  }
};

export default ModalInput;
