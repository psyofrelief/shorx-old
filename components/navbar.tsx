import ThemeToggle from "./theme-toggle";

const Navbar = () => {
  return (
    <div role="navbar" className="navbar bg-base-100 px-5 py-0 ">
      <div className="flex-1">
        <a
          aria-label="Home"
          className="btn btn-ghost p-0 text-primary italic text-xl"
          href="."
        >
          shorX
        </a>
      </div>
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
