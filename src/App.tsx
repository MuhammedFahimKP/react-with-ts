import ListGroup from "./components/ListGroup";

function App() {
  let items = ["London", "New York", "New Delhi", "Abudabhi"];
  let handleSeletedItem = (item: string) => console.log(item);
  return (
    <div>
      <ListGroup
        items={items}
        heading="Cities"
        onSelected={handleSeletedItem}
      />
    </div>
  );
}

export default App;
