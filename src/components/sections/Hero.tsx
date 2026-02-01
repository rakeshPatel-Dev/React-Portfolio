import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Ripple } from "../ui/ripple"
import { Button } from "../ui/button"
import { Highlighter } from "@/components/ui/highlighter"
import { LocationTag } from "../ui/location-tag"


const Hero = () => {

  return (
    <div>
      <section
        className="mb-2 relative mt-15 h-170 w-full flex flex-col items-center justify-center text-center rounded-md overflow-hidden"
      >
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 animated-bg" />
        {/* Pulsing Radial Circle */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="radial-circle" />
        </div>
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center gap-4 px-6 animate-fade-in-up">
          {/* Floating Badge */}
          <LocationTag city="Kathmandu" country="Nepal" timezone="NPT" />
          {/* Name */}
          <h1 className="heading-bold  text-5xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tight text-primary drop-shadow-lg translate-z-20 text-center">
            Rakesh Patel
          </h1>
          <p className="leading-loose text-black/70 dark:text-gray-200 font-body sm:text-lg md:text-xl lg:text-2xl max-w-3xl">
            A{" "}
            <Highlighter action="underline" color="#FF9800">
              <span className="font-bold heading-bold">
                Frontend Developer
              </span>
            </Highlighter>{" "}
            focused on clean interfaces, motion, and usability.

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
              href="/public/docs/Rakesh_Patel_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="cursor-pointer">
                View Resume
                <ArrowUpRight />
              </Button>
            </a>

          </div>
        </div>
        <div
          id="toastContainer"
          className="fixed top-5 right-5 flex flex-col gap-2 z-50"
        />
        <div>

          <Ripple />
        </div>
      </section>

    </div>
  )
}

export default Hero
