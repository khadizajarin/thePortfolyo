import "./App.css";
import { useEffect, useRef, useState } from "react";
import useAxiosPublic from "./Hooks/useAxiosPublic";
import Home from "./componants/Home/Home";
import About from "./componants/About/About";
import Services from "./componants/Services/Services";
import Skills from "./componants/Skills/Skills";
import Projects from "./componants/Projects/Projects";
import Timelines from "./componants/Timeline/TimeLines";
import Testimonials from "./componants/Testimonials/Testimonials";
import Contact from "./componants/Contact/Contact";

function App() {
  const [info, setInfo] = useState([]);
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

  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const timelineRef = useRef(null);
  const testimonialRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (elementRef) => {
    if (elementRef.current) {
      window.scrollTo({
        top: elementRef.current?.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const navlink = 
            <>
              <li onClick={() => scrollToSection(aboutRef)}><button className="btn btn-ghost">About</button></li>
              <li onClick={() => scrollToSection(servicesRef)}><button className="btn btn-ghost">Services</button></li>
              <li onClick={() => scrollToSection(skillsRef)}><button className="btn btn-ghost">Skills</button></li>
              <li onClick={() => scrollToSection(projectsRef)}><button className="btn btn-ghost">Projects</button></li>
              <li onClick={() => scrollToSection(timelineRef)}><button className="btn btn-ghost">Timeline</button></li>
              <li onClick={() => scrollToSection(testimonialRef)}><button className="btn btn-ghost">Testimonials</button></li>
              <li onClick={() => scrollToSection(contactRef)}><button className="btn btn-ghost">Contact</button></li>
            </>
  

  return (
    <div className="my-text bg-[#222831]">
      <div className="navbar font-extrabold">
        <div className="navbar-start">
          {/* Dropdown for mobile */}
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#76ABAE"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#76ABAE] text-[#76ABAE] space-y-4 rounded-box lg:w-52">
              {navlink}
            </ul>
          </div>
          {/* User name */}
          <a className="btn btn-ghost text-xl text-[#76ABAE]">{info.user?.about?.name}</a>
        </div>
        {/* Center menu for larger screens */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4  text-[#76ABAE]">
            {navlink}
          </ul>
        </div>
        {/* Avatar */}
        <div className="navbar-end avatar">
          <div className="w-10 rounded-full border-[#76ABAE] border-4">
            <img alt="User Avatar" src={info.user?.about?.avatar?.url} />
          </div>
        </div>
      </div>
      <hr className="divider my-0" />
      {/* Components */}
      <Home></Home>
      <About ref={aboutRef}></About>
      <Services ref={servicesRef}></Services>
      <Skills ref={skillsRef}></Skills>
      <Projects ref={projectsRef}></Projects>
      <Timelines ref={timelineRef}></Timelines>
      <Testimonials ref={testimonialRef}></Testimonials>
      <Contact ref={contactRef}></Contact>
    </div>
  );
  
}

export default App;
