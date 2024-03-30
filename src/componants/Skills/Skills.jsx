/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */


import { forwardRef, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { motion } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const Skills = forwardRef((props, ref) => {
    const [info, setInfo] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('')
        .then((res) => {
            console.log(res.data.user.skills)
            setInfo(res.data.user.skills)
        })
        .catch((error) => {
            console.error(error);
        });
    }, [axiosPublic]);

    useEffect(() => {
        AOS.init();
    }, []);

    const SkillItem = ({ skill }) => {
        const [isHovered, setIsHovered] = useState(false);
    
        return (
            <motion.div
                className="relative flex flex-col items-center mt-4"
                style={{
                    width: "150px",
                    height: "120px",
                    padding: "10px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#76ABAE",
                    borderRadius: "8px",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img src={skill.image.url} className="rounded-sm w-10" alt={`skill ${skill.name}`} />
                <p className="text-xl font-bold mb-2">{skill.name}</p>
                <div className="bg-[#31363F] h-8 w-full rounded-sm ">
                    <motion.div
                        className="bg-[#76ABAE] h-full "
                        style={{ width: isHovered ? `${skill.percentage}%` : '0%' }}
                        initial={{ width: 0 }}
                        animate={{ width: isHovered ? `${skill.percentage}%` : '0%' }}
                        transition={{ duration: 1 }}
                    >
                        {isHovered && <span className="absolute left-0 bottom-0 ml-5 mb-3 font-semibold text-[#31363F]">{skill.percentage}%</span>}
                    </motion.div>
                </div>
            </motion.div>
        );
    };
    
    return (
        <div ref={ref} className="lg:h-screen flex flex-col justify-center items-center">
            <div>
                <h1 className="text-center font-bold text-4xl lg:text-5xl text-[#76ABAE] mt-4">Skills...</h1>
                <div data-aos="flip-down" className="grid lg:grid-cols-7 grid-cols-2 gap-4">
                    {info &&
                        info.slice().reverse().map((skill, index) => (
                            <SkillItem  key={index} skill={skill} />
                        ))}
                </div>
            </div>
        </div>
    );
});

export default Skills;

