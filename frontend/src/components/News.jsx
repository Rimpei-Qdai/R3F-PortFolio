import React, { useEffect, useState } from 'react'

const News = () => {
    const [ news, setNews ] = useState(false)

    useEffect(() => {
        fetch("http://localhost:8080/api/news").then(res => res.json()).then((data) => {
          console.log(data.news)
          setNews(data.news)
        })
    }, [ ])
  return (
      <>
      
        <div id="twoD-content" className='news'>
        <h2 className="title">
            <p>I</p>
            <p>N</p>
            <p>T</p>
            <p>R</p>
            <p>O</p>
        </h2>
        <a href='#' className="back-button" onClick={() => {
            const sectionDOM = document.querySelector('#twoD-content')
            sectionDOM.classList.remove('show')
        }}>
            <span></span>
            <span></span>
        </a>

        { news ? (
        <>
        <ul>
            {
                news.map((el) => {
                    return <>
                    <li>
                        <div>{ el.title }</div>
                        <div>{ el.url }</div>
                        <div>{ el.date }</div>
                    </li>
                    </>
                }) 
            }
        </ul>
        </>
      ) : (
        <></>
      )  }


        <div className="footer">© 2025 Rimpei.H</div>
        </div>
    </>
  )
}

export default News