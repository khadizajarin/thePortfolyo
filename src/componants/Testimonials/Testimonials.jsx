/* eslint-disable react/display-name */
import { forwardRef, useEffect, useState, useRef } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import "./Testimonials.css";

const Testimonials = forwardRef((props, ref) => {
    const [info, setInfo] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const axiosPublic = useAxiosPublic();
    const sliderRefs = useRef([]);

    useEffect(() => {
        axiosPublic.get('')
            .then((res) => {
                setInfo(res.data.user.testimonials);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [axiosPublic]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5 // When more than 50% of the item is visible
        };

        const callback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.dataset.index);
                    setActiveIndex(index);
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);

        sliderRefs.current.forEach((ref) => {
            observer.observe(ref);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div ref={ref} className="bg-[#F2F2F2] pb-20">
            <div className="flex justify-center relative z-10">
                <div className="p-5 inline-block bg-[#76ABAE] relative bottom-10" style={{opacity: 0.7}}>
                    <h1 className="text-center font-bold text-3xl text-[#F2F2F2]">TESTIMONIALS</h1>
                </div>
            </div>
            <div className="flex justify-center items-center pt-8">
                <div className="container p-4 rounded-lg">
                    <div className="carousel">
                        {info.map((review, index) => (
                            <div key={index} id={`item${index + 1}`} className="carousel-item w-full relative mb-10" ref={(el) => (sliderRefs.current[index] = el)} data-index={index}>
                                <div className="flex flex-col p-10 relative">
                                    <p className="text-[#3E525C] font-extrabold text-3xl text-center mb-4">{review.name}, <span className="text-xl">{review.position}</span></p>
                                    <p className="text-[#76ABAE] px-10 text-center">{review.review}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center py-2 gap-2">
                        {info.map((_, index) => (
                            <div key={index} className={`btn btn-xs rounded-md ${index === activeIndex ? 'bg-white ]' : 'bg-[#76ABAE]'} border-2 border-[#76ABAE]`}>{index + 1}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Testimonials;
