import { useRoutes } from 'react-router-dom';
import router from './router';

const appStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

function App() {
  const outlet = useRoutes(router);
  return (
    <div className="App" style={appStyle}>
      {outlet}
    </div>
  );
}

export default App;
