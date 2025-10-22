import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import RegisterPage from "../Pages/AuthPages/RegisterPage/RegisterPage";
import LoginPage from "../Pages/AuthPages/LoginPage/LoginPage";
import AddCar from "../Pages/AddCar/AddCar";
import MyCars from "../Pages/MyCars/MyCars";
import UpdateCar from "../Pages/UpdateCar/UpdateCar";


export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/register',
                Component: RegisterPage
            },
            {
                path: '/login',
                Component: LoginPage
            },
            {
                path: '/add-car',
                Component: AddCar
            },
            {
                path: '/my-cars',
                Component: MyCars
            },
            {
                path: '/update-car/:id',
                Component: UpdateCar
            }
        ]
    },
    {
        path: '/*',
        Component: ErrorPage
    }
]);