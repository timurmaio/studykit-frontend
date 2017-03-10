import React, {Component} from 'react';
import Header from '../Header'
// import './style.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div className="container push-top-40">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
