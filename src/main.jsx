import React from 'react'; import { createRoot } from 'react-dom/client'; import { BrowserRouter } from 'react-router-dom';
import { SiteProvider } from './store/useSite'; import App from './App'; import './index.css';
createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><SiteProvider><App/></SiteProvider></BrowserRouter></React.StrictMode>);