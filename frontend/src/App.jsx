import './App.css'
import Header from './components/Header'
import Presentation from './components/Presentation'
import GamesPreview from './components/GamesPreview'
import {Routes, Route} from "react-router-dom"
import Login from './components/Login.jsx'
import Profile from './components/Profile.jsx'
import { RequireToken } from './Auth'

function App() {

  return (
    <div className="App">
      

      <Routes>
        <Route 
          path="/" 
          element = {<>
                        <Header />
                        <Presentation />
                        <GamesPreview />
                    </>}
        />
        
        <Route 
            path="/profile" 
            element ={
              <RequireToken>
                <Profile/>
              </RequireToken>
            }
        />
      </Routes>
    </div>
  )
}

export default App
