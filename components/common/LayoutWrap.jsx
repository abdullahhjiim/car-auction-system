'use client';

import { persistor, store } from '/app/(home)/store/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import Footer from './Footer';
import Navbar from './Navbar';
import ScrollToTop from './ScrollToTop';

const LayoutWrap = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navbar />
        {children}
        <Footer />
        <ToastContainer stacked />
        <ScrollToTop />
      </PersistGate>
    </Provider>
  );
};

export default LayoutWrap;
