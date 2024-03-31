
import { forwardRef, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import './Timeline.css'
import {motion} from 'framer-motion'

const circleRadius = 80; 

const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
        const delay = 1 + i * 0.75;
        return {
            pathLength: 1,
            opacity: 1,
            rotate: 360, 
            transition: {
                pathLength: { delay, type: "spring", duration: 3,  repeat: Infinity},
                opacity: { delay, duration: 3 },
                rotate: { delay, duration: 3, repeat: Infinity },
            }
        };
    }
};

const circles = Array.from({ length: 3 }, (_, i) => (
    <motion.circle
        key={i}
        cx="300"
        cy="200"
        r={circleRadius} 
        stroke="#76ABAE"
        variants={draw}
        custom={i + 1}
    />
));

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
            <div className="lg:flex justify-between">
                {/* Education tab content */}
                <div className="w-1/2 px-20 education-section">
                    <h2 className="text-center font-bold text-4xl text-[#76ABAE] mb-4">Education</h2>
                    {info.slice().reverse().filter(item => item.forEducation).slice().reverse().map((line, index) => (
                        <div key={index} className="py-10 relative">
                            <div className="flex flex-row-reverse  items-center">
                            <motion.svg
                                width="300"
                                height="300"
                                viewBox="0 0 600 600"
                                initial="hidden"
                                animate="visible"
                            >
                                {circles}
                            </motion.svg>
                            <div data-aos="fade-down" className="text-right text-[#76ABAE]">
                                <div className="text-right mb-2">
                                    <div className="flex flex-row justify-between items-center mb-2">
                                        <h2 className="text-right font-extrabold text-3xl">{line.company_name}</h2>
                                        <p className="education-date">{formatDate(line.startDate)} - {formatDate(line.endDate)},<br />{line.jobLocation}</p>
                                    </div>
                                    <h2 className='font-extrabold'>{line.summary}</h2>
                                    <ul className="custom-bullets mt-4">
                                        {line.bulletPoints.map((bullet, index) => (
                                            <li key={index}>
                                                <span className="bullet-icon">•</span>
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <p>{line.description}</p>
                            </div>
                            </div>
                        </div>
                    ))}
                </div>



     
                            
                    {/* Experience tab content */}
                <div className="w-1/2 px-20 experience-section">
                        <h2 className="text-center font-bold text-4xl text-[#76ABAE] mb-4">Experience</h2>
                        {info.filter(item => !item.forEducation).slice().reverse().map((line, index) => (
                            <div key={index} className="py-10 relative">
                                <div  className="flex flex-row items-center">
                                <motion.svg
                                    width="300"
                                    height="300"
                                    viewBox="0 0 600 600"
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {circles}
                                </motion.svg>
                                <div data-aos="fade-down" className="text-left text-[#76ABAE]">
                                    <div className="text-left mb-2">
                                        <div className="flex flex-row-reverse justify-between items-center mb-2">
                                            <h2 className="text-left font-extrabold text-3xl">{line.company_name}</h2>
                                            <p className="experience-date ">{formatDate(line.startDate)} - {formatDate(line.endDate)}, <br />{line.jobLocation}</p>
                                        </div>
                                        <h2 className='font-extrabold text-left'>{line.summary}</h2>
                                        <ul className="custom-bullets mt-4">
                                            {line.bulletPoints.map((bullet, index) => (
                                                <li key={index}>
                                                    <span className="bullet-icon">•</span> {/* Custom bullet icon */}
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <p className="mt-4">{line.description}</p>
                                </div>
                                </div>
                                
                                
                            </div>
                        ))}
                </div>
            </div>

        </div>
        <hr className="divider"/>
        </div>
    );
});

export default Timelines;