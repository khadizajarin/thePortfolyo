
import { forwardRef, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import "./Testimonials.css";



// eslint-disable-next-line react/display-name
const Testimonials = forwardRef((props, ref) => {
    

    const [info, setInfo] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('')
            .then((res) => {
                setInfo(res.data.user.testimonials);
                console.log(res.data.user.testimonials)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [axiosPublic]);
    
    return (
        <div ref={ref} className="bg-[#F2F2F2] pb-20">
            <div className="flex justify-center relative z-10 " >
                <div className=" p-5 inline-block bg-[#76ABAE] relative bottom-10" style={{opacity:0.7}}>
                    <h1 className="text-center font-bold text-3xl text-[#3E525C] ">TESTIMONIALS</h1>
                </div>
            </div>
            <div className="flex justify-center items-center pt-8">
                <div className="container p-4 rounded-lg">
                    <div className="carousel ">
                        {info.map((review, index) => (
                            <div key={index} id={`item${index + 1}`} className="carousel-item w-full relative mb-10 ">
                                <div className="flex flex-col p-10 relative">
                                    <p className="text-[#3E525C] font-extrabold text-3xl text-center mb-4">{review.name}, <span className="text-xl">{review.position}</span></p>
                                    <p className="text-[#76ABAE] px-10 text-center">{review.review}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center py-2 gap-2">
                        {info.map((_, index) => (
                            <div key={index}  className="btn btn-xs bg-[#76ABAE] border-0">{index + 1}</div>
                        ))}
                    </div>
                </div>
            </div>


    
             
        </div>

    );
});

export default Testimonials;