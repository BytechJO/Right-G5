import Book from "./component/Book";
import OrientationGate from "./component/OrientationGate";

function App() {
  return (
    <>
      <OrientationGate>
        <Book />
      </OrientationGate>
    </>
  );
}

export default App;
