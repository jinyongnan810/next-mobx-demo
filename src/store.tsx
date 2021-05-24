import { makeAutoObservable } from "mobx";
import sha256 from "crypto-js/sha256";
import { createContext, useContext, useEffect, FC } from "react";

interface IBlock {
  hash: string;
  transactions: string[];
}
class BlockChainStore {
  blocks: IBlock[] = [];
  transactions: string[] = [];
  constructor() {
    makeAutoObservable(this);
  }
  get numberOfBlocks() {
    return this.blocks.length;
  }
  addTransaction(message: string) {
    this.transactions.push(message);
  }
  writeBlock() {
    if (this.transactions.length === 0) {
      return;
    }
    const transactions = [...this.transactions];
    this.transactions = [];
    const previousBlock = this.blocks[this.blocks.length - 1] ?? { hash: "" };
    const hash = sha256(
      `${previousBlock.hash}${JSON.stringify(transactions)}`
    ).toString();
    this.blocks.push({ hash, transactions });
  }
}

const StoreContext = createContext<BlockChainStore>(new BlockChainStore());
const StoreProvider: FC<{ store: BlockChainStore }> = ({ store, children }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      store.writeBlock();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [store]);
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
const useStore = () => {
  return useContext(StoreContext);
};

export { BlockChainStore, StoreProvider, useStore };
