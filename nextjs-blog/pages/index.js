import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>aowu bot</p>
          <p>
            嗷呜是个可爱的机器人噢，她现在两岁了
          </p>
        </section>
      </Layout>
  )
}
