import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  isAuth: Boolean;
  username: string;
  uid: string;
  isModerator: Boolean;
};

type InitialState = {
  value: AuthState;
};

const initialState: InitialState = {
  value: {
    isAuth: false,
    username: '',
    uid: '',
    isModerator: false,
  } as AuthState,
};

export const fetchPerson = createAsyncThunk(
  'perosn/fetch',
  async (thunkAPI) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'GET',
    });

    const data = response.json();
    return data;
  }
);

export const savePerson = createAsyncThunk(
  'perosn/save',
  async (name: string, thunkAPI) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        name,
      }),
    });

    const data = response.json();
    return data;
  }
);

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (_, action: PayloadAction<string>) => {
      return {
        value: {
          isAuth: true,
          username: action.payload,
          uid: 'test',
          isModerator: false,
        },
      };
    },
    toggleModerator: (state) => {
      state.value.isModerator = !state.value.isModerator;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPerson.fulfilled, (state, action) => {
      state.value.username = 'hamid';
    });
  },
});

export const { logIn, logOut, toggleModerator } = auth.actions;
export default auth.reducer;
