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
//wrap observer to the component that need to be rerendered when the state changes
// re-render will only be taken when the related state is changed
const Transactions: FC = observer(() => {
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
});

export default Home;
