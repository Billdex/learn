import Link from "next/link";
import Image from "next/image"
import Head from "next/head";
import Script from "next/script";
import Layout from "../../components/layout";
import useSWR from "swr";

export default function Bcjhbot() {

    return (
        <Layout>
            <Head>
                <title>aowu</title>
            </Head>
            <section>
                <h2>bcjh-bot</h2>
                <p>这是一个用于快捷查询爆炒江湖游戏数据的 QQ 机器人，可以在需要查询游戏数据又不想翻开图鉴网的时候做一些简单查询。</p>
                <p>github: <Link href={"https://github.com/Billdex/bcjh-bot"}>https://github.com/Billdex/bcjh-bot</Link></p>
                <GithubData />
            </section>
        </Layout>
    )
}

const fetcher = (url) => fetch(url).then((res) => res.json());

function GithubData() {
    const {data, error, isLoading} = useSWR(
        "https://api.github.com/repos/Billdex/bcjh-bot",
        fetcher
    )

    if (error) return "An error has occurred: " + error;
    if (isLoading) return "Loading...";
    return (
        <p>
            <span><strong>watch:</strong> {data.subscribers_count} </span>
            <span><b>fork:</b> {data.forks_count} </span>
            <span><b>star:</b> {data.stargazers_count} </span>
        </p>
    )

}