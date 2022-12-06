import Router from "./router/Router.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";
function App() {
  return (
    <div>
      <AuthProvider>
        <SocketProvider>
          <Router />
        </SocketProvider>
      </AuthProvider>
    </div>
  );
}
export default App;