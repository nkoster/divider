import './App.css'
import Resizable from './components/Resizable'

function App() {
  return (
    <div className="App">
      {/*<Resizable direction="vertical">*/}
        <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
          <Resizable direction="horizontal">
            <div className="left-side">test</div>
          </Resizable>
          <div className="right-side">123</div>
        </div>
      {/*</Resizable>*/}
    </div>
  )
}

export default App
