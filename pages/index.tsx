import { useState, FC, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "src/store";

const Home: FC = () => {
  return (
    <main>
      <Title />
      <Form />
      <Transactions />
      <Blocks />
    </main>
  );
};

const Form: FC = () => {
  const store = useStore();
  const messageEl = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        store.addTransaction(messageEl.current!.value);
        messageEl.current!.value = "";
      }}
    >
      <input type="text" ref={messageEl} placeholder="message" required />
      <button type="submit">Submit</button>
    </form>
  );
};

const Title: FC = observer(() => {
  const store = useStore();
  return (
    <h1>
      {store.numberOfBlocks} Blocks ({store.valid ? "Valid" : "Invalid"})
    </h1>
  );
});

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

const Blocks: FC = observer(() => {
  const store = useStore();
  return (
    <ul>
      {[...store.blocks].reverse().map((block) => (
        <li key={block.hash}>
          <h3>{block.hash}</h3>
          <pre>{JSON.stringify(block.transactions, null, 2)}</pre>
        </li>
      ))}
    </ul>
  );
});

export default Home;
