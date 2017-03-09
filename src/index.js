import ReactDOM from 'react-dom';

// Styles
import './css/bootstrap-reboot.css';
import './css/bootstrap-grid.css';
import './css/base.css';
import './css/shared.css';

// Routes
import routes from './routes';

ReactDOM.render(
  routes,
  document.getElementById('root')
);
