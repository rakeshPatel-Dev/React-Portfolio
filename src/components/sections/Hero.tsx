import { FileDown, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import { Ripple } from "../ui/ripple"
import { Button } from "../ui/button"
import { Highlighter } from "@/components/ui/highlighter"


const Hero = () => {
  return (
    <div>
      <section
        className="tilt   mb-2 relative h-150 w-full flex flex-col items-center justify-center text-center rounded-md overflow-hidden"
        data-tilt=""
        data-tilt-max={10}
        data-tilt-speed={400}
        data-tilt-glare="true"
        data-tilt-max-glare="0.2"
      >
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 animated-bg" />
        {/* Pulsing Radial Circle */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="radial-circle" />
        </div>
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center gap-4 px-4 animate-fade-in-up">
          {/* Floating Badge */}
          <div className=" absolute -top-12 animate-float translate-z-10">
            <div className="flex items-center gap-2 dark:bg-black/20 backdrop-blur-md rounded-full px-4 py-2 text-sm text-black/70 dark:text-gray-300 shadow-lg border border-black/20 cursor-pointer animate-bounce dark:border-white/20">
              <MapPin />
              <span className="heading-normal">Bagmati, Kathmandu</span>
            </div>
          </div>
          {/* Name */}
          <h1 className="heading-bold  text-[2rem] sm:text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tight text-primary drop-shadow-lg translate-z-20 text-center">
            Rakesh Patel
          </h1>
          <p className="leading-loose text-black/70 dark:text-gray-200 font-body sm:text-lg md:text-xl lg:text-2xl max-w-3xl">
            A{" "}
            <Highlighter action="underline" color="#FF9800">
              Frontend Developer
            </Highlighter>{" "}
            building {" "}
            <Highlighter action="highlight" color="#87CEFA">
              digital experiences
            </Highlighter>{" "}
            where design meets code,
            <Highlighter action="highlight" color="#87CEFA">
              
             simply and effectively.
            </Highlighter>{" "}
          </p>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 translate-z-10">
            <Link to="/projects"
              rel="prefetch"
            >
              <Button size="lg">
                View My Work

              </Button>
            </Link>
            <a
              href="/assets/docs/Rakesh Patel CV.pdf"
              download="Rakesh-patel_CV.pdf"
            >
              <Button variant={"outline"} size={"lg"} className=" cursor-pointer">

                <FileDown />
                Download Resume
              </Button>
            </a>
          </div>
        </div>
        <div
          id="toastContainer"
          className="fixed top-5 right-5 flex flex-col gap-2 z-50"
        />
        <Ripple />
      </section>

    </div>
  )
}

export default Hero
