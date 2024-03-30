
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
        <div ref={ref} className=" ">
            <h1 className="text-center font-bold text-4xl lg:text-5xl text-[#76ABAE] my-6">Projects...</h1>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4  text-[#31363F] slider">
                {info.slice().reverse().map((project, index) => (
                    <div key={index} data-aos={index % 2 === 0 ? "fade-up-left" : "fade-up-right"} className="slider-item">
                        <div className="diff aspect-[16/9] rounded-box h-72 w-4/5">
                            <div className="diff-item-1 flex-row text-right rounded-box">
                                <img alt="daisy" src={project.image.url} /> 
                                <div className=" p-10 glass">
                                    <div className="flex flex-row-reverse justify-between items-center mb-2">
                                        <h2 className="font-extrabold text-3xl ">{project.title}</h2>
                                        <h2 className='font-extrabold '>{project.techStack}</h2>
                                    </div>
                                    <p>{project.description}</p>
                                    <Link to={project.liveurl} className="btn btn-ghost p-2 rounded-box mt-4 border-[#31363F]">See Project</Link>
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