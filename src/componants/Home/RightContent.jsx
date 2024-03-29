import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const RightContent = () => {

    const [info, setInfo] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('')
        .then((res) => {
            setInfo(res.data);
            // console.log(info.user.about);
        })
        .catch((error) => {
            console.error(error);
        });
    }, [axiosPublic, info]);
    return (
        <div className="flex flex-col justify-center items-center ">
            <div className="font-bold text-7xl text-[#31363F] lg:p-10 mx-10">
                {
                info.user?.about?.title
                }
            </div>
            
        </div>
    );
};

export default RightContent;