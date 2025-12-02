import { Link } from "react-router-dom"


const Page404 = () => {
  return (
    <div>
      <div className="relative flex h-auto min-h-screen w-full max-w-4xl mx-auto flex-col overflow-x-hidden">

        <main className="flex py-20 flex-1 flex-col items-center justify-center text-center px-4">
          <div className=" w-full max-w-xs h-auto">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M47,-69.5C60.3,-62.4,70.2,-47.4,76.3,-31C82.4,-14.6,84.7,3.3,79.5,18.7C74.3,34.1,61.6,47,47.9,56.7C34.2,66.4,19.5,72.9,3.7,74.5C-12.2,76.2,-25.5,73,-39.1,66.6C-52.7,60.2,-66.6,50.7,-73.2,37.3C-79.8,24,-79.1,6.8,-75.7,-9.4C-72.3,-25.6,-66.2,-40.8,-55.8,-51.2C-45.4,-61.6,-30.7,-67.2,-15.8,-70.6C-1,-74,13.7,-76.6,28.3,-77.9C42.8,-79.2,52.2,-78.2,47,-69.5Z"
                fill="#5b13ec"
                transform="translate(100 100) scale(1.1)"
              />
              <text
                className="opacity-80"
                dominantBaseline="middle"
                fill="#FFFFFF"
                fontFamily="Space Grotesk, sans-serif"
                fontSize={60}
                fontWeight="bold"
                textAnchor="middle"
                x="50%"
                y="50%"
              >
                R.
              </text>
              <text
                className="opacity-80 translate-x-12 translate-y-3 rotate-25"
                dominantBaseline="middle"
                fill="#FFFFFF"
                fontFamily="Space Grotesk, sans-serif"
                fontSize={60}
                fontWeight="bold"
                textAnchor="middle"
                x="50%"
                y="50%"
              >
                p
              </text>
              <text
                className="opacity-80 -translate-x-10 translate-y-12 rotate-[-15deg]"
                dominantBaseline="middle"
                fill="#FFFFFF"
                fontFamily="Space Grotesk, sans-serif"
                fontSize={60}
                fontWeight="bold"
                textAnchor="middle"
                x="50%"
                y="50%"
              >
                R
              </text>
              <text
                className="opacity-80 translate-x-5 -translate-y-16 rotate-10"
                dominantBaseline="middle"
                fill="#FFFFFF"
                fontFamily="Space Grotesk, sans-serif"
                fontSize={60}
                fontWeight="bold"
                textAnchor="middle"
                x="50%"
                y="50%"
              >
                M
              </text>
            </svg>
          </div>
          <h1 className="text-gray-900 dark:text-white tracking-tight text-5xl sm:text-7xl font-bold leading-tight px-4 text-center">
            404
          </h1>
          <h2 className="text-gray-800 dark:text-white text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em] px-4 text-center py-2">
            Lost in the Code
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-normal py-2 px-4 text-center max-w-md">
            It seems you've found a broken link in the matrix. Don't worry, we
            can get you back on track.
          </p>
          <div className="flex px-4 py-2 justify-center">
            <Link to="/" className="flex  cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-black/5 border border-black/10 dark:border-white/10 px-4 py-2 font-bold leading-normal tracking-[0.015em] hover:bg-black/10 dark:hover:bg-white/5  transition-all">
              <span className="truncate">Return Home</span>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-6">
            <Link to="/projects"
              className="text-sm font-medium text-primary hover:underline"
              
            >
              Explore Projects
            </Link>
            <Link to="/contact"
              className="text-sm font-medium text-primary hover:underline"
              
            >
              Contact me
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Page404
