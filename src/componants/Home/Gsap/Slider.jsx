import { useEffect, useState } from "react";
import styles from "./Gsap.module.css";
import gsap from "gsap";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Slider = () => {

    const [info, setInfo] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('')
        .then((res) => {
            setInfo(res.data);
            // console.log(info.user);
        })
        .catch((error) => {
            console.error(error);
        });
    }, [axiosPublic, info]);

    useEffect(() => {
        const divs = document.querySelectorAll(".testimonials");
        gsap.set([divs[0], divs[1], divs[2]], {x:0, opacity:0});

        gsap.timeline({repeat: -1, defaults:{duration:4}})
        .add("one")
        .to(divs[0], {y:0 , x:50, opacity: 1}, "one")
        .to(divs[1], {y:0, x:0, opacity: 0}, "one")
        .to(divs[2], {y:0, x:0, opacity: 0}, "one")
        
        .add("two")
        .to(divs[0], {y:0, x:0, opacity: 0}, "two")
        .to(divs[1], {y:0, x:-50, opacity: 1}, "two")
        .to(divs[2], {y:0, x:0, opacity: 0}, "two")
        
        .add("three")
        .to(divs[0], {y: 0, x:0, opacity: 0}, "three")
        .to(divs[1], {y: 0, x:0, opacity: 0}, "three")
        .to(divs[2], {y: 0, x:50, opacity: 1}, "three");
    }, []); 
    return (
        <div className={styles.content}>
            <div className="testimonials">
                <div className={styles.container}>
                    <div>
                    <p>{info?.user?.about?.subTitle.substring(0, 21)}</p>
                       
                        
                    </div>
                </div>
            </div>
            
            <div className="testimonials">
                <div className={styles.container}>
                    <div>
                        <p>{info?.user?.about?.subTitle.substring(22, 37)}</p>
                       
                    </div>
                </div>
            </div>
            
            <div className="testimonials">
                <div className={styles.container}>
                    <div>
                        <p>{info?.user?.about?.subTitle.substring(37, 58)}</p>
                       
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Slider;