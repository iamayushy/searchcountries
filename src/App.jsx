import { useState } from 'react'
import './App.css'
import { Card } from './Components/Card'
import { Search } from './Components/Search'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Search/>
      <Card/>
    </div>
  )
}

export default App
