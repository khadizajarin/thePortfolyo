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

    const draw = {
        hidden: { scaleY: [-1, 0] }, 
        visible: {
            scaleX: [0, 1], 
            transition: {
                scaleX: { type: "spring", duration: 4, repeat: Infinity, }, 
            }
        },   
    };

    return (
        <div ref={ref}  className=" flex justify-center items-center bg-[#EEEEEE]" >
            <div className="text-center">
                <h1 className="font-bold text-4xl lg:text-5xl text-[#EEEEEE] pb-10 pt-10 bg-[#76ABAE]" >What I Do...</h1>

                <div data-aos="fade-up" className="carousel carousel-center space-x-8 rounded-box mx-44 mt-10 mb-20 ">
                    {info && info.map((service, index) => (
                       <div key={index} className="carousel-item relative  mt-8">
                            <img src={service.image.url} className="rounded-box w-96 " alt={`Service ${index}`} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-75 transition-opacity duration-300 opacity-0 hover:opacity-100 hover:rounded-box">
                                <p className="text-white text-xl font-bold mb-2">{service.name}</p>
                                <p className="text-white text-lg">{service.desc}</p>
                                <p className="text-white text-lg">Charge : {service.charge}</p>
                            </div>
                        </div> 
                    ))}
                </div>

                

                <motion.div
                     className=" mx-10 text-[#76ABAE]"
                     stroke="" // Adding the stroke color here
                     strokeWidth="10"
                     variants={draw}
                     initial="hidden"
                     animate="visible"
                    ><div className="border-b-4 mx-72 border-[#76ABAE]"></div></motion.div>

                {/* <div className="border-b-8 border-[#76ABAE]"></div> */}
            </div>
        </div>
    );
    
    
});

export default Services;
