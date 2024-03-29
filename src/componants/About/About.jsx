




import { forwardRef, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import AOS from 'aos';
import 'aos/dist/aos.css'; 


// eslint-disable-next-line react/display-name
const About = forwardRef((props, ref) => {
    const [info, setInfo] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        AOS.init({
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 100,
        });
    }, []);

    useEffect(() => {
        axiosPublic.get('')
            .then((res) => {
                setInfo(res.data);
                // console.log(info.user.about);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [axiosPublic]);

    return (
        <div ref={ref} >  
            <h1 className="text-center font-bold text-7xl text-[#31363F] mt-4">About Me...</h1>
            <div className="hero h-screen justify-center items-center">
                <div className="hero-content flex-col lg:flex-row-reverse ">
                    <img data-aos="fade-right"  src={info.user?.about?.avatar?.url} className="max-w-xs rounded-lg shadow-stone-600" alt="Avatar" />
                    <div data-aos="fade-left" >
                        <p className="py-6 font-bold ">{info?.user?.about?.description}</p>
                        <ul>
                            <li >Name : {info.user?.about?.name}</li>
                            <li >Email : {info.user?.about?.contactEmail}</li>
                            <li >Phone : {info.user?.about?.phoneNumber}</li>
                            <li >Quote : {info.user?.about?.quote}</li>
                        </ul>
                        <button className="btn">Download CV</button>
                    </div>
                </div>
            </div> 
                
            
        </div>
    );
});

export default About;



