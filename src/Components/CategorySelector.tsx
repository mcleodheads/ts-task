import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../Hooks/storeHooks';
import { IConfiguration } from '../Types/TableTypes/TableTypes';
import { searchRequest } from '../Store/reducers/tableReducer';

const CategorySelector: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const { configuration } = useAppSelector((state) => state.tableReducer);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <Box sx={{ minWidth: 200 }} style={{ margin: 20 }}>
      <FormControl sx={{ width: 200 }}>
        <InputLabel id="demo-simple-select-label">
          {t('Permission.FieldsSettings')}
        </InputLabel>
        <Select
          inputProps={{ 'aria-label': 'Without label' }}
          displayEmpty
          value={value}
          onChange={(e) => setValue(e.target.value)}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Category"
        >
          {configuration.map((category: IConfiguration) => (
            <MenuItem
              key={category.name}
              onClick={() => dispatch(searchRequest(category.name))}
              value={category.name}
            >
              {`${t(category.name)}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CategorySelector;
