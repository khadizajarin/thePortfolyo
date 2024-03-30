
import { forwardRef, useEffect, useRef, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Timeline.css'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import {motion} from 'framer-motion'

gsap.registerPlugin(ScrollTrigger);


// eslint-disable-next-line react/display-name
const Timelines = forwardRef((props, ref) => {

    useEffect(() => {
        AOS.init();
      }, []);

     // Function to format date
     const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    };

    // useEffect(() => {
       
    //     // Animations for Education section
    //     gsap.from('.education-date', {
    //         scrollTrigger: {
    //             trigger: '.education-section',
    //             start: 'top center',
    //             end: 'bottom center',
    //             scrub: true
    //         },
    //         scaleX: 1.5,
    //         transformOrigin: 'left',
    //         ease: 'none'
    //     });

    //     // Animations for Experience section
    //     gsap.from('.experience-date', {
    //         scrollTrigger: {
    //             trigger: '.experience-section',
    //             start: 'top center',
    //             end: 'bottom center',
    //             scrub: true
    //         },
    //         scaleX: 1.5,
    //         transformOrigin: 'right',
    //         ease: 'none'
    //     });
    // }, []);
    
    const boxRef = useRef(null);
    useEffect(() => {
        gsap.to(".box", {
            rotation: 180,
            duration: 5,
            scrollTrigger: {
                trigger: ".box",
                start: "top top", // Start animation when ".box" enters the viewport
                end: "bottom bottom", // End animation when ".box" leaves the viewport
                scrub: true,
                onEnter: () => {
                    gsap.to(".box", {opacity:0,x:0, y: 500 ,ease: "power2.inOut"});
                },
                onLeaveBack: () => {
                    gsap.to(".box", {opacity:1,x:0, y: 0,ease: "power2.inOut" });
                }
            }
        });

    }, []);


    const [info, setInfo] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('')
            .then((res) => {
                setInfo(res.data.user.timeline);
                console.log(res.data.user.timeline)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [axiosPublic]);


    return (
        <div ref={ref} className="">
            <h1 className="text-center font-bold text-4xl lg:text-5xl text-[#76ABAE] my-20">Timeline...</h1>
            <div className="">
            <div className="flex justify-between">
                {/* Education tab content */}
                <div className="w-1/2 px-20 education-section">
                    <h2 className="text-center font-bold text-4xl text-[#76ABAE] mb-4">Education</h2>
                    {info.slice().reverse().filter(item => item.forEducation).slice().reverse().map((line, index) => (
                        <div key={index} className="py-10 relative">
                            <div className="text-right text-[#76ABAE]">
                                <div className="text-right mb-2">
                                    <div className="flex flex-row justify-between items-center">
                                        <h2 className="text-right font-extrabold text-3xl">{line.company_name}</h2>
                                        <p className="education-date">{formatDate(line.startDate)} - {formatDate(line.endDate)}</p>
                                    </div>
                                    <h2 className='font-extrabold'>{line.summary}</h2>
                                </div>
                                <p>{line.description}</p>
                            </div>
                            
                        </div>
                    ))}
                </div>

                <div ref={boxRef}  className="trigger">
                    <div  className="box"></div>
                </div>
 

                        
                            
                    {/* Experience tab content */}
                <div className="w-1/2 px-20 experience-section">
                    <h2 className="text-center font-bold text-4xl text-[#76ABAE] mb-4">Experience</h2>
                    {info.filter(item => !item.forEducation).slice().reverse().map((line, index) => (
                        <div key={index} className="py-10 relative">
                            <div className="text-left text-[#76ABAE]">
                                <div className="text-left mb-2">
                                    <div className="flex flex-row-reverse justify-between items-center">
                                        <h2 className="text-left font-extrabold text-3xl">{line.company_name}</h2>
                                        <p className="experience-date">{formatDate(line.startDate)} - {formatDate(line.endDate)}</p>
                                    </div>
                                    <h2 className='font-extrabold text-left'>{line.summary}</h2>
                                </div>
                                <p>{line.description}</p>
                            </div>
                            
                            
                        </div>
                    ))}
                </div>
</div>

        </div>
        </div>
    );
});

export default Timelines;