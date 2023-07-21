function App() {
  async function get() {
    const res = await fetch("http://localhost:8000/", {
      mode: "no-cors",
    });
    console.log(res);
  }
  get();
  return <div>welcome to frontend</div>;
}

export default App;
