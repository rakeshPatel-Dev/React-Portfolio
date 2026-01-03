import About from '@/components/sections/About'
import Exp from '@/components/sections/Exp'
// import GithubActivity from '@/components/sections/GithubActivity'
import Hero from '@/components/sections/Hero'
import ProjectSec from '@/components/sections/ProjectSec'
import Skills from '@/components/sections/Skills'
// import CallbackForm from '@/components/sections/CallbackForm'
import RequestCallback from '@/components/sections/RequestCallback'
import PageTransition from '@/components/PageTransition'
import PressuredText from '@/components/sections/PressuredText'

const Home = () => {
  return (
    <>
      <PageTransition>
        <Hero />
        <div className=' w-full max-w-4xl mx-auto h-auto px-6 sm:px-4 lg:px-0'>
          <About />
          <Exp />
          <Skills />
          <ProjectSec />
          {/* <GithubActivity /> */}
          <RequestCallback />
          <PressuredText />
        </div>
      </PageTransition>
    </>
  )
}

export default Home
