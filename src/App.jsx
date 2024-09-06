import {useState, useEffect} from "react";
import ImageCard from "./Components/ImageCard.jsx" 
import ImageSearch from "./Components/ImageSearch.jsx";

const API_KEY = '45729007-758353096370fa194d61dcb6e';

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');


  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${term}&image_type=photo&pretty=true`)
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => {console.log(err)});
  }, [term])

  return (
    <div className="mx-auto container">
      <ImageSearch searchText={(text) => {setTerm(text)}} />
      {!isLoading && images.length===0 && <h1 className="text-center mx-auto mt-32 text-5xl">No Images found</h1>}

      {isLoading? <h1 className="text-center mx-auto mt-32 text-6xl">Loading...</h1>  :
        <div className="grid grid-cols-3 gap-4">
          {images.map((img) => {
            return <ImageCard key={img.id} image={img} />
          })}
        </div>}
    </div>
  )
}