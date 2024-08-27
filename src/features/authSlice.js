import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
//
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
//
import { signin, signup } from '../services/Authservice'

export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await signup(user); // envoi auth/register/pending
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

// slice login
export const login = createAsyncThunk(
    'auth/login',
    async(user, thunkAPI) => {
        const {rejectWithValue} = thunkAPI;
        try {
            const res = await signin(user);
            localStorage.setItem('user', res.data.user);
            return res.data;
        } catch (error) {
            // Extract the message from the error response
            return rejectWithValue(res.data.message);
        }
    }
)

export const logout = createAsyncThunk("auth/logout", () => {
    localStorage.removeItem('token');
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    status: "",
    isLoggedIn: false
  },
  reducers: {
    //reducer comes here
    reset: state => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = '';
      state.isLoggedIn = false;
    }
  },
  extraReducers: builder => {
    // insertion user
    builder
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;  //return de backend
        state.isLoading = false;
        state.status = null;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.status = action.payload;
        state.user = null;
      }).addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.status = null; 
      }).addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.status = null;
        state.user = action.payload.user;
        console.log(action.payload);
        state.isLoggedIn = true;
        MySwal.fire({
            icon: 'success',
            title: 'Connection est réussi'
        })
        localStorage.setItem('token', action.payload.token);
      }).addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.status = null;
        state.errorMessage = action.payload;
        console.log(state.errorMessage);
        state.user = null;
        state.isLoggedIn = false;
        MySwal.fire({
            icon: 'error',
            title: 'Erreur de connexion'
        })
      }).addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  }
})

export default authSlice.reducer;