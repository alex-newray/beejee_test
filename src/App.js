import './App.css';
import 'semantic-ui-css/semantic.min.css';

import Header from './components/Header';
import LoginModal from './components/Login';
import Tasks from './components/Tasks';
import CreateModal from './components/Create';
import UpdateModal from './components/Update';
import Notification from './components/Notification';

function App() {
  return (
    <div className="App">
      <Header />
      <Tasks />
      <LoginModal />
      <CreateModal />
      <UpdateModal />
      <Notification />
    </div>
  );
}

export default App;
