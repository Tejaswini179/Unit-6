import { useState ,useEffect} from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const page_no = 1;
  const [state, setState] = useState([]);
  const [page, setPage] = useState(page_no);

  useEffect(() => {
   fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=25`)
   .then(res => res.json())
   .then(json => setState([...state, ...json.data]))
  }, [page]);

  const scrollToEnd=()=>{
   setPage(page+1)
  }

  window.onscroll = function(){
    //if page scrolled to bottom
    if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
      scrollToEnd()
    }
  }

  return (
    <div className="App">


     {state.length > 0 && state.map((el,i)=>{

       <div key={i} className ='container'>
         <h3>Id: {el._id}</h3>
         <h3>Name:{el.name}</h3>
     
       </div>
    

     })}
     {/* <h1>hh</h1> */}
    </div>
  )
}

export default App
