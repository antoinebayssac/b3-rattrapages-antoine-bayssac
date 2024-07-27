import { Provider } from 'react-redux';
import CreateProduct from './components/CreateProduct';
import { store } from './store';


function App() {
  return (
    <Provider store={store}>
      <div className='bg-bg min-h-screen py-big px-mid'>
        <CreateProduct />
      </div>
    </Provider>
  )
}

export default App;
