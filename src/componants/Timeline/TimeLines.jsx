
import { forwardRef, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import './Timeline.css'
import {motion} from 'framer-motion'




// eslint-disable-next-line react/display-name
const Timelines = forwardRef((props, ref) => {

     const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    };

    const [info, setInfo] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('')
            .then((res) => {
                setInfo(res.data.user.timeline);
                // console.log(res.data.user.timeline)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [axiosPublic]);

    const draw = {
        hidden: { scaleY: [-1, 0] }, 
        visible: {
            scaleY: [0, 1], 
            transition: {
                scaleY: { type: "spring", duration: 4, repeat: Infinity, }, 
            }
        },   
    };


    return (
        <div ref={ref} className=" pb-32 bg-[#34464C]">
            <div className="flex justify-center relative z-10 " >
                <div className=" p-5 inline-block bg-[#76ABAE] relative bottom-10" style={{opacity:0.8}}>
                    <h1 className="text-center font-bold text-3xl text-[#F2F2F2] ">TIMELINE</h1>
                </div>
            </div>
            <div className="relative">
                {/* Education tab content */}
                <div className=" bg-[#34464C] ">
                    <h2 className="text-center font-bold text-4xl text-[#F2F2F2] mb-4 underline">EDUCATION</h2>
                    <ul  className=" timeline timeline-snap-icon max-md:timeline-compact timeline-vertical p-10 ">
                    {info.slice().reverse().filter(item => item.forEducation).slice().reverse().map((line, index) => ( 
                            <li  data-aos-easing="ease-in-sine" key={index} className="py-5 text-[#76ABAE]">
                                <div data-aos="fade-left" className="timeline-start text-right">
                                    <p className="text-4xl font-bold">{line.company_name}</p>
                                    <p className="font-semibold text-[#F2F2F2] mt-4 pl-56">{line.summary}</p>
                                    <ul className="custom-bullets  mt-4 pt-2">
                                        {line.bulletPoints.map((bullet, index) => (
                                            <li key={index}>
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div data-aos="fade-right" className="timeline-end font-bold">
                                    <p className="text-3xl">{formatDate(line.startDate)} - {formatDate(line.endDate)},<br />{line.jobLocation}</p>
                                    <p className="text-lg pt-2 text-[#F2F2F2]">{line.jobTitle}</p>
                                </div>
                                <motion.div
                                    className="timeline-middle mx-10 text-[#76ABAE]"
                                    stroke="" // Adding the stroke color here
                                    strokeWidth="10"
                                    variants={draw}
                                    initial="hidden"
                                    animate="visible"
                                > <div className="h-72  bg-[#F2F2F2]" style={{width: "2px"}}></div></motion.div>
                            </li>
                    ))}
                     </ul>
                </div>

                            
                    {/* Experience tab content */}
                    <div className="bg-[#34464C]">
                    <h2 className="text-center font-bold text-4xl text-[#F2F2F2] mb-4 underline">EXPERIENCE</h2>
                    <ul  className=" timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                    {info.slice().reverse().filter(item => !item.forEducation).slice().reverse().map((line, index) => ( 
                            <li  data-aos-easing="ease-in-sine" key={index} className="py-5  text-[#76ABAE] text-right">
                                <div data-aos="fade-right" className="timeline-end text-left">
                                    <p className="text-4xl font-bold">{line.company_name}</p>
                                    <p className="font-semibold text-[#F2F2F2] mt-4 pr-56">{line.summary}</p>
                                    <ul className="custom-bullets mt-4 pt-2">
                                        {line.bulletPoints.map((bullet, index) => (
                                            <li key={index}>
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div data-aos="fade-left" className="timeline-start font-bold">
                                    <p className="text-3xl">{formatDate(line.startDate)} - {formatDate(line.endDate)},<br />{line.jobLocation}</p>
                                    <p className="text-lg pt-2 text-[#F2F2F2]">{line.jobTitle}</p>
                                </div>
                                <motion.div
                                    className="timeline-middle mx-10 text-[#76ABAE]"
                                    stroke="" // Adding the stroke color here
                                    strokeWidth="10"
                                    variants={draw}
                                    initial="hidden"
                                    animate="visible"
                                > <div className="h-72  bg-[#F2F2F2]" style={{width: "2px"}}></div></motion.div>
                            </li>
                    ))}
                     </ul>
                </div>
            </div>
        </div>
    );
});

export default Timelines;