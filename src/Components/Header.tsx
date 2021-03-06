import React from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown, Menu } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import i18next from 'i18next';

import { useAppDispatch } from '../Hooks/storeHooks';
import { logoutRequest } from '../Store/reducers/userReducer';
import { TABLE_ROUTE } from '../Routing/constants';

const countryFlags = [
  { key: 'gb eng', value: 'en', flag: 'gb eng', text: 'English' },
  { key: 'ru', value: 'ru', flag: 'ru', text: 'Русский' },
];

interface HandleLangChangeParams {
  e: React.SyntheticEvent<HTMLElement>;
  value: string | undefined;
}

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  function handleLogout() {
    dispatch(logoutRequest());
  }

  const handleLangChange = ({ value }: HandleLangChangeParams) => {
    i18next.changeLanguage(value).catch((e) => new Error(e));
  };

  return (
    <Menu pointing className="header-wrapper">
      <Menu.Menu position="left">
        <Menu.Item
          name={t('Permission.FieldsSettings')}
          content={t('Permission.FieldsSettings')}
          onClick={() => history.push(TABLE_ROUTE)}
        />
      </Menu.Menu>
      <Menu.Menu position="right">
        <Dropdown
          item
          placeholder={Cookies.get('i18next')}
          options={countryFlags}
          onChange={(e, { value }) =>
            handleLangChange({ e, value } as HandleLangChangeParams)
          }
        />
        <Menu.Item
          name={`${t('exit')}`}
          content={`${t('exit')}`}
          onClick={() => handleLogout()}
        />
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
