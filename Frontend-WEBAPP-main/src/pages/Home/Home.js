import './Home.css';
import image1 from '../../images/image1.png';
import image2 from '../../images/image2.png';
import image3 from '../../images/image3.png';
import image4 from '../../images/image4.png';
import image5 from '../../images/image5.png';
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="homepage">
            <div className="images">
                <img src={image1} alt="Image1" className="top-left-image" />
                <img src={image2} alt="Image2" className="mid-right-image" />
                <img src={image3} alt="Image3" className="top-right-image" />
                <img src={image4} alt="Image4" className="mid-left-image" />
                <img src={image5} alt="Image5" className="bottom-right-image" />
            </div>
            <h1>BUSY?</h1>
            <h2>LET'S FIND <br /> SOMEONE WHO <br /> CAN DELIVER <br /> FOOD FOR YOU</h2>
            <Link to='/select'>
                <button>LET'S GO</button>
            </Link>
        </div>
    );
}

export default Home;