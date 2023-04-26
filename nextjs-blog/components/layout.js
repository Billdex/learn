import styles from './layout.module.css'
import Head from "next/head";
import Image from "next/image"
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = "嗷呜嗷呜"
export const siteTitle = "Aowu bot"

export default function Layout({children, home}) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <header className={styles.header}>
                {
                    home ? (
                        <>
                            <Image
                                priority
                                src={"/images/aowu.png"}
                                className={utilStyles.borderCircle}
                                height={144}
                                width={144}
                                alt={""}
                            />
                            <h1 className={utilStyles.heading2Xl}>{name}</h1>
                        </>
                    ) : (
                        <>
                            <Link href={"/"}>
                                <Image
                                    priority
                                    src={"/images/aowu.png"}
                                    className={utilStyles.borderCircle}
                                    height={108}
                                    width={108}
                                    alt={""}
                                />
                                <h2 className={utilStyles.headingLg}>
                                    <Link href="/" className={utilStyles.colorInherit}>
                                        {name}
                                    </Link>
                                </h2>
                            </Link>
                        </>
                    )}
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">← Back to home</Link>
                </div>
            )}
        </div>
    );
}