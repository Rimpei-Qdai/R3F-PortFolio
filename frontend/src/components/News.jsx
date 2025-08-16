import React, { useEffect, useState } from 'react'
import '../styles/news.css'

const News = () => {
    const [ news, setNews ] = useState(false)

    useEffect(() => {
        fetch("http://localhost:8080/api/news").then(res => res.json()).then((data) => {
          setNews(data.news)
        })
    }, [ ])
  return (
      <>
      
        <div id="twoD-content" className='news'>
        <h2 className="title">
            <p>N</p>
            <p>E</p>
            <p>W</p>
            <p>S</p>
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
        <ul className='news-list'>
            {
                news.map((el, index) => (
                      <li className='news-item' key={ index }>
                        <div className='news-date'>{ el.date }</div>
                        <div className='news-title'>{ el.title }</div>
                        <a className='detail-button' target='_blank' href={ el.url }>
                          <div className="text">
                            詳しく見る
                          </div>
                        </a>
                    </li>
                )) 
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