import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navigation from '../components/nav/navigation'
import LoginModal from '../components/auth/loginModal';
import { Component } from 'react';
import RegisterModal from '../components/auth/registerModal';

export default class Home extends Component {
  constructor(props) {
    super(props);
      this.state = {
        cartCount: 0,
        isSignedIn: false,
        showLoginModal: false,
        showRegisterModal:false
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
  
  handleChange(fieldName, value) {
    this.setState({
        [fieldName]: value,
    })
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
            Get started by editing{' '}
            <code className={styles.code}>pages/index.js</code>
          </p>
  
          {this.state.showLoginModal &&  <LoginModal show={this.state.showLoginModal} closeLoginModal={this.closeLoginModal}/>}
          {this.state.showRegisterModal &&  <RegisterModal show={this.state.showRegisterModal} closeRegisterModal={this.closeRegisterModal}/>}
  
          <div className={styles.grid}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h2>Documentation &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>
  
            <a href="https://nextjs.org/learn" className={styles.card}>
              <h2>Learn &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>
  
            <a
              href="https://github.com/vercel/next.js/tree/canary/examples"
              className={styles.card}
            >
              <h2>Examples &rarr;</h2>
              <img className={styles.img} src='https://b2912710.smushcdn.com/2912710/wp-content/uploads/2021/11/IMAG_12_cover-1024x687.jpg?lossy=1&strip=1&webp=1' />
  
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>
  
            <a
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
            >
              <h2>Deploy &rarr;</h2>
            <img className={styles.img} src='https://www.imagdisplays.co.uk/wp-content/uploads/2021/04/PHOTO-2020-08-13-16-07-05.jpg' />
              
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </div>
        </main>
  
        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </footer>
      </div>
    )
  }
  
}
