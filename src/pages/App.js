import React from "react";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

import Navbar from "../Component/Navbar";
import Container from "../Component/Container";
import Error from "../Component/Error";
import Loading from "../Component/Loading";
import NewsList from "../Component/NewsList";

import {getNews} from '../Services/getNews'

function App() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  
  const { id } = useParams()
  const DEFAULT_SEARCH_QUERY = 'microsoft'


  useEffect(() => {
    
    const fetchTechNews = async () => {
      setLoading(true)

      const res = await getNews({
        searchQuery: id || DEFAULT_SEARCH_QUERY
      })
      
      if (!res) {
        setLoading(false)
        setError(true)

        return
      }

      setLoading(false)
      setArticles(res.articles)
    }

    fetchTechNews()
    
    
  }, [id])

  return (
    <div>
      <Navbar/>
      <Container>
        {loading && <Loading/>}
        {error && <Error/>}
        {(!loading && articles.length > 0) && (
          <NewsList articles={articles}/>
        )}
      </Container>  
      <Error /> 
      <Loading/> 
    </div> 
      
      
  );
}

export default App;