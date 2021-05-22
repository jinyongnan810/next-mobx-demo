import { AppProps } from "next/app";
import { BlockChainStore, StoreProvider } from "src/store";
import "../styles/globals.css";

const store = new BlockChainStore();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
