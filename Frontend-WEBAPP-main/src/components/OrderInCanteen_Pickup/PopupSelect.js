import React, { Component, useState } from 'react';

import './OrderInCanteen.css';
import Menu_loop from './Menu';
import { APIURL } from '../../config';

class Popupselect extends Component {

    handleClose = () => {
      this.props.onClose(); // ส่งคำสั่งไปยัง YourComponent เพื่อปิด Popup
    }
  
    constructor(props) {
      console.log(props);
      super(props);
      this.state = {
        
        isListShown: true,
          showMenuDetail: false,
          
  
          name: '',
          phoneNumber: '',
          lastName: '',
          formErrors: {
            name: '',
            phoneNumber: '',
            lastName: '',
          },
        
          
      };
    }
    
    handleInputChange = (event) => {
      const { name, value } = event.target;
      
      this.setState({ [name]: value });
    }
    
    handleClick = () => {
      // ตรวจสอบค่าว่างในชื่อผู้รับหิ้วและเบอร์โทรติดต่อ
      let formErrors = { ...this.state.formErrors };
      if (this.state.name.trim() === '') {
        formErrors.name = 'กรุณากรอกชื่อผู้รับหิ้ว';
      } else {
        formErrors.name = '';
      }
  
      if (this.state.phoneNumber.trim() === '') {
        formErrors.phoneNumber = 'กรุณากรอกเบอร์โทรติดต่อ';
      } else {
        formErrors.phoneNumber = '';
      }
  
      this.setState({ formErrors });
  
      // ตรวจสอบว่าไม่มีข้อผิดพลาดในฟอร์มก่อนส่งข้อมูล
      if (formErrors.name === '' && formErrors.phoneNumber === '') {
        // ส่งข้อมูล HTTP PUT request ไปยังเซิร์ฟเวอร์
        
        const url = `${APIURL}/Order/grab/${this.props.orderid}`;
        
        const data = {
            name: this.state.name,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
        };
        
        async function grabfood(json, callback) {
          await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
          })
          .then(response => response)
          .then((data) => {
            console.log(data)
              console.log('ส่งข้อมูลสำเร็จ', data)
              callback();
              alert('รับหิ้วแล้ว');
              window.location.reload();
          })
          .catch(error => console.error('Error:', error));
        };

        grabfood(data, this.handleClose);
      }
      
    }
  
  
    
  toggleMenuDetail = () => {
  this.setState((prevState) => ({
    isListShown: !prevState.isListShown,
      showMenuDetail: !prevState.showMenuDetail,
     
  }));
  };
  
    render() {
      

      const { isListShown } = this.state;
      const {fname, lname, phonetel, userlocation ,food } = this.props;
      
      const nameErrorClass = this.state.formErrors.name ? 'error-border' : '';
      const phoneNumberErrorClass = this.state.formErrors.phoneNumber ? 'error-border' : '';
      return (
        <div className="Order-pop">
        <div className='Order-card'>
  
            <div className='Order-card-order'>
                
                <div className='header-order'>
                    
                    <div className='Order-card-order-detail'>
                    <h3>Order</h3>
                    <div className='Order-card-order-detail-detail'>
  
                    <div className='grid-order-detail'>
                    <span className="material-symbols-outlined">
                        account_circle  
                    </span> 
                    <a> {fname} {lname}</a>
                    </div>
  
                    <div className='grid-order-detail'>
                    <span className="material-symbols-outlined">
                        call 
                    </span> 
                    <a>{phonetel}</a>
                    </div>
  
                    <div className='grid-order-detail'>
                    <span className="material-symbols-outlined">
                        near_me  
                    </span> 
                    <a className='location-over'>{userlocation}</a>
                    </div>
                       
                    </div>
                    
                   
                    </div>
                    
  
                    <div className='btn-on-off-menu'>
                    
                        <button className='btn-on-menu' onClick={this.toggleMenuDetail} >
                           
                        <span
    className={`material-symbols-outlined ${isListShown ? '' : 'rotate180'}`}
  >
    {isListShown ? 'List' : 'menu_open'}
  </span>
                        </button>
                    </div>
                    
                    </div>
                
            </div>
  
            
              
            <div className={`Order-card-menudetail ${this.state.showMenuDetail ? 'visible' : 'hidden'}`}>
                <a>รายการอาหาร</a>
  
                <div className='Order-card-menudetail-detail'>
               
                
                <h4>เมนู</h4>
                <div className='Order-card-menudetail-detail-menu'>
                    <div className='Order-card-menudetail-detail-menu-overflow'>
                    {food.map((food, index) => (
                                      <Menu_loop key={index} foodname={food.name} foodquatiy={food.quantity} />
                                  ))}
                        
                       
                    </div>
                
                </div>
  
                </div>
            </div>
            <div className='Order-card-btn-popup'>
         
                <div className='form-hiip'>
              
                   <div className='form-hiip-detail'>
                    <a>ชื่อผู้รับหิ้ว</a>
                    <br />
                    <input
                           className={`form-input-detail ${nameErrorClass}`}
                          type="text"
                          placeholder="ชื่อผู้รับหิ้ว"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleInputChange}
                    />  
                    <br />
                    <div className='input-gap'>
                    <a>เบอร์โทรติดต่อ</a>
                    <br />
                    
                      <input
                        className={`form-input-detail ${phoneNumberErrorClass}`}
                        type="text"
                        placeholder="เบอร์โทรติดต่อ"
                        name="phoneNumber"
                        value={this.state.phoneNumber}
                        onChange={this.handleInputChange}
                      /> 
                      
                  </div>
  
                   </div>
  
                   <div className='btn-order-grid popup'>
                   
                             
                              <div className='btn-order-agree start'>
                              <button className='btn-order-accept orange' onClick={this.handleClick} ><a>รับงาน</a></button>
                              {this.state.isPopupOpen && (
          <Popupselect onClose={() => this.setState({ isPopupOpen: false })} />
        )}
                              </div>
  
                              <div className='btn-order-agree'>
                              <button className='btn-order-status-cancel' onClick={this.handleClose} ><a>ยกเลิก</a></button>
                              </div>
  
  
  
  
  
  
                              
  
                                  
                          </div>
                        
                </div>
  
            
            </div>
  
        </div>
   
    </div>
      );
  
      }
  }

  export default Popupselect;
  
  