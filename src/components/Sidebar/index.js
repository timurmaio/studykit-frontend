import React, {Component} from 'react';

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar_item height-40">Все</div>
        <div className="sidebar_item height-40">Английский</div>
        <div className="sidebar_item height-40">Программирование</div>
        <div className="sidebar_item height-40">Алгебра</div>
        <div className="sidebar_item height-40">Ruby</div>
        <div className="sidebar_item height-40">JavaScript</div>
      </div>
    )
  }
}

export default Sidebar;
