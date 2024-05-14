import { useLayoutEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

export default function RootLayout() {
  const [auth, setAuth] = useState(null);

  return (
    <>
      <Navbar Auth={auth} setAuth={setAuth} />
      <main className='main-content'>
        <Outlet context={[auth, setAuth]} />
      </main>
      {/* <Footer /> */}
    </>
  );
}
