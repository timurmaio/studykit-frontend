import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import './index.css' // Styles
import routes from './routes' // Routes

ReactDOM.render(routes, document.getElementById('root'))
registerServiceWorker()
