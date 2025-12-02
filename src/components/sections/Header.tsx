import { Link } from "react-router-dom"
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler"

const Header = () => {
  return (
  <header className="w-full backdrop-blur-lg shadow-lg py-3 px-6 fixed top-0 z-50">
    <div className="flex items-center flow-row justify-between  max-w-4xl mx-auto">
    <div className="flex items-center gap-3 bg-black rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm">
      <img
        src="/public/images/logo.webp"
        alt="Logo"
        className="h-16 w-16 object-contain"
      />
    </div>
    {/* Navigation */}
    <nav className="flex items-center space-x-4">
      <Link to="/projects">Projects</Link>
      <Link to="/experience">EXP</Link>
      <Link to="/contact">Contact</Link>

    </nav>
    <AnimatedThemeToggler/>
</div>
  </header>
  )
}

export default Header
