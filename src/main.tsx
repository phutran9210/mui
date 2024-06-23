import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Info from './Info.tsx';
import { TestModal } from './modal';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <React.Fragment>
                <CssBaseline />
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/info" element={<Info />} />
                    <Route path="/modal" element={<TestModal />} />
                </Routes>
            </React.Fragment>
        </BrowserRouter>
    </React.StrictMode>
);
