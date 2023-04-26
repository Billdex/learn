import Link from "next/link";
import Image from "next/image"
import Head from "next/head";
import Script from "next/script";
import Layout from "../../components/layout";

export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>aowu</title>
            </Head>
            <h1>First Post</h1>
            <h2>
                <Link href={"/"}>Back to Home</Link>
                <Image
                    src={"/images/aowu.png"}
                    height={144}
                    width={144}
                    alt={"嗷呜"}
                ></Image>
            </h2>
        </Layout>
    )
}