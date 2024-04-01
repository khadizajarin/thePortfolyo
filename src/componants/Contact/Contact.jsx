import { forwardRef, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaCheckCircle, FaEnvelope, FaLandmark, FaPhone, } from 'react-icons/fa';
import { useForm } from "react-hook-form"
import {motion} from "framer-motion";

// eslint-disable-next-line react/display-name
const Contact = forwardRef((props, ref) => {

    const [info, setInfo] = useState([]);
    const [social, setSocial] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('')
            .then((res) => {
                setInfo(res.data.user.about);
                setSocial(res.data.user.social_handles);
                // console.log(res.data.user.social_handles)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [axiosPublic]);

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) => console.log(data)
    return (
        <div ref={ref} className="h-screen flex flex-col justify-center gap-9 items-center">
            <h1 className="text-center font-bold text-4xl lg:text-5xl text-[#76ABAE] mt-20">Contact...</h1>
            <div className="lg:flex justify-around items-center">
                <div  className="grid lg:grid-cols-2 grid-cols-1 justify-center items-center gap-6 m-20">
                <motion.div
                    whileHover={{ scale: 1.2 }} 
                    style={{
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.6s ease-in-out', 
                    }}>
                    <div data-aos="fade-down-right" className="card  bg-[#76ABAE] text-[#EEEEEE] shadow-xl image-full">
                        <div className="card-body w-56">
                            <h2 className="card-title flex justify-center"><FaPhone className=""></FaPhone></h2>
                            <p className="text-center">{info.phoneNumber}</p>
                        </div>
                    </div>
                </motion.div>
                    
                <motion.div
                    whileHover={{ scale: 1.2}} 
                    style={{
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.6s ease-in-out', 
                    }}>
                    <div data-aos="fade-down-left" className="card  bg-[#76ABAE] shadow-xl image-full">
                        <div className="card-body w-56">
                            <h2 className="card-title flex justify-center"><FaEnvelope></FaEnvelope></h2>
                            <p className="text-center">{info.contactEmail}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.2 }} 
                    style={{
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.6s ease-in-out', 
                    }}>
                    <div data-aos="fade-up-right" className="card  bg-[#76ABAE] shadow-xl image-full">
                        <div className="card-body w-56">
                            <h2 className="card-title flex justify-center"><FaLandmark></FaLandmark></h2>
                            <p className="text-center">{info.address}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.2 }} 
                    style={{
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.6s ease-in-out', 
                    }}>
                    <div data-aos="fade-up-left" className="card  bg-[#76ABAE] shadow-xl image-full">
                        <div className="card-body w-56">
                            <h2 className="card-title flex justify-center"><FaCheckCircle></FaCheckCircle></h2>
                            <p className="text-center">Hire Available</p>
                        </div>
                    </div>
                </motion.div>

                {/* social handles */}
                    <div>
                        <motion.div
                            whileHover={{ scale: 1.2 }} 
                            style={{
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.6s ease-in-out', 
                                width:"100px",
                                display: 'flex',
                                flexDirection:"row"
                            }}
                        >
                            {social.map(handle => (
                                <img key={handle.id} src={handle.image.url} alt={handle.name} />
                            ))}
                        </motion.div>
                    </div>
                </div>

                
                <div data-aos="fade-right" className=" justify-center items-center">
                    <form className="grid lg:grid-cols-2 grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
                        {/* Name */}
                        <div className="form-control  ">
                                <label className="label">
                                <span className="label-text text-[#76ABAE]">Name*</span>
                            </label>
                            <input
                                type="text"
                                {...register('Name', { required: true })}
                                required
                                className="bg-[#76ABAE] card-body w-56 text-[#222831] input input-bordered " />
                        </div>
                        {/* Email */}
                        <div className="form-control  ">
                                <label className="label">
                                <span className="label-text text-[#76ABAE]">Email*</span>
                            </label>
                            <input
                                type="text"
                                {...register('Email', { required: true })}
                                required
                                className="bg-[#76ABAE] card-body w-56 text-[#222831] input input-bordered " />
                        </div>
                        {/* Phone*/}
                        <div className="form-control w-full ">
                                <label className="label">
                                <span className="label-text text-[#76ABAE]">Phone*</span>
                            </label>
                            <input
                                type="text"
                                {...register('Phone', { required: true })}
                                required
                                className="bg-[#76ABAE] card-body w-56 text-[#EEEEEE] input input-bordered " />
                        </div>
                        {/* Message*/}
                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text text-[#76ABAE]">Message*</span>
                            </label>
                            <textarea
                                {...register('Message', { required: true })}
                                required
                                className="bg-[#76ABAE] card-body w-56 h-32 text-[#EEEEEE] input input-bordered resize-none">
                            </textarea>
                        </div>

                        
                        {errors.exampleRequired && <span>This field is required</span>}

                        <input type="submit" className="btn bg-[#76ABAE] text-[#EEEEEE] input input-bordered  my-6" value="Send message" />
                        </form>
                </div>

                
            </div>
            
        </div>
    );
});

export default Contact;