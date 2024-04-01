
import { forwardRef, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import "./Testimonials.css";



// eslint-disable-next-line react/display-name
const Testimonials = forwardRef((props, ref) => {
    
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    


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
        <div ref={ref} className="h-screen">
            <h1 className="text-center font-bold text-4xl lg:text-5xl text-[#76ABAE] my-20">Testimonials...</h1>
            <div className="flex justify-center items-center">
                <div className="container p-4 rounded-lg">
                    <div className="carousel">
                        {info.map((review, index) => (
                            <div key={index} id={`item${index + 1}`} className="carousel-item border-[#76ABAE] border-y-4 w-full relative mb-10">
                                <div className="flex flex-col p-10 relative">
                                    <p className="text-[#76ABAE] font-extrabold text-3xl">{review.name}, <span className="text-xl">{review.position}</span></p>
                                    <p className="text-[#76ABAE] overflow-hidden line-clamp-4">{review.review}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center py-2 gap-2">
                        {info.map((_, index) => (
                            <a key={index} href={`#item${index + 1}`} className="btn btn-xs bg-[#76ABAE] border-0">{index + 1}</a>
                        ))}
                    </div>
                </div>
            </div>


    
             
        </div>

    );
});

export default Testimonials;