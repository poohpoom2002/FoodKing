import React from 'react';
import '../../components/PickupAll/Pickupall.css'
import { Link, useNavigate  } from 'react-router-dom'; 

function Pickupall() {
    const navigate = useNavigate()
    return (
    <div className='fillParent'>
        <div className='text-header-canteen'>
            <span className="material-symbols-outlined" style={{cursor:'pointer',color:'#502215'}} onClick={() => navigate('/select')}>
                arrow_back_ios
            </span>
            ตรวจสอบออเดอร์ที่หิ้วไปแล้ว 
        </div>
        <div className='PickSelect'>
            <div className='PickOrder'>
            <Link to ='/Pickupall/1' className='Linkedit'> 
                <div className='canteen A '>
                    <div className='text-click'>A</div>
                </div>
            </Link>
            <Link to ='/Pickupall/2' className='Linkedit'> 
                <div className='canteen J '>
                    <div className='text-click'>J</div>
                </div>
            </Link>
            
            <Link to ='/Pickupall/3' className='Linkedit'> 
                <div className='canteen C '>
                <div className='text-click'>C</div>
                </div>
            </Link>

            <Link to ='/Pickupall/4' className='Linkedit'> 

                <div className='canteen PT '>
                <div className='text-click'>Phra Thep</div>
                </div>
            </Link> 

            </div>
        </div>

    </div>
  );
}

 



  export default Pickupall;