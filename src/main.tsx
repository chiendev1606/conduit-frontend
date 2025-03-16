import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import AllProviders from './providers/all-providers';

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <AllProviders>
      <App />
    </AllProviders>,
  );
}
