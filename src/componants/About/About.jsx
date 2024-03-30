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
        const tl = gsap.timeline({ repeat: -1, repeatDelay:15});
        tl.fromTo(
            boxRef.current,
            { opacity: 0, x: -300 }, 
            { opacity: 1, x: 0, rotation: 360, duration: 3, ease: "power2.inOut" } 
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
        <div ref={ref} className="lg:max-w-7xl lg:mx-auto relative"> 
            <h1 className="text-center font-bold text-4xl lg:text-5xl text-[#76ABAE] mt-4">About Me...</h1>
            <div className="lg:h-screen flex justify-center items-center">
                <div className="flex flex-col gap-6 lg:flex-row-reverse items-center lg:items-start mx-4 w-full text-[#76ABAE] relative"> 
                    <img data-aos="fade-right" src={info.user?.about?.avatar?.url} className="w-60 rounded-lg shadow-stone-600 mb-4 lg:mb-0 relative" alt="Avatar" /> 
                    <div ref={boxRef} className="absolute bottom-0 right-52 bg-[#76ABAE] w-24 h-24 rounded-full flex justify-center items-center text-[#EEEEEE]">
                            <span>Box</span>
                    </div>
                    <div data-aos="fade-left" className="text-center lg:text-left relative"> 
                        <p className="font-bold">{info?.user?.about?.description}</p>
                        <ul className="text-left">
                            <li className="mb-2">Name : {info.user?.about?.name}</li>
                            <li className="mb-2">Email : {info.user?.about?.contactEmail}</li>
                            <li className="mb-2">Phone : {info.user?.about?.phoneNumber}</li>
                            <li className="mb-2">Quote : {info.user?.about?.quote}</li>
                        </ul>
                        <button className="btn mt-4 bg-[#76ABAE] border-0 text-[#EEEEEE]">Download CV</button>
                    </div>
                </div>
            </div> 
        </div>

    );
});

export default About;
