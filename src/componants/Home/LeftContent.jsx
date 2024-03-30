/* eslint-disable react/no-unescaped-entities */
// LeftContent.js
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const LeftContent = () => {
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
        <div className="mx-4 flex justify-center items-center">
            <p className="font-bold text-lg lg:text-xl lg:mr-10 mb-4 text-center">
                I believe in "{info?.user?.about?.quote}"
            </p>
        </div>
    );
};

export default LeftContent;
