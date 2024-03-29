import axios from "axios";



const axiosPublic = axios.create({
    baseURL: 'https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;