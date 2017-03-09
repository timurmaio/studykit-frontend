import React, { Component } from 'react';
import { Link } from 'react-router'
import './style.css';

class Header extends Component {
  render() {
    return (
      <header className="shadow">
      	<div className="container">
	      	<div className="flex flex--vcenter height-60">
		        <h1 className="logo">Studykit</h1>
		        <Link to="/" activeClassName="link--active" className="link push-right-10 push-left-50">Курсы</Link>
		        <div className="profile push-left">
		        	<Link to="/profile" activeClassName="profile__link--active" className="profile__link">Панель</Link>
		        </div>
	        </div>
        </div>
      </header>
    );
  }
}

export default Header;
