//@ts-nocheck
import { configureStore } from '@reduxjs/toolkit' 
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
//reducers
import CategoriesReducer from './reducer/CategoriesReducer';
import SetsReducer from './reducer/SetsReducer';
import CartReducer from './reducer/CartReducer';

const cartReducerCfg = {
    key: 'cart', 
    storage, 
    whitelist: ['cartData']
}
const setReducerCfg = {
    key: 'set', 
    storage, 
    whitelist: ['paintingsData']
}

const store = configureStore({
    
    reducer: {
       categoriesReducer: CategoriesReducer, 
       setsReducer: persistReducer(setReducerCfg, SetsReducer), 
       cartReducer: persistReducer(cartReducerCfg, CartReducer)
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}) 
});

const persistor = persistStore(store);
export {store, persistor}


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {themeReducer: ThemeReducer }
export type AppDispatch = typeof store.dispatch;
 