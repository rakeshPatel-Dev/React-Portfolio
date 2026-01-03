import { Link } from "react-router-dom"
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler"

const Header = () => {
  return (
    <header className="heading-bold w-full backdrop-blur-lg shadow-lg py-3 px-6 fixed top-0 z-1">
      <div className="flex items-center flow-row justify-between  max-w-4xl mx-auto">
        <Link to='/' className="flex items-center gap-3 bg-black rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm">
          <img
            src="/images/logo.webp"
            alt="Logo"
            className="h-16 w-16 object-contain"
          />
        </Link>
        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          <Link className="hover:underline hover:underline-offset-8 transition-all" to="/projects">Projects</Link>
          {/* <Link to="/experience">EXP</Link> */}
          <Link className="hover:underline hover:underline-offset-8 transition-all" to="/contact">Contact</Link>

        </nav>
        <AnimatedThemeToggler />
      </div>
    </header>
  )
}

export default Header
