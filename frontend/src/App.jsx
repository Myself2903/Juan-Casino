import './App.css'
import {Routes, Route} from "react-router-dom"
import { RequireToken } from './Auth'
import MainPage from './Pages/MainPage'
import Register from './Pages/RegisterPage'
import Profile from './Pages/ProfilePage'

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
