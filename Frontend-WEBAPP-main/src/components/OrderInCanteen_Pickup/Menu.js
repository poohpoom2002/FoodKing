import React, { Component, useEffect, useState } from 'react';

import './OrderInCanteen.css';
class Menu_loop extends Component {
    render() {
        const {foodname, foodquatiy} = this.props;
          return (
              <div className='Order-card-menudetail-detail-menu-section'>
                  <div className='Order-card-menudetail-detail-menu-section-count'><a>{foodquatiy}</a></div>
                  <div className='Order-card-menudetail-detail-menu-section-name'>{foodname}</div>
                  {/* <p>ไม่ใส่แตงกวา เพิ่มซีฮ๊วหวาน</p> */}
                  </div>
                
             
          );
  
          }
  }

  export default Menu_loop;