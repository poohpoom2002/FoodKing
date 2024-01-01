import React, { Component, useEffect, useState } from 'react';

import './OrderInCanteen.css';
import Menuloop from './Menu';
import Popupselect from './PopupSelect';




class OrderCard extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
          isListShown: true,
            showMenuDetail: false,
            isPopupOpen: false,   
            
        };
      }

      openPopup = () => {
        this.setState({ isPopupOpen: true });
      }
    
      // ปิด Popup
      closePopup = () => {
        this.setState({ isPopupOpen: false });
      }
    
    

      
  toggleMenuDetail = () => {
    this.setState((prevState) => ({
      isListShown: !prevState.isListShown,
        showMenuDetail: !prevState.showMenuDetail,
        
       
    }));
  };

    render() {
         const { isListShown } = this.state;
         const {fname, lname, phonetel, userlocation ,food ,orderid} = this.props;
        return (
        
            <div className="Order">
             
               
                <div className='Order-card'>

                    <div className='Order-card-order'>
                        
                        <div className='header-order'>
                            
                            <div className='Order-card-order-detail'>
                            <h3>Order </h3>
                            <div className='Order-card-order-detail-detail'>

                            <div className='grid-order-detail'>
                            <span className="material-symbols-outlined">
                                account_circle  
                            </span> 
                            <a>{fname} {lname}</a>
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
                            <a>{userlocation}</a>
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
                                    <Menuloop key={index} foodname={food.name} foodquatiy={food.quantity} />
                                ))}
                               
                            </div>
                        
                        </div>

                        </div>
                    </div>
                    <div className='Order-card-btn'>
                      
                        <div className='btn-order-grid' style={{ paddingLeft: '10px'  , paddingTop:'10px'}}>
                            <div className='btn-order-status'>
                                <a>สถานะ:</a> <br />
                                <button className='btn-order-status-accept green'  >หิ้วได้น้า</button>
                                
                            </div>
                            <div className='btn-order-agree'>
                            <button className='btn-order-accept orange 'onClick={this.openPopup}  ><a>รับงาน</a></button>
                            {this.state.isPopupOpen && (
          <div>
            <div className='pop-up-overlay'></div>
            <Popupselect onClose={this.closePopup} fname={fname} lname={lname} phonetel={phonetel} userlocation={userlocation} food={food} orderid={orderid}   />
          </div>
        )}
                            </div>
                                
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default OrderCard;