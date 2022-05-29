import "./App.css";
import Comment from "../src/components/Comments";
import { data } from "../src/components/data/data";

function App() {
    return (
        <div className="App">
            <Comment data={data} />
        </div>
    );
}

export default App;