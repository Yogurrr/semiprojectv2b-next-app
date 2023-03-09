/*import '../styles/globals.css'*/
import Layout from "../components/Layout";
import './index.css';
import '../pages/board.css';
import '../pages/list.css';
import '../pages/myinfo.css';
import '../pages/write.css';
import '../public/css/main.css'
import '../public/css/project2.css'
import '../public/css/normalize.css'

function MyApp({ Component, pageProps }) {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp