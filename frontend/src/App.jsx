import { AppProvider } from "./context/AppContext";
import Home from "./pages/Home";

const App = () => {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
};
export default App;
