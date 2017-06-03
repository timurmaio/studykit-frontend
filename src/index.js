import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import routes from './routes'

ReactDOM.render(routes, document.getElementById('root'))
registerServiceWorker()
