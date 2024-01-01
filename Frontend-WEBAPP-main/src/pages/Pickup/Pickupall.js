import React, {  useEffect, useState } from 'react';

import { APIURL } from '../../config';

import loadingGif from '../../images/loading.gif';

import { useParams ,Link ,useNavigate } from 'react-router-dom'; 

import OrderPickup from '../../components/OrderInCanteen_Pickup/Order_Pickup';

import '../../components/OrderInCanteen_Pickup/OrderInCanteen.css'

import serverError from '../500/ServerError';


function Pickupall() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading,setLoading] = useState(true);
    const { canId } = useParams();
    const Cid = parseInt(canId);
    const [canteenNames, setCanteenNames] = useState([]);
    // const canid = 1;
    useEffect(() => {
      
    

     

      async function fetchData() {
        try {
          const canteenResponse = await fetch(`${APIURL}/Canteen`);
          const canteenData = await canteenResponse.json();
          const names = canteenData.map((can) => can.canteenName);
  
          if (names && names.length > 0 && names[Cid-1] !== undefined) {
            const orderResponse = await fetch(`${APIURL}/Order/grabbed`);
            const orderData = await orderResponse.json();
  
            const filteredData = orderData.filter((order) => order.canteen.canteenId === Cid);
            setData(filteredData);
            setCanteenNames(names);
            setLoading(false);
          } else {
            window.location.href = '/404';
          }
        } catch (error) {
          return (
            serverError()
          )
        }
      }
  
      fetchData(); }, []);
    
    
    return (
      <div className="OrderInCanteen">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        {loading ? ( <img src={loadingGif} 
                      alt='loading GIF' 
                      className='loading' />) : ( <div className='bigBoy'>
        <div className='OrderInCanteen-header'>
        <Link to ='/Pickuppage'> 
          <span className="material-symbols-outlined OrderInCanteen-header-arrow">
            arrow_back_ios
          </span>
        </Link>
        <div className='OrderInCanteen-header-text'>การรับหิ้วของ {canteenNames[Cid-1]}</div> 
        <div className=''></div>
      </div> 
            <div className='OrderALL'>
            {data.map((received, index) => (
        
              <OrderPickup
              key={index} 
              fname={received.user.name} 
              lname={received.user.lastName} 
              phonetel={received.user.phoneNumber} 
              userlocation={received.userLocation} 
              food={received.food} 
              ridername={received.raider.name} 
              ridertel={received.raider.phoneNumber}
            />
           ))}
          </div>
      </div>
     )} 
    
    </div>
  );
}

 



  export default Pickupall;
