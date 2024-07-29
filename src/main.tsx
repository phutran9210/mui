import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Info from './Info.tsx';
import { TestModal } from './modal';
import SnackbarComponent from './snackbar/SnackbarComponent.tsx';
import Upload from './upload';
import QRCodeGenerator from './qr-code';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProvider } from './context';
import DynamicForm from './dynamic-form';
import SurveyComponent from './survey';
import AppForm from './form';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <React.Fragment>
                    <CssBaseline />
                    <AppProvider>
                        <Routes>
                            <Route path="/" element={<App />} />
                            <Route path="/info" element={<Info />} />
                            <Route path="/modal" element={<TestModal />} />
                            <Route path="/snackbar" element={<SnackbarComponent />} />
                            <Route path="/upload" element={<Upload />} />
                            <Route path="/qr" element={<QRCodeGenerator />} />
                            <Route path="/dynamic" element={<DynamicForm />} />
                            <Route path="/survey" element={<SurveyComponent />} />
                            <Route path="/form" element={<AppForm />} />
                        </Routes>
                    </AppProvider>
                </React.Fragment>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
);
