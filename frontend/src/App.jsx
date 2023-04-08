import './App.css'
import {Routes, Route} from "react-router-dom"
import Profile from './components/Profile.jsx'
import { RequireToken } from './Auth'
import MainPage from './components/MainPage'
import Register from './components/Register'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route 
          path="/" 
          element = {<>
                        <MainPage/>
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

        <Route 
          path="/register"
          element = {
            <Register />
          }
        />
      </Routes>
    </div>
  )
}

export default App
