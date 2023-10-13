import './App.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js'
import AppRouter from './Components/Router/AppRouter';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import { HashRouter } from 'react-router-dom';
import BaseAppLayout from './Components/Layouts/BaseAppLayout';

function App() {
  return (
    <div className="App">
     <HashRouter>
      <BaseAppLayout>
        <NavigationBar/>
        <AppRouter/>
      </BaseAppLayout>
     </HashRouter>
      
    </div>
  );
}

export default App;
