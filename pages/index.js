import Layout from "../components/layout/Layout";

export default function Home() {
  return (
      <main className="home">
          <img className="ux" src="/img/ux.png" />
      </main>
  )
}

Home.getLayout = (page) => (
    <Layout meta={{title: "Next.js 프로젝트"}}>
        {page}
    </Layout>
);