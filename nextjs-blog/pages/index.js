import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link'
import Layout, {siteTitle} from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>
                    这里是嗷呜，她很可爱，她现在两岁了
                </p>
                <br/>
                <h3>
                    <Link href={"/posts/bcjhbot"}>关于 bcjh-bot </Link>
                </h3>
            </section>
        </Layout>
    )
}
