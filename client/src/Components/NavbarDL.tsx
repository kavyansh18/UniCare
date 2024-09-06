import { NavLink } from "react-router-dom";
import logo from "../assets/drop.png";

const NavbarDL = () => {
  return (
    <div className="glass w-full h-full lg:px-12 px-2 py-2 flex justify-between items-center">
      <NavLink to="/">
      <div className="flex lg:flex-row flex-col justify-start items-center lg:gap-2 gap-0">
        <div>
          <img className="lg:w-12 w-6" src={logo} alt="" />
        </div>
        <div className="lg:text-lg text-sm font-semibold text-red-500">UniCare</div>
      </div>
      </NavLink>

      <div className="lg:text-4xl text-xl font-bold text-slate-700 lg:ml-0 ml-5">Find a donor</div>

      <div className="flex lg:flex-row flex-col justify-center items-center lg:gap-2 gap-0">
      <div>
        <NavLink to="/updateInfo">
        <button className="register-btn lg:scale-100 scale-[0.65]">
          <span>Update ur info</span>
        </button>
        </NavLink>
      </div>

      <div>
        <NavLink to="/register">
        <button className="register-btn lg:scale-100 scale-[0.65]">
          <span>Register as a donor</span>
        </button>
        </NavLink>
      </div>
      </div>
    </div>
  );
};

export default NavbarDL;
