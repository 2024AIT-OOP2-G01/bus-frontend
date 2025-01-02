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
      <div className="card">
        {/*count変数用ボタン 後で消す*/}
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <fieldset id='kouzouji' className='ele_board'>
          <h2>高蔵寺行きに間に合うまであと <span className='highlight'>{count}</span> 分</h2>
          <h2>岡崎行きに間に合うまであと <span className='highlight'>{count}</span> 分</h2>
        </fieldset>
        <br></br>
        <fieldset id='kouzouji' className='ele_board'>
          <h3>バスが出るまで</h3>
          <h3>あと <span className='highlight'>{count}</span> 分</h3>
        </fieldset>
        <div className='flex'>
        <fieldset id='kouzouji' className='ele_board'>
          <h3>高蔵寺行き</h3>
          <h3>あと <span className='highlight'>{count}</span> 分</h3>
        </fieldset>
        <fieldset id='kouzouji' className='ele_board'>
          <h3>岡崎行き</h3>
          <h3>あと <span className='highlight'>{count}</span> 分</h3>
        </fieldset>
        </div>
        <div className='flex'>
          <button>高蔵寺行き時刻表</button>
          <button>岡崎行き時刻表</button>
        </div>
      </div>
    </>
  )
}

export default App
