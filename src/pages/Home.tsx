import About from '@/components/sections/About'
import Exp from '@/components/sections/Exp'
import GithubActivity from '@/components/sections/GithubActivity'
import Hero from '@/components/sections/Hero'
import ProjectSec from '@/components/sections/ProjectSec'
import Skills from '@/components/sections/Skills'

const Home = () => {
  return (
    <div className=' w-full max-w-4xl mx-auto h-auto pt-20 px-6 sm:px-4 lg:px-0'>
      <Hero/>
      <About/>
      <Exp/>
      <Skills/>
       <ProjectSec/>
       <GithubActivity/>

    </div>
  )
}

export default Home
