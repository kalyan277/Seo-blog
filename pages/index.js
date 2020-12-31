import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import Link from 'next/link';

function index(props) {
    //console.log(props.isAuth)
        return (
        <Layout isAuth ={props.isAuth}>
            <article className="overflow-hidden">
            <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                <h1 className="display-4 font-weight-bold">
                    USEFUL BLOGS/TUTORIALS FOR THE FAKE NERDS
                </h1>
                </div>
            </div>
            </div>

            <div className="container">
            <div className="row">
                <div className="col-md-12 text-center pt-4 pb-5">
                <p className="lead">We share interesting stuff</p>
                </div>
            </div>
            </div>
            <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                <div className="flip flip-horizontal">
                    <div
                    className="front"
                    style={{
                        backgroundImage:
                        'url(' +
                        'https://i1.wp.com/itsfoss.com/wp-content/uploads/2017/02/vim-tips-tricks.jpg?resize=800%2C450&ssl=1' +
                        ')',
                    }}
                    >
                    <h2 className="text-shadow text-center h1">Vim</h2>
                    </div>
                    <div className="back text-center">
                    <Link href="/categories/vim">
                        <a>
                        <h3 className="h1">Vim tips</h3>
                        </a>
                    </Link>
                    <p className="lead">The most efficient text editor</p>
                    </div>
                </div>
                </div>
                <div className="col-md-4">
                <div className="flip flip-horizontal">
                    <div
                    className="front"
                    style={{
                        backgroundImage:
                        'url(' +
                        'https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' +
                        ')',
                    }}
                    >
                    <h2 className="text-shadow text-center h1">
                        Web Development
                    </h2>
                    </div>
                    <div className="back text-center">
                    <Link href="/categories/node">
                        <a>
                        <h3 className="h1">Web Development</h3>
                        </a>
                    </Link>
                    <p className="lead">
                        Web development goes a lot deeper than people thinker
                    </p>
                    </div>
                </div>
                </div>

                <div className="col-md-4">
                <div className="flip flip-horizontal">
                    <div
                    className="front"
                    style={{
                        backgroundImage:
                        'url(' +
                        'https://www.itl.cat/pics/b/5/53009_nerdy-desktop-wallpaper.jpg' +
                        ')',
                    }}
                    >
                    <h2 className="text-shadow text-center h1">MISC</h2>
                    </div>
                    <div className="back text-center">
                    <Link href="/categories/nextjs">
                        <a>
                        <h3 className="h1">MISC</h3>
                        </a>
                    </Link>
                    <p className="lead">All the random interesting stuff</p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </article>
        </Layout>
    )
}





export default index