import { useEffect, useRef, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { NavLink } from "react-router-dom";


const Navbar = () => {

    const [info, setInfo] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('')
        .then((res) => {
            setInfo(res.data);
            // console.log(info.user.about.name);
        })
        .catch((error) => {
            console.error(error);
        });
    }, [axiosPublic, info]);


    const about = useRef(null);
    const services = useRef(null);

    const scrollToSection = (elementRef) => {
        window.scrollTo({
            top : elementRef.current.offsetTop,
            behavior: "smooth",
        });
    };

    const navlink = 
            <>
                <li > <NavLink to='/' style={({ isActive }) => ({ 
                        color: isActive ? '#EEEEEE' : '' })}>Home</NavLink></li>
                <li onClick={() => scrollToSection(about)}> <NavLink style={({ isActive }) => ({ 
                        color: isActive ? '#EEEEEE' : '' })}>About</NavLink></li>
                <li onClick={() => scrollToSection(services)}> <NavLink  style={({ isActive }) => ({ 
                        color: isActive ? '#EEEEEE' : '' })}>Services</NavLink></li>
                <li> <NavLink to='/dashboard' style={({ isActive }) => ({ 
                        color: isActive ? '#EEEEEE' : '' })}>Skills</NavLink></li>
                <li> <NavLink to='/dashboard' style={({ isActive }) => ({ 
                        color: isActive ? '#EEEEEE' : '' })}>Projects</NavLink></li>
                <li> <NavLink to='/dashboard' style={({ isActive }) => ({ 
                        color: isActive ? '#EEEEEE' : '' })}>Timeline</NavLink></li>
                <li> <NavLink to='/dashboard' style={({ isActive }) => ({ 
                        color: isActive ? '#EEEEEE' : '' })}>Testimonial</NavLink></li>
                <li> <NavLink to='/dashboard' style={({ isActive }) => ({ 
                        color: isActive ? '#EEEEEE' : '' })}>Contact</NavLink></li>
            </>


    return (
        <div className="navbar font-extrabold">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    {navlink}
                </ul>
                </div>
                <a className="btn btn-ghost text-xl">{info.user?.about?.name}</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                {navlink}
                </ul>
            </div>
            <div className="navbar-end avatar"> 
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS Navbar component" src={info.user?.about?.avatar?.url} />
                </div>
            </div>
            
        </div>
    );
};

export default Navbar;