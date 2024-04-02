
import Slider from './Gsap/Slider';
import RightContent from './RightContent';


const Home = () => {
    return (
       <div>
         <div className='grid lg:grid-cols-2 grid-cols-1 justify-center items-center bg-[#34464C]'>
            <RightContent></RightContent>
            <Slider></Slider> 
        </div>
       </div>
    );
};

export default Home;