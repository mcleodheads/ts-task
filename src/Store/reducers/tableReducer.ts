import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import tableAPI from '../../API/tableAPI';

const initialState: any = {
  configuration: [],
  activeCategory: [],
  searchingResults: {
    items: [],
  },
  isLoading: false,
  error: '',
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

const tableReducer = createSlice({
  name: 'tableReducer',
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
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
  },
});

export const { setActiveCategory } = tableReducer.actions;
export default tableReducer.reducer;
