import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import AuthProvider from "../contexts/AuthProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider enableSystem={true} attribute="class">
        <Navbar></Navbar>
        <Component {...pageProps} />
        <Footer></Footer>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
