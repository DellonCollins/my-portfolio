import './App.scss';
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
