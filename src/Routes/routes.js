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
import Dashboard from '../Pages/Dashboard/Dashboard'

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
    element:<Dashboard></Dashboard>
  }
])

export default router
