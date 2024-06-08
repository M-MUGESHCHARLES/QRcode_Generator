import './App.css';
import { QRcodeGenerator } from './components/QRCodeGenerator/QRcodeGenerator.js';
import Footer from './components/Footer/Footer.js'

function App() {



  return (
    <div className="App">
      <QRcodeGenerator />
      <div className='Footer'>
        <Footer />
      </div>
    </div>
  );
}

export default App;
