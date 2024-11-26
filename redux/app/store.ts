import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "../reducers/auth-reducer";
import { rtkQueryErrorLogger } from "../handlers/error-handler";
import api from "../services/api";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: persistReducer({ storage: AsyncStorage, key: "auth" }, authReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat([api.middleware])
      .concat(rtkQueryErrorLogger),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// ASYNC LOCAL STORAGE
export const setStorageData = async (key: string, value: string | object) => {
  let val = "";
  if (typeof value === "string") {
    val = value;
  } else {
    val = JSON.stringify(value);
  }
  try {
    await AsyncStorage.setItem(key, val);
  } catch (e) {}
};

export const getStorageData = async (key: string) => {
  let val = "";

  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      if (typeof value === "string") {
        val = value;
      } else {
        val = JSON.parse(value);
      }
    }
  } catch (e) {
    // error reading value
  }

  return val;
};
