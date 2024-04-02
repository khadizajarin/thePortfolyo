
import { forwardRef, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import './Projects.css';
import { Link } from "react-router-dom";

// eslint-disable-next-line react/display-name
const Projects = forwardRef((props, ref) => {

    const [info, setInfo] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        AOS.init({
        });
    }, []);

    useEffect(() => {
        axiosPublic.get('')
            .then((res) => {
                setInfo(res.data.user.projects);
                // console.log(res.data)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [axiosPublic]);
    return (
        <div ref={ref} className="bg-white " >
            <div className="flex justify-center relative z-10 " style={{opacity:0.7}}>
                <div className=" p-5 inline-block bg-[#76ABAE] relative top-10" >
                    <h1 className="text-center font-bold  text-3xl text-[#F2F2F2] ">PROJECTS</h1>
                </div>
            </div>
            <div className=" grid lg:grid-cols-3 grid-cols-1 gap-6 text-[] slider px-20 pt-20  bg-[#DCDEE0] pb-32 relative">
                {info.slice().reverse().map((project, index) => (
                    <div key={index} data-aos="fade-up" className="slider-item mt-4">
                        <div className="diff aspect-[16/9] rounded-box h-72 ">
                            <div className="diff-item-1 flex-row text-right rounded-box">
                                <img alt="daisy" src={project.image.url} /> 
                                <div className="p-10 glass text-[#31363F]">
                                    <h2 className="font-extrabold text-3xl ">{project.title}</h2>
                                    <h2 className='font-extrabold my-2'>{project.techStack}</h2>
                                    <p className="text-xs">{project.description}</p>
                                    <Link to={project.liveurl} className="btn btn-ghost text-[#F2F2F2] rounded-lg mt-4 bg-[#31363F]" style={{opacity:0.8}}>See Project</Link>
                                </div>        
                            </div>
                            <div className="diff-item-2">
                                <img alt="daisy" src={project.image.url} />
                            </div>
                            <div className="diff-resizer"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    );
});

export default Projects;