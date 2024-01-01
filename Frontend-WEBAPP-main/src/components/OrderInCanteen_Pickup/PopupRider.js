import React, { Component, useEffect, useState } from 'react';

import './OrderInCanteen.css';
import Menu_loop from './Menu';
import { APIURL } from '../../config';


class PopupRider extends Component {

    handleClose = () => {
      this.props.onClose(); // ส่งคำสั่งไปยัง YourComponent เพื่อปิด Popup
    }
  
    constructor(props) {
      console.log(props);
      super(props);
      this.state = {
        
        isListShown: true,
          showMenuDetail: false,
  
         
        
          
      };
    }
    

  
    
  toggleMenuDetail = () => {
  this.setState((prevState) => ({
    isListShown: !prevState.isListShown,
      showMenuDetail: !prevState.showMenuDetail,
     
  }));
  };
  
    render() {
      const { isListShown } = this.state;
      const {riderName,riderTel } = this.props;
     
      return (
        <div className='Rider'>
        <div className='pop-up-overlay' onClick={this.handleClose}></div>
    <div className="Order-pop" onClick={this.handleClose} >
        <div className='Order-card'>
        <div className='Order-card-order-rider' onClick={this.handleClose}>
                
                <div className='header-order'>
                    
                    <div className='Order-card-order-detail'>
                    <h3>ผู้รับหิ้ว</h3>
                    <div className='Order-card-order-detail-detail'>
  
                    <div className='grid-order-detail'>
                    <span class="material-symbols-outlined" style={{fontSize:'40px'}}>
                        account_circle  
                    </span> 
                    <a> {riderName}</a>
                    </div>
                    <br />  
                    <div className='grid-order-detail'>
                    <span class="material-symbols-outlined" style={{fontSize:'40px'}}>
                        call 
                    </span> 
                    <a>{riderTel}</a>
                    </div>
  
                   
                       
                    </div>
                    
                   
                    </div>
                    
  
                    
                    
                    </div>
                
            </div>

        </div>
    </div>
    </div>
      );
  
      }
  }

  export default PopupRider;
  
  