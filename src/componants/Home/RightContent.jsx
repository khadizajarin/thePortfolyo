// RightContent.js
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { motion } from "framer-motion"

const RightContent = () => {
    const [info, setInfo] = useState({});
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('')
            .then((res) => {
                setInfo(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [axiosPublic]);

    return (
        <div className="lg:pl-12 bg-[#34464C]">
            <div className=" lg:p-56">
            <motion.div
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
            }}
            ><span className="font-bold text-4xl lg:text-7xl text-[#76ABAE] " >{info.user?.about?.title?.substring(0, 9)?.toUpperCase()} </span>
            <span className="font-bold text-4xl  text-[#F2F2F2] mt-20" style={{ letterSpacing: '22px' }}>{info.user?.about?.title?.substring(9)?.toUpperCase()}</span>
            </motion.div>
            </div>
        </div>
    );
};

export default RightContent;
