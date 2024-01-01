import React, { useState, useRef, useEffect } from 'react';
import './selectDest.css';
import './destPoint.css';
import '../selectLocation/selectLocation.css'
import kmitlMap from '../../images/kmitlMap.jpg';
import mesBox from '../../images/mesBox.png';
import { APIURL } from '../../config';

const SelectDest = (props) => {
  const imageMap = useRef(null);
  const [selectedDest,setSelectedDest] = useState("กรุณาเลือกปลายทาง")
  const [zoom, setZoom] = useState(1);
  const [W,setW] = useState(1200);
  const [description,setDescription] = useState('');
  const getMapData = async () => {
    try {
      const positionsRes = await fetch(`${APIURL}/Map`);
      const positionsData = await positionsRes.json();
      let pos = [];
      for (let i = 0; i < positionsData.length; i++) {
        pos.push({
          name: positionsData[i].name,
          x: positionsData[i].x,
          y: positionsData[i].y,
        });
      }
      return pos;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [positions, setPositions] = useState([]);

  useEffect(() => {
    getMapData()
      .then((data) => {
        setPositions(data);
      })
      .catch((error) => {
        console.error('Error getting map data:', error);
      });

    if (window.innerWidth <= 640) {
      setW(720);
    }
  }, []);

  const handleZoomIn = () => {
    if (zoom < 1.7){
      setZoom(zoom * 1.2);
      // console.log(imageMap.current.getBoundingClientRect());
    }
  };
  const handleZoomOut = () => {
    if (zoom > 0.8){
      setZoom(zoom / 1.2);
      // console.log(imageMap.current.getBoundingClientRect());
    }
  };
  const clicked = (index) => {
    setSelectedDest(index);
  }

  const [isShowName, setIsShowName] = useState(true);
  const toggleShowName = () => {
    setIsShowName(!isShowName);
  };
  
  const handleChangeDesc = (event) => {
    setDescription(event.target.value)
  }

  const [notValid,setNotValid] = useState(false);

  const handleSubmit = () => {
    if (selectedDest === "กรุณาเลือกปลายทาง"){
      setNotValid(true);
      setTimeout(() => {
        setNotValid(false);
      }, 1000);
    }else{
      props.onDestinationSelected(`${positions[selectedDest].name} ${description}`);
      props.isPop();
    }
  };

  const changeDestination = (value) => {
    if (selectedDest === "กรุณาเลือกปลายทาง"){
      setSelectedDest(0);
    }else{
      setSelectedDest(selectedDest+value);
    }
  }
  return (
    <div className="popUpDestSelect">
      <div className='destinatonBox'>
        <div className='mapDest'>
          <div className='invisibleScrollDiv'>
          <div className='items-image-dest' id="zoom-image" 
            // style = {{transform: `scale(${zoom}) ${ zoom !== 1 ? `translate(${(zoom-1)*W}px, ${(zoom-1)*W}px)`: "translate(0%, 0%)"}`}}
            // style = {{width: `${W*zoom}px`}}
          >
            <img src={kmitlMap} 
              alt="kmitl-map" 
              ref={imageMap}
              style={{width: `${W*zoom}px`,transition: 'width 0.5s, height 0.5s'}}
              // className='smooth-criminal'
              // style = {{transform: `scale(${zoom}) translate(${zoom-1}%, ${zoom-1}%)`,}}
              
            />
            {
              positions.map((loc,index)=>(
                <div className={`positioned-element`} 
                  key={index}
                  style={{top: `${loc.y}%`,left: `${loc.x}%`,transition: 'opacity 0.5s',
                  opacity: `${isShowName ? '1': '0'}`}} 
                  onClick={() => clicked(index)}
                >
                  <div className='mesBox-items' 
                    style={zoom <=1.2 ? { transform: `scale(${zoom})` } : {transform: `scale(1.2)`}} 
                    id="zoom-image"
                  >
                    <img src={mesBox} alt={`${loc.name}`} style={{width: '100%', height:'100%',opacity: 0.9}}/>
                    <div className='nameCanteen-dest'>{loc.name}</div>
                    {selectedDest === index && <i className={`material-icons marked-dest`}>location_on</i>}
                  </div>
                </div>
              ))
            }
            
          </div>
            <div className='gradient-top'></div>
            <div className='gradient-bot'>
              <button onClick={toggleShowName} className={`showName ${isShowName ? 'toggled' : ''}`}>แสดงชื่อ</button>
            </div>
            <div className='gradient-left'>
              <i className="material-icons" 
                style={{"marginTop" : "30px","marginLeft" : "10px","fontSize":"30px",cursor:"pointer"}} 
                onClick={props.isPop}>
                  arrow_back_ios 
              </i>
            </div>
            <div className='gradient-right'>
              <i className="material-icons" onClick={handleZoomIn}>zoom_in</i>
              <i className="material-icons" onClick={handleZoomOut}>zoom_out</i>
            </div>
          </div>
        </div>
        <div className='mapDescription'>
            <div className='selectedDestination'>
              {selectedDest !== 0 && <p className="material-icons" style={{ "paddingRight": "10px",cursor : 'pointer' }} onClick={() => changeDestination(-1)}>arrow_back_ios</p>}
              <p>{selectedDest !== 'กรุณาเลือกปลายทาง' ? positions[selectedDest].name : "selectedDest"}</p>
              <p className="material-icons" style={{ "paddingLeft": "12px" }}>{`${selectedDest === 'กรุณาเลือกปลายทาง' ? 'radio_button_unchecked' : 'check_circle'}`}</p>
              {selectedDest !== positions.length-1 && <p className="material-icons" style={{ "paddingLeft": "10px",cursor : 'pointer' }} onClick={() => changeDestination(1)}>arrow_forward_ios</p>}
            </div>
            <div className='selectedDescription'>
              <div className='description'>
                รายละเอียดเพิ่มเติม
                <form style={{height:'80%',width: '95%'}}>
                <textarea
                  className="textured-input"
                  type="text"
                  id="desc"
                  value={description}
                  onChange={handleChangeDesc}
                  spellCheck="false"
                  placeholder="บอกฉันสิว่าฉันรักเธอมากเกินไป"
                />
                </form>
              </div>
              <div className='submitBox'>
                <div className={`submitDest ${notValid ? 'shake' : ''}`} onClick={handleSubmit}>
                  ยืนยัน
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SelectDest;