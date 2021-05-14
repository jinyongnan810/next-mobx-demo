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
  addTransaction(message: string) {
    this.transactions.push(message);
  }
}

const StoreContext = createContext<BlockChainStore>(new BlockChainStore());
const StoreProvider: FC<{ store: BlockChainStore }> = ({ store, children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
const useStore = () => {
  return useContext(StoreContext);
};

export { BlockChainStore, StoreProvider, useStore };
