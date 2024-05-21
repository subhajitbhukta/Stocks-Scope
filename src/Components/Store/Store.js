import {configureStore} from '@reduxjs/toolkit';
import dataReducer from '../Features/Datas'
export const store = configureStore({
  reducer: dataReducer
});