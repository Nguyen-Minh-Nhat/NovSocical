import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import SocketClient from "../src/SocketClient";
import userApi from "./api/userApi";
import Header from "./components/Header";
import Container from "./components/Main";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import SidebarLeft from "./components/SidebarLeft";
import SidebarRight from "./components/SidebarRight";
import Auth from "./features/Auth";
import { logOut, setUser } from "./features/Auth/userSlice";
import Chat from "./features/Chat";
import Home from "./features/Home";
import Photo from "./features/Photo";
import Profile from "./features/Profile";
import ListOfSearch from "./features/Search/page/ListOfSearch";
import useDarkMode from "./Hooks/useDarkMode";
import PopupPage from "./PopupPage";
import Test from "./test";
import TestServer from "./testServer";

export const ThemeContext = createContext();
export const SearchContext = createContext();
export const SocketContext = createContext();

function App() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  let socket = io.connect(process.env.REACT_APP_SERVER_URL);

  useEffect(() => {
    var mounted = true;
    const loginUser = async () => {
      const res = await userApi.getUser();
      if (res.data.success && mounted) {
        const action = setUser(res.data.user);
        dispatch(action);
      } else {
        const action = logOut();
        dispatch(action);
      }
    };
    loginUser();
    return () => {
      mounted = false;
      socket.close();
    };
  }, []);

  //handleModal
  const [searchInput, setSearchInput] = useState();

  return (
    <SocketContext.Provider value={socket}>
      <div className="App flex flex-col min-h-screen h-full bg-slate-300 dark:bg-indigo-1050 scrollbar">
        {isLoggedIn && (
          <ThemeContext.Provider value={toggleDarkMode}>
            <SearchContext.Provider value={setSearchInput}>
              <Header />
            </SearchContext.Provider>
          </ThemeContext.Provider>
        )}
        {isLoggedIn && <SidebarLeft />}
        {isLoggedIn && <SidebarRight />}
        {isLoggedIn && <SocketClient socket={socket} />}
        <PopupPage />
        <Routes>
          <Route element={<PublicRoutes isLogged={isLoggedIn} />}>
            <Route path="/login" element={<Auth type="login" />} />
            <Route path="/register" element={<Auth type="register" />} />
            <Route path="/test" element={<Test />} />
          </Route>

          <Route element={<ProtectedRoutes isLogged={isLoggedIn} />}>
            <Route path="/" element={<Container />}>
              <Route path="/" element={<Home />} />
              <Route path="/photo" element={<Photo />} />
              <Route path="/server" element={<TestServer />} />
              <Route path="/chat/*" element={<Chat />} />
              <Route path="/people" element={<Container type="people" />} />
              <Route path="/setting" element={<Container type="setting" />} />
              <Route path="/profile/*" element={<Profile />}>
                <Route path=":id/*" element={<Profile />} />
              </Route>
              <Route
                path="/search/*"
                element={<ListOfSearch searchInput={searchInput} />}
              />
            </Route>
          </Route>
        </Routes>
      </div>
    </SocketContext.Provider>
  );
}

export default App;
