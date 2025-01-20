import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CustomNavbar from './components/user/navbar/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <CustomNavbar />
    </>
  )
}

export default App
