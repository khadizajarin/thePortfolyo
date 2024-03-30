
import Slider from './Gsap/Slider';
import RightContent from './RightContent';


const Home = () => {
    return (
       <div>
         <div className='grid lg:grid-cols-2 grid-cols-1 justify-center items-center '>
            <RightContent></RightContent>
            <Slider></Slider> 
        </div>
        <hr className='divider'/>
       </div>
    );
};

export default Home;