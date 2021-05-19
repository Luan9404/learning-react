import { useState, useCallback, useEffect } from 'react';
import './styles.css'
import { loadPosts } from '../../utils/loadPosts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {
 /* state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 15,
    searchValue : '',
  }*/
  const[posts, setPosts] = useState([])
  const[allPosts, setAllPosts] = useState([])
  const[page, setPage] = useState(0)
  const[searchValue, setSearchValue] = useState('')
  const[postsPerPage] = useState(15)

  const handleLoadPosts = useCallback( async (page, postsPerPage) => { 
    const postsAndPhotos = await loadPosts();  
    setPosts(postsAndPhotos.slice(page, postsPerPage))
    setAllPosts(postsAndPhotos)
  }, [])

  useEffect(() => {
    handleLoadPosts(0, postsPerPage)
  },[handleLoadPosts, postsPerPage])

  const loadMorePosts = () =>{   
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)
  
    setPosts(posts)
    setPage(nextPage)
  }

  const handleChange = (e) => {
    const {value} = e.target   
    setSearchValue(value)
  }
  const filteredPosts = !!searchValue ? 
    allPosts.filter(post =>{
      return post.title.toLowerCase()
      .includes(searchValue.toLowerCase())
    })
    : posts 

  const noMorePosts = page + postsPerPage >= allPosts.length;
  return (
    <section className="container">

      <div className="search-container">
        {!!searchValue && (
          <h1>Search value: {searchValue}</h1>
        )}       

        <TextInput 
          searchValue={searchValue} 
          handleChange={handleChange} 
        />
      </div>

        {filteredPosts.length !== 0 &&(
         <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 &&(
         <p>Nenhum post encontrado =C</p>
        )}

      <div className="button-container">
        {!searchValue && (
          <Button 
            text="Load more posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}        
      </div>

    </section>
  )  
}
/*
export class Home2 extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 15,
    searchValue : '',
  }

  async componentDidMount() { // quando o componente inicia ele chama a função
    await this.loadPosts()
  }

  loadPosts = async () => { 
    const {page, postsPerPage} = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    })
  }
  loadMorePosts = () =>{
    const {
      page, 
      postsPerPage, 
      allPosts, 
      posts
    } = this.state
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)
    this.setState({posts, page: nextPage})
  }

  handleChange = (e) => {
    const {value} = e.target
    this.setState({...this.state, searchValue: value})   
  }

  render() {
    const { 
      posts, 
      page, 
      postsPerPage, 
      allPosts,
      searchValue 
    } = this.state;

    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? 
    allPosts.filter(post =>{
      return post.title.toLowerCase()
      .includes(searchValue.toLowerCase())
    })
    : posts 

    return (
      <section className="container">

        <div className="search-container">
          {!!searchValue && (
            <h1>Search value: {searchValue}</h1>
          )}       

          <TextInput 
            searchValue={searchValue} 
            handleChange={this.handleChange} 
          />
        </div>

          {filteredPosts.length !== 0 &&(
           <Posts posts={filteredPosts} />
          )}

          {filteredPosts.length === 0 &&(
           <p>Nenhum post encontrado =C</p>
          )}

        <div className="button-container">
          {!searchValue && (
            <Button 
              text="Load more posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}        
        </div>

      </section>
    )
  }

}*/
//function App() {
//  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Hello, world
//        </p>
//      <p>
//        Salve, salve,
//      </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//      </header>
//    </div>
//  );
//}


