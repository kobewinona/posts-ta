import {configureStore} from '@reduxjs/toolkit';

import dataReducer from '../store/dataSlice';


const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;