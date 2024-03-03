import { Route, Routes } from 'react-router-dom'
import './App.css'
import Hero from './components/Hero'
import Cart from './components/cart'
import LoginUser from './components/loginUser'
import MyOrders from './components/myOrders'
import ProductGallery from './components/product-gallery'
import RegisterUser from './components/registerUser'
import OurCollection from './components/OurCollection'
// used to register react-toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Profile from './components/profile'
import Payment from './components/payment'
import Order from './components/order'
import AboutUs from './components/AboutUs'
import PaymentResponsePage from './components/paymentResponse'
import CustomPage from './components/CustomPage'
import ProductDisplay from './components/productDisplay'
import AdminLogin from './components/adminLogin'
import AdminHome from './components/adminHome'
import AdminAddProduct from './components/adminAddProduct'
import AdminUpdatePage from './components/adminUpdatePage'
import AdminOrderStatusPage from './components/adminOrderStatusPage'
import UpdatePassword from './components/UpdatePassword'

function App() {
  // use selector accepts a function which passes the store global state
  // at the moment we are interested only in auth slice
  //const loginStatus = useSelector((state) => state.auth.status)
  //const dispatch = useDispatch()

  // useEffect(() => {
  //   // first read the current sessionStorage and see if user is logged in
  //   if (sessionStorage['token'] && sessionStorage['token'].length > 0) {
  //     // update the auth slice status to true
  //     dispatch(login())
  //   }
  //{loginStatus && <NavigationBar />}
  // }, [])

  return (
    <div className='container-fluid'>
      {/* navigation bar here */}
      {/* conditional rendering */}

      {/*loginStatus && <NavigationBar />*/}
      
      <div className='container'>
      

        <Routes>
          {/* home component  */}
          {/* <Route path='/' element={} /> */}

          <Route path='/' element={<Hero />} />
          {/* login component */}
          <Route path='/login' element={<LoginUser />} />

          {/* register component */}
          <Route path='/collection' element={<OurCollection />} />
          {/* register component */}
          <Route path='/register' element={<RegisterUser />} />

          {/* product-gallery component */}
          <Route path='/product-gallery' element={<ProductGallery />} />

          {/* cart component */}
          <Route path='/cart' element={<Cart />} />

          <Route path='/updatepassword' element={<UpdatePassword />} />
          <Route path='/profile' element={<Profile />}></Route>

          <Route path='/aboutus' element={<AboutUs/>} />

          {/* my orders component */}
          <Route path='/my-orders' element={<MyOrders />} />

          <Route path='/payment-page/:orderId' element={<Payment />} />

          <Route path="/payment/:id" element={<PaymentResponsePage />} />

          <Route path="/custom-page/:paymentId" element={<CustomPage />} />

          <Route path='/product-display/:productId' element={<ProductDisplay />}></Route>

          <Route path='/admin-login' element={<AdminLogin/>}></Route>

          <Route path='/admin-homepage' element={<AdminHome />}></Route>

          <Route path='/admin-addProduct' element={<AdminAddProduct />}></Route>

          <Route path='/admin-updateProduct/:productId' element={<AdminUpdatePage />}></Route>

          <Route path='/admin-order-status' element={<AdminOrderStatusPage />}></Route>

          {/* <Route path='/swag' element={<ProductFilter />}></Route> */}

          <Route path='/order-page' element={<Order />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
