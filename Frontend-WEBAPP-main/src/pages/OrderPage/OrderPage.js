import './OrderPage.css';
import '../../components/OrderPage/InputField';
import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { APIURL } from '../../config';
import SelectDest from '../../components/selectDest/SelectDest';
import mapButton from '../../images/map.png';
import orderButton from '../../images/order-now.png';
import loadingGif from '../../images/loading.gif';

function OrderPage() {
    const navigate = useNavigate();
    const { canId } = useParams();
    const Cid = parseInt(canId);
    const [count, setCount] = useState(1);
    const [menuName, setMenuName] = useState(''); // State to store the menu name
    const [orders, setOrders] = useState([]);
    const [popLocation, setPopLocation] = useState(false);
    const [slideScreen, setSlideScreen] = useState(false);
    const fontSize =20*window.innerHeight/900;
    const [formValue, setFormValue] = useState({
        fname: '',
        lname: '',
        tel: '',
        address: '',
    })

    const {fname,lname,tel,address} = formValue

    function handleSetForm(label, event) {
        setFormValue({
            ...formValue,
            [label]: event.target.value
        })
        console.log(formValue);
    }

    function handleSelectedDestination(selectedDestination) {
        setFormValue({
          ...formValue,
          address: selectedDestination
        });
      }


    function increment() {
        setCount(count + 1);
    }

    function decrement() {
        if (count > 1) {
            setCount(count - 1);
        }
    }

    function handleMenuNameChange(event) {
        setMenuName(event.target.value);
    }

    function addOrder() {
        const newOrder = {
            name: menuName,
            quantity: count,
            price: 1000
        };
        // console.log(newOrder);
        if (newOrder.name === '') {
            alert('โปรดกรอกเมนูให้ครบถ้วน');
        }else{
            setOrders([...orders, newOrder]);
        }
        setCount(1);
        setMenuName('');
    }

    function deleteOrder(index) {
        const updatedOrders = [...orders];
        updatedOrders.splice(index, 1);
        setOrders(updatedOrders);
    }

    const [orderComplete, setOrderComplete] = useState(false);
    const canteenNames = ["โรง A","โรง J","โรง C","โรงพระเทพ"]
    async function handleSubmit() {
        console.log(orders)
        const isFormValid = Object.values(formValue).every(value => value !== '') && orders.length > 0;
        console.log(isFormValid)
        if (isFormValid) {
            console.log("hello chatree")
            console.log(JSON.stringify(formValue,null,2))
            console.log(orders)
            console.log(`${APIURL}/Order/post`);
            setOrderComplete(true)
            await fetch(`${APIURL}/Order/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        name: fname,
                        lastName: lname,
                        phoneNumber: tel
                    },
                    userLocation: address,
                    canteen: {
                        canteenId: Cid,
                        canteenName: canteenNames[Cid-1]
                    },
                    food: orders
                }),
            })
            .then(response => response)
            .then((data) => {
                console.log('ส่งข้อมูลสำเร็จ', data)
                setOrderComplete(false)
                navigate(`/select`)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } else{
            alert('โปรดกรอกข้อมูลให้ครบถ้วน');
        }
    }
    const togglePopUp = () => {
        setPopLocation(!popLocation);
    }
    const toggleSlide = () => {
        setSlideScreen(!slideScreen);
    }

    const [isHoveredOrder, setIsHoveredOrder] = useState(false);
    const [isHoveredMap, setIsHoveredMap] = useState(false);
    const checkHover = (state) => {
        if (window.innerWidth > 900){
            setIsHoveredMap(state);
        }
    }

    const getBack = () => {navigate(`/select`)}

    return (
        ( !orderComplete ? 
        (<div className="orderpage" style={{transform: `${slideScreen ? 'translateX(-50%)' : 'translateX(0%)'}`, transition: 'transform 0.5s'}}>
            <div className='box'>
                <div className='inputbox'>
                    <h1>กรอกข้อมูลส่วนตัว</h1>
                    <div className='personinputbox'>
                        <div className='input-field'>
                            <label>ชื่อ</label>
                            <input onChange={(e)=>handleSetForm("fname",e)} value={fname} type="text" placeholder="นายซานพล" />
                        </div>
                        <div className='input-field'>
                            <label>นามสกุล</label>
                            <input onChange={(e)=>handleSetForm("lname",e)} value={lname} type="text" placeholder="คนสงขลา" />
                        </div>
                        <div className='input-field'>
                            <label>เบอร์โทร</label>
                            <input onChange={(e)=>handleSetForm("tel",e)} value={tel} type="text" placeholder="09XXXXXXXX" />
                        </div>
                        <div className={`destination-button ${isHoveredMap ? 'hoveredMap' : ''} ${isHoveredOrder ? 'hoveredOrder' : ''}`} 
                            style={{fontSize: `${fontSize}px`}}
                            onMouseEnter={() => checkHover(true)}
                            onMouseLeave={() => checkHover(false)}
                        >
                            { window.innerWidth <= 900 && (
                                <img src={orderButton} alt='order button' className='orderButt'
                                    onMouseEnter={() => setIsHoveredOrder(true)}
                                    onMouseLeave={() => setIsHoveredOrder(false)}
                                    onClick={toggleSlide}
                                />
                            )}
                            <div className='slide-text slide-text-order'>Let's Order</div>
                            <div className='slide-text slide-text-map' onClick={togglePopUp}>Where r u?</div>
                            <img src={mapButton} alt='map button' className='mapButt'
                                onMouseEnter={() => setIsHoveredMap(true)}
                                onMouseLeave={() => setIsHoveredMap(false)}
                                onClick={togglePopUp}
                            />
                        </div>
                    </div>
                </div>
                <div className='buttonContainer'>
                    <button className='submit' onClick={handleSubmit}>ถัดไป</button>
                    <button className='submit cancel' onClick={getBack}>ยกเลิก</button>
                </div>
            </div>
            <div className='menu-box'>
                <h2>
                    { window.innerWidth <= 900 && (
                        <i className="material-icons" 
                            style={{cursor:"pointer"}} 
                            onClick={toggleSlide}
                        >
                            arrow_back_ios 
                        </i>
                    )}
                    เมนู
                </h2>
                <div className='menu'>
                    <div className='userinput'>
                        <input
                            type="text"
                            placeholder="ข้าวแกงนกพิราบ + ไข่แมลงปอ"
                            value={menuName}
                            onChange={handleMenuNameChange}
                        />
                    </div>
                    <div className='counter'>
                        <button className='material-icons' onClick={decrement}>remove</button>
                        <p>{count}</p>
                        <button className='material-icons' onClick={increment}>add</button>
                        <button className='material-icons' style={{transform: 'scale(1.2)'}} onClick={addOrder}>shopping_cart</button>
                    </div>
                </div>
                <div className='menu-list-frame'>
                    {/* <div style={{width: '100%',height: '2%',background: 'black'}}></div> */}
                    <div className='menulist'>
                        {orders.map((order, index) => (
                            <div key={index} className='order'>
                                <p>{order.name}</p>
                                <p>x {order.quantity}</p>
                                <div className='material-icons' style={{cursor: 'pointer'}} onClick={() => deleteOrder(index)}>delete</div>
                            </div>
                        ))}
                    </div>
                    {/* <div className='menu-fade-top'></div> */}
                    <div className='menu-fade-bot'></div>
                </div>
            </div>
            {
                popLocation && (
                    <SelectDest isPop={togglePopUp} onDestinationSelected={handleSelectedDestination}/>
                )
            }
        </div>) : <img src={loadingGif} 
                      alt='loading GIF'
                      className='loading' />)
        
    );
}

export default OrderPage;