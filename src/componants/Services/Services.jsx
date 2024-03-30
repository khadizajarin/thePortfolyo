import  { forwardRef, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

// eslint-disable-next-line react/display-name
const Services = forwardRef((props, ref) => {

    const [info, setInfo] = useState([]);
    const axiosPublic = useAxiosPublic();
    

    useEffect(() => {
        axiosPublic.get('')
        .then((res) => {
            // console.log(res.data.user.services)
            setInfo(res.data.user.services)
        })
        .catch((error) => {
            console.error(error);
        });
    }, [axiosPublic]);

    useEffect(() => {
        AOS.init({
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 100,
        });
    }, []);

    return (
        <div ref={ref}  className="lg:h-screen flex justify-center items-center">
            <div className="text-center">
                <h1 className="font-bold text-4xl lg:text-5xl text-[#76ABAE] mb-8">What I Do...</h1>
                <div data-aos="fade-up" className="carousel carousel-center max-w-7xl p-4 space-x-4 rounded-box">
                    {info && info.map((service, index) => (
                       <div key={index} className="carousel-item relative">
                       <img src={service.image.url} className="rounded-box w-80" alt={`Service ${index}`} />
                       <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-75 transition-opacity duration-300 opacity-0 hover:opacity-100 hover:rounded-box">
                           <p className="text-white text-xl font-bold mb-2">{service.name}</p>
                           <p className="text-white text-lg">{service.desc}</p>
                           <p className="text-white text-lg">Charge : {service.charge}</p>
                       </div>
                   </div> 
                    ))}
                </div>
            </div>
        </div>
    );
    
    
});

export default Services;
