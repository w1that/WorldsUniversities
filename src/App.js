
import './App.css';
import ListPage from './components/ListPage';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App container" >
   <SearchBar></SearchBar>
      <ListPage></ListPage>
    </div>
  );
}

export default App;
