import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../Hooks/storeHooks';
import { loginRequest } from '../Store/reducers/userReducer';
import { IUserAuthRequest } from '../Types/userTypes/Users';
import { HOME_ROUTE } from '../Routing/constants';

const LoginWrapper: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('en');
  const dispatch = useAppDispatch();

  const history = useHistory();
  const { isAuth } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    if (isAuth) {
      history.push(HOME_ROUTE);
    }
  }, [history, isAuth]);

  function handleLogin() {
    const userAuthData: IUserAuthRequest = { login, password, language };
    if (login.length !== 0 && password.length !== 0) {
      dispatch(loginRequest(userAuthData));
    }
  }

  return (
    <Paper sx={{ p: 5, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item />
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Box sx={{ width: '100%' }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={12}>
                    <Box sx={{ p: 2 }}>
                      <Typography
                        sx={{ display: 'flex', justifyContent: 'center' }}
                        variant="h4"
                        component="h4"
                      >
                        AUTHORIZATION
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <InputLabel htmlFor="standard-adornment-amount">
                        Login
                      </InputLabel>
                      <Input
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        id="standard-adornment-amount"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <InputLabel htmlFor="standard-adornment-amount">
                        Password
                      </InputLabel>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="standard-adornment-amount"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={5}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Country
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={language}
                        label="Country"
                        defaultValue="ru"
                        onChange={(e) => setLanguage(e.target.value)}
                      >
                        <MenuItem value="ru">Русский</MenuItem>
                        <MenuItem value="en">English</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item>
              <ButtonGroup
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  onClick={() => handleLogin()}
                  variant="contained"
                  color="success"
                >
                  Login
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LoginWrapper;
