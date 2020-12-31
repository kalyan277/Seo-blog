import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
 
  setGoogleTags(){
    return {
      __html:`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-K7RSQ8F9NQ');`
    }
  }
    render() {
    return (
      <Html lang="en">
        <Head>
       <link rel="stylesheet" href="/static/styles.css"/>
       <script async src="https://www.googletagmanager.com/gtag/js?id=G-K7RSQ8F9NQ"></script>
       <script dangerouslySetInnerHTML={this.setGoogleTags()}></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}