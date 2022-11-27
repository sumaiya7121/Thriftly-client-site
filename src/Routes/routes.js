import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Home from '../Pages/Home'
import ErrorPage from '../Pages/Errorpage'
import Login from '../Pages/Login/Login'
import Signup from '../Pages/Login/Signup'

import Main from '../Layout/Main'
import Blog from '../Pages/Blog'
import SingleCategory from '../Pages/CategorySection/SingleCategory'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../Pages/Dashboard/MyOrders'
import DashboardLayout from '../Layout/DashboardLayout'
import AllUsers from '../Pages/Dashboard/AllUsers'
import AdminRoute from './AdminRoute'
import AddSeller from '../Pages/Dashboard/AddaProduct'
import AddaProduct from '../Pages/Dashboard/AddaProduct'
import MyProducts from '../Pages/Dashboard/MyProducts'
import AllSellers from '../Pages/Dashboard/AllSellers'
import AllBuyers from '../Pages/Dashboard/AllBuyers'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element:<Login></Login> ,
      },
      {
        path: '/signup',
        element:<Signup></Signup> ,
      },
      {
        path:'/blog',
        element:<Blog></Blog>
      },
      {
    path:'/categories/:name',
    element:<PrivateRoute><SingleCategory></SingleCategory></PrivateRoute>,
    loader:({params})=>fetch(`http://localhost:4000/categories/${params.name}`)
      }
    ],

  },
  {
    path:'/dashboard',
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[

{
path:'/dashboard/myorders',
element:<Dashboard></Dashboard>

},
{
path:'/dashboard/allusers',
element:<AllUsers></AllUsers>

},
{
path:'/dashboard/addproduct',
element:<AddaProduct></AddaProduct>

},
{
path:'/dashboard/myproducts',
element:<MyProducts></MyProducts>

},

{
path:'/dashboard/allsellers',
element:<AllSellers></AllSellers>

},

{
path:'/dashboard/allbuyers',
element:<AllBuyers></AllBuyers>

},







    ]
  }
])

export default router
