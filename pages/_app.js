import '../styles/globals.css'
import { ThemeProvider } from "next-themes";
import Navbar from '../components/Shared/Navbar/Navbar';
import Footer from '../components/Shared/Footer/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Navbar></Navbar>
      <Component {...pageProps} />
      <Footer></Footer>
    </ThemeProvider>
  );
}

export default MyApp
