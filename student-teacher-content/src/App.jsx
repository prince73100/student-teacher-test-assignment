import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignupPage from "./page/Signup"
import LoginPage from "./page/SignIn"
import useAuth from "./hook/useAuth";
import Homepage from "./page/Homepage";
function App() {
  const {accessToken, loading} = useAuth()
  const ProtectedRoute = ({ children }) => {
    //const localStorageAccessToken = localStorage.getItem("accessToken");
    if(loading){
      return <div>Loading...</div>
    }
    if (!accessToken) {
      return <Navigate to="/sign-in" replace />;
    }
    return children;
  };
  console.log(accessToken)
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* <Route element={<Layout />}> */}
          <Route path="/" element={<Homepage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/sign-in" element={<LoginPage />} />
          {/* <Route path="/about" element={<About />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
