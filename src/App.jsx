import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='top'>
        <h1>ギリギリ間に合うナビ</h1>
      </div>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1> */}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <fieldset id='kouzouji' className='station'>
          <h2>高蔵寺行きに間に合うまであと <span className='highlight'>{count}</span> 分</h2>
          <h2>岡崎行きに間に合うまであと <span className='highlight'>{count}</span> 分</h2>
        </fieldset>
        <br></br>
        <fieldset id='kouzouji' className='station'>
          <h2>バスが出るまで</h2>
          <h2>あと <span className='highlight'>{count}</span> 分</h2>
        </fieldset>
        <div className='flex'>
        <fieldset id='kouzouji' className='station'>
          <h2>高蔵寺行き</h2>
          <h2>あと <span className='highlight'>{count}</span> 分</h2>
        </fieldset>
        <fieldset id='kouzouji' className='station'>
          <h2>岡崎行き</h2>
          <h2>あと <span className='highlight'>{count}</span> 分</h2>
        </fieldset>
        </div>
        <div className='flex'>
          <button>高蔵寺行き時刻表</button>
          <button>岡崎行き時刻表</button>
        </div>
        {/* <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p> */}
      </div>
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
