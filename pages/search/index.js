import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navigation from '../components/nav/navigation'
import LoginModal from '../components/auth/loginModal';
import { Component } from 'react';
import RegisterModal from '../components/auth/registerModal';
import AccountModal from '../components/account';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as authApi from '../constant/apis/auth'
import * as productApi from '../constant/apis/product'
import Router, { useRouter } from 'next/router';

export default function Search(){
    const router = useRouter()
    useEffect(()=>{
    },[router.isReady])
    return(
      <div>
        {router.isReady &&<SearchBody productId={router.query.productId}/>}
      </div>
    )
}

export default class SearchBody extends Component {
  constructor(props) {
    super(props);
      this.state = {
        cartCount: 0,
        isSignedIn: false,
        showLoginModal: false,
        showRegisterModal:false,
        showAccountModal: false,
        products: [],
        page:1,
        totalPage: 1,
        totalRows:1
      }
  }
  closeLoginModal = () => {
    this.setState({
      showLoginModal: false
    })
  }

  closeRegisterModal = () => {
    this.setState({
      showRegisterModal: false
    })
  }

  closeAccountModal = () => {
    this.setState({
      showAccountModal: false
    })
  }
  
  handleChange(fieldName, value) {
    this.setState({
        [fieldName]: value,
    })
}

  componentDidMount = async () => {
    if(localStorage){
      let token = localStorage.getItem("auth_token")
      if(token && token!=""){

        this.setState({
          isSignedIn:true
        })
      }
    }
    try{
      const promise = await productApi.getAllProducts({page:this.state.page})
      const data = promise.data.data?.data
      this.setState({
        products: data,
        page: promise.data.data.page,
        totalPage: promise.data.data.total_pages,
        totalRows: promise.data.data.total_rows
      })
    }
    catch(e){

    }
  }

  fetchData = async () =>{
    try{
      let page = this.state.page+1
      if(page>this.state.totalPage)return
      const promise = await productApi.getAllProducts({page:page})
      this.setState({
        page: page
      })
      
      const data = promise.data.data?.data
      
      let products = this.state.products
      products = products.concat(data)
      this.setState({
        products:products
      })
    }
    catch(e){

    }
  }
  render(){
    return (
      <div className={styles.container}>
        <Navigation handleChange = {(field, value) => this.handleChange(field, value)} closeLoginModal={this.closeLoginModal}/>
  
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="/">E-SHOP!</a>
          </h1>
  
          <p className={styles.description}>
            Best Products Here By Searching
          </p>
  
          {this.state.showLoginModal &&  <LoginModal show={this.state.showLoginModal} closeLoginModal={this.closeLoginModal}/>}
          {this.state.showRegisterModal &&  <RegisterModal show={this.state.showRegisterModal} closeRegisterModal={this.closeRegisterModal}/>}
          {this.state.showAccountModal &&  <AccountModal show={this.state.showAccountModal} closeAccountModal={this.closeAccountModal}/>}
          <div></div>
          <InfiniteScroll 
            dataLength={this.state.totalRows}
            next={this.fetchData}
            hasMore={this.state.page<this.state.totalPage}
            loader={<p style={{textAlign:'center'}}>Loading...</p>}
            endMessage={<p style={{textAlign:'center'}}>No more data to load.</p>}>
              <div className={styles.grid}>
                {this.state.products.map((product, i)=>{
                return (
                  <div key={product.ID}
                    // href={''}
                    onClick={()=>{
                      Router.push( { 
                        pathname:'/product/'+ product.ID,
                        query:{productID: product.ID}})
                    }}
                    style={{cursor:'pointer'}}
                    className={styles.card}
                  >
                    <img className={styles.img} src={product.Image} />
                    <h2>$ {product.Price} &rarr;</h2>
                    
                    <p>
                      {product.Name}
                    </p>
                  </div>)
                })}
              
            </div>
          </InfiniteScroll>
        </main>
  
        <footer className={styles.footer}>

        </footer>
      </div>
    )
  }
  
}