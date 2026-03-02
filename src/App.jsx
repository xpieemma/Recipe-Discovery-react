
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import Navbar from './components/Navbar'
import { FavoritesProvider } from './context/FavoritesContext'

function App() {

  return (
    <>
     <Router>
      <FavoritesProvider> 
        <div className='App'>
         <Navbar />
         <main className='main'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />


          </Routes>


         </main>
        </div>

</FavoritesProvider>
     </Router>
    </>
  )
}

export default App
