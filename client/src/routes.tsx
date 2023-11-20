import { createBrowserRouter } from "react-router-dom";
import LayoutWebsite from "./layouts/LayoutWebsite";
import LayoutAdmin from "./layouts/LayoutAdmin";
import { Navigate } from "react-router-dom";
import AdminProduct from "./pages/admin/product";
import AdminProductAdd from "./pages/admin/product/add";
import AdminProductEdit from "./pages/admin/product/edit";
import Homepage from "./pages/user/HomePage/Homepage";
import Browsepage from "./pages/user/BrowsePage/BrowsePage";
import Businesspage from "./pages/user/BrowsePage/ChildrenBrowsePages/BusinessPage";
import Creativepage from "./pages/user/BrowsePage/ChildrenBrowsePages/Certifications";
import Technologypage from "./pages/user/BrowsePage/ChildrenBrowsePages/Technology";
import Certificationpage from "./pages/user/BrowsePage/ChildrenBrowsePages/CreativePage";
import LearningPathpage from "./pages/user/LearningPathsPages/LearningPathPages";
import IntroductionPage from "./pages/user/IntroductionPage/IntroductionPage";
import MylearningPageLayout from "./pages/user/MyLearningPage/MylearningPage";
import InProgress from "./pages/user/MyLearningPage/ChildrenMyLearning/InProgress/InProgress";
import Collection from "./pages/user/MyLearningPage/ChildrenMyLearning/Collections/Collections";
import Saved from "./pages/user/MyLearningPage/ChildrenMyLearning/Saved/Saved";
import History from "./pages/user/MyLearningPage/ChildrenMyLearning/History/History";
import CourseContentPage from "./pages/user/CourseContentPage/CourseContentPage";
import OverViewPage from "./pages/user/CourseContentPage/ChildrenContentPages/OverviewPage";
import NotePage from "./pages/user/CourseContentPage/ChildrenContentPages/NotePage";
import Defaultpage from "./pages/user/DefaultPage/DefaultPage";
import SigninPage from "./pages/user/SignInPage/SigninPage";
import SignupPage from "./pages/user/SignUpPage/SignupPage";
import BecomeMentor from "./pages/mentor/BecomeMentor/BecomeMentor";
import AdminCategory from "./pages/admin/categorys";
import AdminCategoryAdd from "./pages/admin/categorys/add";
import ErrorPage from "./pages/404/404page";
import AdminCategoryEdit from "./pages/admin/categorys/edit";
import AdminVideo from "./pages/admin/videos";
import AdminVideoAdd from "./pages/admin/videos/add";
import AdminVideoEdit from "./pages/admin/videos/edit";
import { ContactUs } from "./pages/user/SendEmail/sendEmail";
import Certificate from "./pages/user/Certificate/Certificate";
import Dashboard from "./pages/admin/dashboard/dashboard";
import AdminUser from "./pages/admin/users";
import AdminUserAdd from "./pages/admin/users/add";
import AdminUserEdit from "./pages/admin/users/edit";
import AdminRole from "./pages/admin/roles";
import AdminRoleAdd from "./pages/admin/roles/add";
import AdminRoleEdit from "./pages/admin/roles/edit";
import Profile from "./pages/user/ProfilePage/ProfilePage";

const data = localStorage.getItem("userdata")
const user = data && JSON.parse(data);
console.log(user);

export const routers = createBrowserRouter([
    {
        path: "/",
        element: <LayoutWebsite />,
        children: [
            { index: true, element: <Navigate to="homepage" /> },
            { path: "homepage", element: <Homepage /> },
            { path: "default", element: <Defaultpage /> },
            { path: "contact", element: <ContactUs /> },
            { path: "getcertificate/:id", element: <Certificate /> },
            { path: "learningpath", element: <LearningPathpage /> },
            { path: "introduction/:id", element: <IntroductionPage /> },
            { path: "content/:id", element: <CourseContentPage /> },
            { path: "profile/:id", element: <Profile /> },
            {
                path: "content/:id",
                element: <CourseContentPage />,
                children: [
                    { index: true, element: <Navigate to="overview" /> },
                    { path: "overview", element: <OverViewPage /> },
                    { path: "notepage", element: <NotePage /> },
                ]
            },
            {
                path: "/browsepage",
                element: <Browsepage />,
                children: [
                    { index: true, element: <Navigate to="business" /> },
                    { path: "business", element: <Businesspage /> },
                    { path: "creative", element: <Creativepage /> },
                    { path: "technology", element: <Technologypage /> },
                    { path: "certifications", element: <Certificationpage /> }
                ]
            },
            {
                path: "/mylearning",
                element: <MylearningPageLayout />,
                children: [
                    { index: true, element: <Navigate to="progress" /> },
                    { path: "progress", element: <InProgress /> },
                    { path: "saved", element: <Saved /> },
                    { path: "collections", element: <Collection /> },
                    { path: "history", element: <History /> }
                ]
            },
        ],
    },
    {
        path: "/",
        children: [
            { index: true, element: <Navigate to="signin" /> },
            { path: "signin", element: <SigninPage /> },
            { path: "signup/404", element: <ErrorPage /> },
            {
                path: "signup",
                element: (
                    localStorage.getItem('isLoggedIn') === 'true' ? (
                        <Navigate to="404" />
                    ) : (
                        <SignupPage />
                    )
                ),
            },
            { path: "instructors", element: <BecomeMentor /> }
        ],
    },
    {
        path: "/admin",
        element: user?.[0]?.role === 1 ? <LayoutAdmin /> : <ErrorPage/>,
        children: [
            { index: true, element: <Navigate to="dashboard" /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "product", element: <AdminProduct /> },
            { path: "product/:idProduct/edit", element: <AdminProductEdit /> },
            { path: "product/add", element: <AdminProductAdd /> },
            { path: "categorys", element: <AdminCategory /> },
            { path: "category/add", element: <AdminCategoryAdd /> },
            { path: "category/:idCategory/edit", element: <AdminCategoryEdit /> },
            { path: "videos", element: <AdminVideo /> },
            { path: "video/add", element: <AdminVideoAdd /> },
            { path: "video/:idVideo/edit", element: <AdminVideoEdit /> },
            { path: "users", element: <AdminUser/> },
            { path: "user/add", element: <AdminUserAdd /> },
            { path: "user/:idUser/edit", element: <AdminUserEdit /> },
            { path: "roles", element: <AdminRole /> },
            { path: "role/add", element: <AdminRoleAdd /> },
            { path: "role/:idRole/edit", element: <AdminRoleEdit /> },
        ],

    },
]);
