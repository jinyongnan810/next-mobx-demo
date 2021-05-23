import { useState, FC } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "src/store";

const Home: FC = () => {
  return (
    <main>
      <Transactions />
    </main>
  );
};

const Transactions: FC = () => {
  const store = useStore();
  return store.transactions.length > 0 ? (
    <div>
      <h2>Pending Transactions</h2>
      <ul className="pending">
        {store.transactions.map((t, i) => (
          <li key={`transaction${i}`}>{t}</li>
        ))}
      </ul>
    </div>
  ) : (
    <div>No Transactions</div>
  );
};

export default Home;
