// @ts-nocheck
import '../css/main.css';
import { Analytics } from '@vercel/analytics/next';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <Analytics />
        </>
    );
}
