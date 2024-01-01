import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavIcon.css';
import './NavTemp.css';

const NavBar = ({content}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDateVisible, setIsDateVisible] = useState(true);
  const [isTimeVisible, setIsTimeVisible] = useState(true);

  const linkStyle = {
    textDecoration: 'none', // ลบเส้นใต้ลิงค์
    color: 'blue', // เปลี่ยนสีข้อความลิงค์
  };

  const toggleDateVisibility = () => {
    setIsDateVisible(!isDateVisible);
  };
  

  const toggleTimeVisibility = () => {
    setIsTimeVisible(!isTimeVisible);
  };

  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="navTemplate">
        <div className="header">
          <Link to="/">
            <img src={process.env.PUBLIC_URL + '/assets/webicon/webLogo.png'} alt="WebLogo" className="webLogo" />
          </Link>
           <span style={{display: 'flex',flex: '1 1 auto'}}></span>
           <div className="icon-container">
           
            <Link to ='/Pickuppage'  className='Linkto'>
              <p>
                GRAB
              </p>
              </Link>

              <span className="material-symbols" onClick={toggleDateVisibility}>date_range</span>
              <p id="date-in" className={isDateVisible ? '' : 'out'} style={{overflow:'hidden'}}>
                {currentTime.toLocaleDateString('th-TH')}
              </p>
              <span className="material-symbols" onClick={toggleTimeVisibility}>schedule</span>
              <p id="time-in" className={isTimeVisible ? '' : 'out'} style={{overflow:'hidden'}}>
                {currentTime.toLocaleTimeString('en-US', {
                    hour12: false,
                  })}
              </p>
          </div>
        </div>
        <div style={{width:"100%", height:"1.6%", background:"#FFAE26"}}></div>
        <div className="content">
            {content}
        </div>
        <div className="footer">

        </div>
    </div>
  );
};

export default NavBar;