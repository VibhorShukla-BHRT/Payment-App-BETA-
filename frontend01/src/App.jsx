
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { SignUpPage } from "./pages/SignUp"
import { SigninPage } from "./pages/SignIn"
import { DashboardPage } from "./pages/Dashboard"
import { TransactionPage } from "./pages/Transaction"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<SignUpPage />}/>
      <Route path='/signin' element={<SigninPage />}/>
      <Route path='/dashboard' element={<DashboardPage />}/>
      <Route path='/transaction' element={<TransactionPage />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
