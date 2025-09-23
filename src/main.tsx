
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/authenticated/HomePage';
import RequireAuth from './RequireAuth';
import './index.css';
import PredictionPage from './pages/authenticated/PreditionPage';
import LandingPage from './pages/unauthenticated/LandingPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        } />
        <Route path="/predition" element={
          <RequireAuth> 
            <PredictionPage  />
          </RequireAuth>
        } />
      </Routes>
    </BrowserRouter>
  </Provider>
  </StrictMode>,
);
