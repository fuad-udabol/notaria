import { Provider } from "./Context";
import AppRouter from "./AppRouter";
import { Actions } from "./Actions";
function App() {
  const data = Actions();
  return (
    <Provider value={data}>
      <div className="App">
        <AppRouter/>
      </div>
    </Provider>
  );
}

export default App;