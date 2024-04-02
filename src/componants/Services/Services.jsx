import  { forwardRef, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import {motion} from 'framer-motion'

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
        <div ref={ref}  className=" flex justify-center items-center " >
            <div className="">
                <div className="flex justify-center relative z-10 bg-[#F2F2F2]" >
                    <div className=" p-5 inline-block bg-[#76ABAE] relative top-10" style={{opacity:0.7}}>
                        <h1 className="text-center font-bold text-3xl text-[#F2F2F2] ">WHAT I DO</h1>
                    </div>
                </div>

                <div className="bg-[#DCDEE0] pt-10">
                    <div data-aos="fade-up" className="carousel carousel-center space-x-8 rounded-box mx-44 mt-10 mb-20 relative text-center">
                        {info && info.map((service, index) => (
                        <div key={index} className="carousel-item relative  mt-8 mb-10">
                                <img src={service.image.url} className="rounded-box w-96 " alt={`Service ${index}`} />
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
        </div>
    );
    
    
});

export default Services;
