import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import tableAPI from '../../API/tableAPI';
import { ITable } from '../../Types/TableTypes/TableTypes';

const initialState: ITable = {
  configuration: [],
  activeCategory: { name: '', columns: [] },
  searchingResults: {
    items: [],
  },
  isLoading: false,
  error: '',
  filteredItems: {
    data: [],
    selectorFields: [],
    selectorsIsLoading: false,
    emptyResponse: false,
  },
  modalItem: {},
};

export const configurationRequest = createAsyncThunk(
  'configuration',
  async (_, thunkAPI) => {
    try {
      return await tableAPI.fetchConfiguration();
    } catch (e) {
      const error = e as Error;
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const searchRequest = createAsyncThunk(
  'searchRequest',
  async (name: string, thunkAPI) => {
    try {
      return await tableAPI.fetchSearchResult(name);
    } catch (e) {
      const error = e as Error;
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const forSelectRequest = createAsyncThunk(
  'selectRequest',
  async (data: { name: string; id: string }, thunkAPI) => {
    try {
      const { name, id } = data;
      return await tableAPI.fetchSelectorData(name, id);
    } catch (e) {
      const error = e as Error;
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const popupRequest = createAsyncThunk(
  'popupRequest',
  async (data: { name: string; config: { filter: unknown } }, thunkAPI) => {
    try {
      const { name, config } = data;
      return await tableAPI.fetchPopupData(name, config);
    } catch (e) {
      const error = e as Error;
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const modalRequest = createAsyncThunk(
  'modalRequest',
  async (data: { name: string; id: string }, thunkAPI) => {
    try {
      const { name, id } = data;
      return await tableAPI.fetchById(name, id);
    } catch (e) {
      const error = e as Error;
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const tableReducer = createSlice({
  name: 'tableReducer',
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    // main request
    builder.addCase(configurationRequest.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(configurationRequest.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      const { data } = payload as AxiosResponse;
      state.configuration = data.dictionaries;
    });
    builder.addCase(configurationRequest.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload as string;
    });

    // searching request
    builder.addCase(searchRequest.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchRequest.fulfilled, (state, { payload }) => {
      const { data } = payload as AxiosResponse;
      state.isLoading = false;
      state.searchingResults = data;
    });
    builder.addCase(searchRequest.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload as string;
    });

    // modal window data
    builder.addCase(modalRequest.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(modalRequest.fulfilled, (state, { payload }) => {
      const { data } = payload as AxiosResponse;
      state.isLoading = false;
      state.modalItem = data;
    });
    builder.addCase(modalRequest.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload as string;
    });

    // popup selector data
    builder.addCase(forSelectRequest.pending, (state) => {
      state.filteredItems.selectorsIsLoading = true;
    });
    builder.addCase(forSelectRequest.fulfilled, (state, { payload }) => {
      const { data } = payload as AxiosResponse;
      state.filteredItems.selectorsIsLoading = false;
      state.filteredItems.selectorFields = data;
    });
    builder.addCase(forSelectRequest.rejected, (state, { payload }) => {
      state.filteredItems.selectorsIsLoading = false;
      state.error = payload as string;
    });

    // popup data
    builder.addCase(popupRequest.pending, (state) => {
      state.filteredItems.selectorsIsLoading = true;
    });
    builder.addCase(popupRequest.fulfilled, (state, { payload }) => {
      const { data } = payload as AxiosResponse;
      state.filteredItems.selectorsIsLoading = false;
      state.filteredItems.data = data;
    });
    builder.addCase(popupRequest.rejected, (state, { payload }) => {
      state.filteredItems.selectorsIsLoading = false;
      state.error = payload as string;
    });
  },
});

export const { setActiveCategory } = tableReducer.actions;
export default tableReducer.reducer;
