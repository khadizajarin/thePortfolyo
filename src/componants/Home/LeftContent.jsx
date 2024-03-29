/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const LeftContent = () => {
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
        <div className="mx-4 flex flex-col justify-center items-center">
         <p className="font-bold text-xl lg:mr-10 mb-4">
         I believe in "{info?.user?.about?.quote}"
         </p>
        </div>
      );
};

export default LeftContent;