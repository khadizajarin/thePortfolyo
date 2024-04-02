// Slider.js
import { useEffect, useState } from "react";
import styles from "./Gsap.module.css";
import gsap from "gsap";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Slider = () => {
    const [info, setInfo] = useState({});
    const axiosPublic = useAxiosPublic();

    const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); 
    };
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    useEffect(() => {
        axiosPublic.get('')
            .then((res) => {
                setInfo(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [axiosPublic]);

    useEffect(() => {
        const divs = document.querySelectorAll(".testimonials");
        gsap.set([divs[0], divs[1], divs[2]], { x: 0, opacity: 0 });

        gsap.timeline({ repeat: -1, defaults: { duration: 1.5 } })
            .add("one")
            .to(divs[0], { y: -50, x: 50, opacity: 1 }, "one")
            .to(divs[1], { y: 0, x: 0, opacity: 0 }, "one")
            .to(divs[2], { y: 0, x: 0, opacity: 0 }, "one")

            .add("two")
            .to(divs[0], { y: 0, x: 0, opacity: 0 }, "two")
            .to(divs[1], { y: 0, x: -100, opacity: 1 }, "two")
            .to(divs[2], { y: 0, x: 0, opacity: 0 }, "two")

            .add("three")
            .to(divs[0], { y: 0, x: 0, opacity: 0 }, "three")
            .to(divs[1], { y: 0, x: 0, opacity: 0 }, "three")
            .to(divs[2], { y: 50, x: 50, opacity: 1 }, "three");
    }, []);

    return (
        <div className={styles.content}>
            {!isMobile && (
                <div className={styles.whitePart} ></div>
            )}
            <div>
                <div className={styles.slider}>
                    <div className="testimonials lg:mx-6">
                        <div className={styles.container}>
                            <div >
                                <p className={`lg:text-xl font-semibold text-[#F2F2F2] ${styles.uppercaseText}`}>{info?.user?.about?.subTitle?.substring(1, 20)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="testimonials lg:mx-6">
                        <div className={styles.container}>
                            <div>
                                <p className={`lg:text-xl font-semibold text-[#F2F2F2] ${styles.uppercaseText}`}>{info?.user?.about?.subTitle?.substring(22, 37)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="testimonials lg:mx-6">
                        <div className={styles.container}>
                            <div>
                                <p className={`lg:text-xl font-semibold text-[#F2F2F2] ${styles.uppercaseText}`}>{info?.user?.about?.subTitle?.substring(41, 58)}</p>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        </div>
    );
};

export default Slider;
