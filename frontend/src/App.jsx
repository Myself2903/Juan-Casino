import './App.css'
import {Routes, Route} from "react-router-dom"
import { RequireToken } from './Auth'
import MainPage from './Pages/MainPage'
import Register from './Pages/RegisterPage'
import Profile from './Pages/ProfilePage'
import Friend from './Pages/FriendPage'
import Construction from './Pages/ConstructionPage'
import Slots from './Pages/SlotPage'
import Roulette from './Pages/RoulettePage'

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
            path="/friends" 
            element ={
              <RequireToken>
                <Friend/>
              </RequireToken>
            }
        />

        <Route 
          path="/register"
          element = {
            <Register />
          }
        />

        <Route 
          path="/Tragamonedas"
          element = {
            <Construction />
          }
        />

        <Route 
          path="/Poker"
          element = {
            <Construction />
          }
        />

        <Route 
          path="/Blackjack"
          element = {
            <Construction />
          }
        />

        <Route 
          path="/Ruleta"
          element = {
            <Roulette />
          }
        />
      </Routes>
    </div>
  )
}

export default App
