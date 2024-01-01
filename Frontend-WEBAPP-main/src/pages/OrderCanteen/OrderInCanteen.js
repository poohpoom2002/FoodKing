import React, { useEffect, useState } from 'react';
import { APIURL } from '../../config';
import OrderCard from '../../components/OrderInCanteen_Pickup/OrderCard';
import '../../components/OrderInCanteen_Pickup/OrderInCanteen.css';
import { useParams ,Link } from 'react-router-dom';
import serverError from '../500/ServerError';
import loadingGif from '../../images/loading.gif';

function OrderInCanteen() {
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(true);
  const { canId } = useParams();
  const Cid = parseInt(canId);
  const [canteenNames, setCanteenNames] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const canteenResponse = await fetch(`${APIURL}/Canteen`);
        const canteenData = await canteenResponse.json();
        const names = canteenData.map((can) => can.canteenName);

        if (names && names.length > 0 && names[Cid-1] !== undefined) {
          const orderResponse = await fetch(`${APIURL}/Order`);
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

    fetchData();
  }, [Cid]);
  
  return (
    <div className="OrderInCanteen">

      {loading ? ( <img src={loadingGif} 
                      alt='loading GIF' 
                      className='loading' /> ) : ( 
      <div className='bigBoy'>
        <div className='OrderInCanteen-header'>
        <Link to ='/select'> 
          <span className="material-symbols-outlined OrderInCanteen-header-arrow">
            arrow_back_ios
          </span>
        </Link>
        <div className='OrderInCanteen-header-text'> {canteenNames[Cid-1]} </div> 
      
      </div> 
        <div className='OrderALL'>
          {data.map((order, index) => (
            <OrderCard 
              key={index} 
              fname={order.user.name}
              lname={order.user.lastName} 
              phonetel={order.user.phoneNumber} 
              userlocation={order.userLocation} 
              food={order.food} 
              orderid={order._id} 
            />
          ))} 
        </div>
      </div> )} 
    </div>
  );
}

export default OrderInCanteen;