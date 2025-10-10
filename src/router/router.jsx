import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import RegisterPage from "../Pages/AuthPages/RegisterPage/RegisterPage";
import LoginPage from "../Pages/AuthPages/LoginPage/LoginPage";


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
            }
        ]
    },
    {
        path: '/*',
        Component: ErrorPage
    }
]);