import React, { Component, useEffect, useState } from 'react';
import Menu_loop from './Menu';
import PopupRider from './PopupRider';
import './OrderInCanteen.css';

class Order_Pickup extends Component {
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
         const {fname, lname, phonetel, userlocation ,food ,orderid ,ridername,ridertel} = this.props;
        return (
            <div className="Order">
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
                                    <Menu_loop key={index} foodname={food.name} foodquatiy={food.quantity} />
                                ))}
                            </div>
                        
                        </div>

                        </div>
                    </div>
                    <div className='Order-card-btn'>
                    <div className='btn-order-grid'>
                            <div className='btn-order-status'>
                                <a>สถานะ:</a> <br />
                                <div className='btn-order-status-accept blue'>หิ้วแล้ว</div>
                            </div>
                            {/* <div className='btn-order-agree pick'>
                                <a>รายละเอียดผู้รับหิ้ว</a>
                                <p>ชื่อ: {ridername}
                                <br />
                                เบอร์โทร: {ridertel}
                                </p> <br />
                                
                            </div> */}
                            <div className='btn-order-agree'>
                            <button className='btn-order-accept pink 'onClick={this.openPopup}  ><a><span className="material-symbols-outlined" style={{fontSize:'40px',fontWeight:'bold'}}>
sports_motorsports
</span></a></button>
                            {this.state.isPopupOpen && (
          <div>
            
            <PopupRider onClose={this.closePopup} riderName={ridername} riderTel={ridertel} />
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

export default Order_Pickup;