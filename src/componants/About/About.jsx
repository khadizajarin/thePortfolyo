/* eslint-disable react/display-name */
import { forwardRef, useEffect, useRef, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import gsap from 'gsap';

const About = forwardRef((props, ref) => {
    const [info, setInfo] = useState([]);
    const axiosPublic = useAxiosPublic();

    const boxRef = useRef(null);
    useEffect(() => {
        const tl = gsap.timeline({ repeat: -1, repeatDelay:2});
        tl.fromTo(
            boxRef.current,
            { opacity: 0, x: -50,y: 20 }, 
            { opacity: 0.8, x: 100,y: 20, rotation: 360, duration: 2, ease: "power2.inOut" } 
        );
    }, []);

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
            })
            .catch((error) => {
                console.error(error);
            });
    }, [axiosPublic]);

    return (
        <div ref={ref} className="relative bg-[#F2F2F2] " > 
            <h1 className="text-center font-bold text-4xl lg:text-5xl text-[#222831] pt-16">ABOUT ME</h1>
            <div className="lg:py-16 max-w-7xl mx-auto flex justify-center items-center">
                <div className="flex flex-col lg:flex-row items-center text-[#222831]"> 
                    <div className="w-1/2 flex justify-center relative">
                        <img data-aos="fade-right" src={info.user?.about?.avatar?.url} className="w-72 rounded-lg shadow-stone-600  lg:mb-0 relative" alt="Avatar" /> 
                        <div ref={boxRef} className="absolute bottom-0 left-0 bg-[#222831] w-28 h-28 rounded-full flex justify-center items-center text-[#F2F2F2]">
                            <p className="p-8">{info.user?.about?.exp_year} years of experience</p>
                        </div>
                    </div>
                    
                    <div data-aos="fade-left" className="w-1/2 text-center lg:text-left relative grid grid-row-3 items-center"> 
                        <p className="font-semibold text-lg mb-8">{info?.user?.about?.description}</p>
                        <ul className="text-left mb-8">
                            <li className="mb-2">Name : {info.user?.about?.name}</li>
                            <li className="mb-2">Email : {info.user?.about?.contactEmail}</li>
                            <li className="mb-2">Phone : {info.user?.about?.phoneNumber}</li>
                            <li className="mb-2">Quote : {info.user?.about?.quote}</li>
                        </ul>
                        <button className="btn bg-[#222831] border-0 text-[#F2F2F2]">Download CV</button>
                    </div>
                </div>
            </div> 
        </div>

    );
});

export default About;
