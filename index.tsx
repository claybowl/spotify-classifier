
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// #region agent log
fetch('http://127.0.0.1:7242/ingest/24c4b3a0-c0a1-495f-aab8-12afa7d3148c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'index.tsx:6',message:'index.tsx EXECUTED - entry point reached',data:{timestamp:Date.now()},hypothesisId:'A,E',sessionId:'debug-session'})}).catch(()=>{});
// #endregion

const rootElement = document.getElementById('root');

// #region agent log
fetch('http://127.0.0.1:7242/ingest/24c4b3a0-c0a1-495f-aab8-12afa7d3148c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'index.tsx:12',message:'Root element lookup',data:{foundRoot:!!rootElement},hypothesisId:'D',sessionId:'debug-session'})}).catch(()=>{});
// #endregion

if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// #region agent log
fetch('http://127.0.0.1:7242/ingest/24c4b3a0-c0a1-495f-aab8-12afa7d3148c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'index.tsx:22',message:'About to render App',data:{},hypothesisId:'C',sessionId:'debug-session'})}).catch(()=>{});
// #endregion

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
