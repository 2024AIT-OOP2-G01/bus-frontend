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
      <br></br>
      <h4>このアプリは、愛工大のバスから愛環にスムーズに<br></br>乗車するための最短時間を表示したアプリです。</h4>
      <p>今いる位置からバスに乗って高蔵寺行きと岡崎行きの愛環に
スムーズに乗ることができるかどうかが表示されています。</p>
      <fieldset className='canvas'>
      <div className="card">
        <fieldset id='best' className='white_board'>
          <h4>ちょうどちょうどいいバスは…</h4>
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
        <br></br>
        <fieldset id='next' className='white_board'>
          <h4>次にちょうどいいバスは…</h4>
          <h2>高蔵寺行きに間に合うまであと <span className='highlight'>{count}</span> 分</h2>
          <h2>岡崎行きに間に合うまであと <span className='highlight'>{count}</span> 分</h2>
        </fieldset>
        <div className='flex'>
          <button>高蔵寺行き時刻表</button>
          <button>岡崎行き時刻表</button>
        </div>
        <ul id="timetable"></ul>
      </div>
      </fieldset>
    </>
  )
}

export default App
