
import Slider from './Gsap/Slider';
import LeftContent from './LeftContent';
import RightContent from './RightContent';


const Home = () => {
    return (
        <div className='grid lg:grid-cols-3 grid-cols-1 my-4 lg:h-screen'>
            <RightContent></RightContent>
            <Slider></Slider>
            <LeftContent></LeftContent>
        </div>
    );
};

export default Home;