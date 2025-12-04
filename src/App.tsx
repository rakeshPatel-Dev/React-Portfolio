import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Projects from './pages/Projects'
import Page404 from './pages/Page404'
import Header from './components/sections/Header'
import Footer from './components/sections/Footer'
import ProjectDetails from './projects/ProjectDetails'
import { AppDock } from './components/sections/GlobalDock'


const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/projects' element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
      <AppDock/>
      <Footer />
    </>
  )
}

export default App
