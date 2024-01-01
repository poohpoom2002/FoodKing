import React, { useState, useEffect } from 'react';
import '../../components/selectLocation/selectLocation.css';
import '../../components/selectLocation/locationPoint.css';
import SelectMode from '../../components/selectLocation/SelectMode';
import kmitlMap from '../../images/kmitlMap.jpg';
import mesBox from '../../images/mesBox.png';
import { useNavigate } from 'react-router-dom';
import { APIURL } from '../../config';
const SelectLocation = () => {

  const positions = [
    {
        name : 'โรง A',
        y : 62.5,
        x : 52.7,
    },
    {
        name : 'โรง J',
        y : 52.2,
        x : 42.3,
    },
    {
      name : 'โรง C',
      y : 62.5,
      x : 12.54,
    },
    {
      name : 'โรงพระเทพ',
      y : 22,
      x : 57.3,
    },
  ]

  const navigate = useNavigate();
  const [userMode, setUserMode] = useState(0);
  const [isShow,setIsShow] =  useState('No selected')
  const [W,setW] = useState(window.innerWidth*0.9);
  const [zoom, setZoom] = useState(1);
  const [orders, setOrders] = useState([])
  const [fetchComplete, setFetchComplete] = useState(false); 
  const [showDetail,setShowDetail] = useState(false);

  const fetchCurrentOrder = async() => {
    setFetchComplete(false);

    try {
    const response = await fetch(`${APIURL}/Order`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const ordersData = await response.json();

    const groupedOrders = ordersData.reduce((grouped, order) => {
      const { canteenId } = order.canteen;
      if (!grouped[canteenId]) {
        grouped[canteenId] = [];
      }
      grouped[canteenId].push(order);
      return grouped;
    });

    setOrders(groupedOrders);
    setFetchComplete(true);
    console.log(groupedOrders);
  } catch (error) {
    console.error(error);
  }
};
  useEffect(() => {
    fetchCurrentOrder();
    if (window.innerWidth <= 900) {
      setW(window.innerHeight*0.9);
    }
  }, []);

  const refetch = () => {
    fetchCurrentOrder();
  }
  const changeMode = () => {
    setUserMode(userMode === 0 ? 1 : 0);
  };

  const clicked = (index) => {
    setIsShow(index);
  }
  const handleZoomIn = () => {
    setZoom(zoom * 1.2);
  };
  const handleZoomOut = () => {
    if (zoom > 0.9){
      setZoom(zoom / 1.2);
    }
  };

  const [notValid, setNotValid] = useState(false);
  const handleSubmit = () => {
    if (isShow === "No selected"){
      setNotValid(true);
      setTimeout(() => {
        setNotValid(false);
      }, 1000);
    }else{
      if (userMode === 0){
        navigate(`/order/${isShow+1}`);
      }else{
        navigate(`/orderInCanteen/${isShow+1}`);
      }
    }
  };
  return (
    <div className="selectLocation">
        <div className="mapConteen">
          <div className='imageContainer'>
            <div className='items-image' id="zoom-image" 
            >
              <img src={kmitlMap} 
                  alt="kmitl-map" 
                  style={{
                    width: `${W*zoom}px`,
                    transition: 'width 0.5s, height 0.5s'}}
                />
              {
                positions.map((loc,index)=>(
                  <div className={`positioned-element`} 
                    key={index}
                    style={{top: `${loc.y}%`,left: `${loc.x}%`,transition: 'opacity 0.5s'}} 
                    onClick={() => clicked(index)}
                    onMouseEnter = {() => setShowDetail(index)}
                    onMouseLeave = {() => setShowDetail(false)}
                  >
                    <div className='mesBox' 
                      id="zoom-image"
                    >
                      <img src={mesBox} alt={`${loc.name}`} style={{width: '100%', height:'100%',opacity: 1}}/>
                      <div className='nameCanteen'>{loc.name}</div>
                      {isShow === index && <i className={`material-icons marked`}>location_on</i>}
                    </div>
                    {
                      (fetchComplete && userMode === 1) && (
                        <div className={`canteenStatus ${showDetail === index ? 'showDetail' : ''}`}>
                          {
                            orders[showDetail + 1]?.length > 0 ? (
                              <div className='status'>
                                <i className={`material-icons happyFace`}>sentiment_very_satisfied</i>
                                <span className='statusDetail'> {orders[showDetail + 1]?.length} Orders</span>
                              </div>
                            ) : (
                              <i className={`material-icons sadFace`}>sentiment_very_dissatisfied</i>
                            )
                          }
                        </div>
                    )}
                  </div>
                ))
              }
            </div>
            <div className='gradient-top'id="zoom-image">
            </div>
            <div className='gradient-left' id="zoom-image"></div>
            <div className='gradient-right' id="zoom-image">
                <i className="material-icons" onClick={handleZoomIn}>zoom_in</i>
                <i className="material-icons" onClick={handleZoomOut}>zoom_out</i>
                <i className="material-icons" style={{background:`${fetchComplete ? "black":"red"}`}} onClick={refetch}>refresh</i>
                
            </div>
            <div className='gradient-bot' id="zoom-image">
              <div className={`submitButton ${notValid ? 'shake' : ''}`} onClick={handleSubmit}>
                {isShow !== 'No selected' ? positions[isShow].name : isShow}
                {isShow !== 'No selected' ? (
                  <i className="material-icons" style={{ "paddingLeft": "10px" }}>check_circle</i>
                ) : (
                  <i className="material-icons" style={{ "paddingLeft": "10px" }}>radio_button_unchecked</i>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='userMode'>
          <SelectMode handleCheckboxChange={changeMode}/>
        </div>
    </div>
  );
};

export default SelectLocation;