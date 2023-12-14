import {
  createSelector,
  createEntityAdapter,
  EntityState,
} from '@reduxjs/toolkit';
import { apiSlice } from '../../api/apiSlice';
// import { Project } from '@/types/projectType';

interface Project {
  id: string;
  type: string;
  title: string;
  description: string;
  images: [string];
  link: string;
  source: string;
  isActive: boolean;
}

const projectsAdapter = createEntityAdapter<Project>({});

const initialState = projectsAdapter.getInitialState();

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => '/projects',
      transformResponse: (res: Project[]) => {
        return res;
      },
      providesTags: (result) => [
        { type: 'Project', id: 'LIST' },
        ...(result?.flatMap((project) => ({
          type: 'Project' as const,
          id: project.id,
        })) ?? []),
      ],
    }),
  }),
});

export const { useGetProjectsQuery } = projectApiSlice;

export const selectProjectResult =
  projectApiSlice.endpoints.getProjects.select();

const selectProjectsData = createSelector(
  selectProjectResult,
  (projectsResult) => projectsResult.data
);

export const { selectAll: selectAllUsers } = projectsAdapter.getSelectors(
  (state: Project[]) => selectProjectsData(state) ?? initialState
);

// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// type AuthState = {
//   isAuth: Boolean;
//   username: string;
//   uid: string;
//   isModerator: Boolean;
// };

// type InitialState = {
//   value: AuthState;
// };

// const initialState: InitialState = {

// };

// export const fetchPerson = createAsyncThunk(
//   'perosn/fetch',
//   async (thunkAPI) => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/users', {
//       method: 'GET',
//     });

//     const data = response.json();
//     return data;
//   }
// );

// export const savePerson = createAsyncThunk(
//   'perosn/save',
//   async (name: string, thunkAPI) => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/users', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'Application/json',
//       },
//       body: JSON.stringify({
//         name,
//       }),
//     });

//     const data = response.json();
//     return data;
//   }
// );

// export const auth = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logOut: () => {
//       return initialState;
//     },
//     logIn: (_, action: PayloadAction<string>) => {
//       return {
//         value: {
//           isAuth: true,
//           username: action.payload,
//           uid: 'test',
//           isModerator: false,
//         },
//       };
//     },
//     toggleModerator: (state) => {
//       state.value.isModerator = !state.value.isModerator;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchPerson.fulfilled, (state, action) => {
//       state.value.username = 'hamid';
//     });
//   },
// });

// export const { logIn, logOut, toggleModerator } = auth.actions;
// export default auth.reducer;
