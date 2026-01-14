import { Hamburger } from "./Hamburger";
import Logo from "./Logo";
import MenuBar from "./MenuBarClient";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  return (
    <nav className="border border-(--dark)/24 mb-4 rounded-4xl px-4 lg:px-6 py-[18px]">
      <div className="flex items-center justify-between">
        <Logo />
        <MenuBar />
        <div className="hidden lg:flex">
          <ProfileDropdown />
        </div>
        <div className="flex lg:hidden">
          <Hamburger />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
