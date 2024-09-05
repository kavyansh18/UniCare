import { NavLink } from "react-router-dom";
import logo from "../assets/drop.png";

const NavbarDL = () => {
  return (
    <div className="glass w-full h-full px-12 py-2 flex justify-between items-center">
      <NavLink to="/">
      <div className="flex justify-start items-center gap-2">
        <div>
          <img className="w-12" src={logo} alt="" />
        </div>
        <div className="text-lg font-semibold text-red-500">UniCare</div>
      </div>
      </NavLink>

      <div className="text-4xl font-bold text-slate-700">Register as a donor</div>

      <div>
        <NavLink to="/donors">
        <button className="register-btn">
          <span>Find a donor</span>
        </button>
        </NavLink>
      </div>
    </div>
  );
};

export default NavbarDL;
