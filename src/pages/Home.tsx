import About from '@/components/sections/About'
import Exp from '@/components/sections/Exp'
import Hero from '@/components/sections/Hero'

const Home = () => {
  return (
    <div className=' w-full max-w-4xl mx-auto h-auto pt-20 px-6 sm:px-0'>
      <Hero/>
      <About/>
      <Exp/>

    </div>
  )
}

export default Home
