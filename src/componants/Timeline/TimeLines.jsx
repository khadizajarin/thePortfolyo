
import { forwardRef, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import './Timeline.css'
import {motion} from 'framer-motion'


const draw = {
    hidden: { scaleY: [-1, 0] }, 
    visible: {
        scaleY: [0, 1], 
        transition: {
            scaleY: { type: "spring", duration: 4, repeat: Infinity, }, 
        }
    },
    
};

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
                console.log(res.data.user.timeline)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [axiosPublic]);


    return (
        <div ref={ref} className="">
            <hr className="divider"/>
            <h1 className="text-center font-bold text-4xl lg:text-5xl text-[#76ABAE] my-20">Timeline...</h1>
            <div className="">


                {/* Education tab content */}
                <div className=" ">
                    <h2 className="text-center font-bold text-4xl text-[#76ABAE] mb-4">Education</h2>
                    <ul  className=" timeline timeline-snap-icon max-md:timeline-compact timeline-vertical m-10">
                    {info.slice().reverse().filter(item => item.forEducation).slice().reverse().map((line, index) => ( 
                            <li data-aos="fade-down" data-aos-easing="ease-in-sine" key={index} className="py-10 text-[#76ABAE]">
                                <div className="timeline-start text-right">
                                    <p className="text-3xl font-extrabold">{line.company_name}</p>
                                    <p className="font-semibold">{line.summary}</p>
                                    <ul className="custom-bullets  mt-4">
                                        {line.bulletPoints.map((bullet, index) => (
                                            <li key={index}>
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="timeline-end font-bold">
                                    <p className="text-xl">{formatDate(line.startDate)} - {formatDate(line.endDate)},<br />{line.jobLocation}</p>
                                    <p className="text-lg">{line.jobTitle}</p>
                                </div>
                                <motion.hr
                                    className="timeline-middle  mx-10"
                                    // style={{ transformOrigin: 'top' }}
                                    stroke="#76ABAE"
                                    strokeWidth="2"
                                    variants={draw}
                                    initial="hidden"
                                    animate="visible"
                                />
                            </li>
                    ))}
                     </ul>
                </div>



     
                            
                    {/* Experience tab content */}
                    <div className="">
                    <h2 className="text-center font-bold text-4xl text-[#76ABAE] mb-4">Experience</h2>
                    <ul  className=" timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                    {info.slice().reverse().filter(item => !item.forEducation).slice().reverse().map((line, index) => ( 
                            <li data-aos="fade-down" data-aos-easing="ease-in-sine" key={index} className="py-10  text-[#76ABAE] text-right">
                                <div className="timeline-end text-left">
                                    <p className="text-3xl font-extrabold">{line.company_name}</p>
                                    <p className="font-semibold">{line.summary}</p>
                                    <ul className="custom-bullets  mt-4">
                                        {line.bulletPoints.map((bullet, index) => (
                                            <li key={index}>
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="timeline-start font-bold">
                                    <p className="text-xl">{formatDate(line.startDate)} - {formatDate(line.endDate)},<br />{line.jobLocation}</p>
                                    <p className="text-lg">{line.jobTitle}</p>
                                </div>
                                <motion.hr
                                    className="timeline-middle  mx-10"
                                    // style={{ transformOrigin: 'top' }}
                                    stroke="#76ABAE"
                                    strokeWidth="2"
                                    variants={draw}
                                    initial="hidden"
                                    animate="visible"
                                />
                            </li>
                    ))}
                     </ul>
                </div>

            </div>
        </div>
    );
});

export default Timelines;