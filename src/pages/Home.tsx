import About from '@/components/sections/About'
import Exp from '@/components/sections/Exp'
import GithubActivity from '@/components/sections/GithubActivity'
import Hero from '@/components/sections/Hero'
import ProjectSec from '@/components/sections/ProjectSec'
import Skills from '@/components/sections/Skills'
import TextPressure from "../components/ui/TextPressure";
// import CallbackForm from '@/components/sections/CallbackForm'
import RequestCallback from '@/components/sections/RequestCallback'
import { ToastContainer } from 'react-toastify'

const Home = () => {
  return (
    <>
      <ToastContainer />
      <Hero />
      <div className=' w-full max-w-4xl mx-auto h-auto  px-6 sm:px-4 lg:px-0'>
        <About />
        <Exp />
        <Skills />
        <ProjectSec />
        <GithubActivity />
        <RequestCallback />
        <div style={{ position: 'relative', height: '300px' }}>
          <TextPressure
            text="Rakesh"
            flex={true}
            alpha={true}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="true"
            strokeColor="#ff8000"
            className='dark:text-white text-black'
            minFontSize={36}
          />
        </div>

      </div>
    </>
  )
}

export default Home
