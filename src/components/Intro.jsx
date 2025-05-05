import React from 'react'

const Intro = () => {
  return (
    <>
        <div id="twoD-content" className='intro'>
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

        <ul className="works-list">
            <li className="works-item">
            <div className="works-title">
                りんぺい
            </div>
            <img src="/assets/imgs/Rimpei-Face.svg" alt="" className="thumbnail face" />
            <h3 className="used-techs">
                ■メッセージ
            </h3>
            <p className="description">
            初めまして！りんぺーのポートフォリオを訪れて下さり、ありがとうございます！普段は大学院生として自動車情報制御について学ぶとともに、学外では自転車で旅したり、アプリ作ったり、様々活動しています。このサイトを通して、僕の為人を少しでも知っていただければと思います！
            </p>

            <h3 className="used-techs">
                ■特技
            </h3>
            <ul className="achieves">
                <li className="achieve">
                折り紙
                </li>
                <li className="achieve">
                プログラミング <br /> 
                - PHP <br />
                - Swift <br />
                - C# <br />
                - React.js <br />
                - Three.js <br />
                - SQL <br />
                </li>
                
            </ul>

            <h3 className="used-techs">
                ■好きな食べ物
            </h3>

            <a href='https://unzenham.co.jp/' target='_blank' className="more-button second">
            <div className="text">
            雲仙ハム
            </div>
            </a>
            <a href='https://www.himematsuya.jp/' target='_blank' className="more-button second">
            <div className="text">
            姫松屋
            </div>
            </a>
            <a href='https://www.instagram.com/naka_yuuji/' target='_blank' className="more-button second">
            <div className="text">
            豚トロラーメン
            </div>
            </a>
            <a href='https://www.funabansho.jp/' target='_blank' className="more-button second">
            <div className="text">
            海の駅 船番所
            </div>
            </a>
            <a href='https://onomichi-seto.sudachiya.com/' target='_blank' className="more-button">
            <div className="text">
            尾道大衆食堂せと
            </div>
            </a>
            <h3 className="used-techs">
                ■好きな言葉
            </h3>
            <ul className="achieves">
                <li className="achieve">
                折り紙
                </li>
                <li className="achieve">
                プログラミング
                </li>
                
            </ul>
            </li>

        </ul>

        <div className="footer">© 2025 Rimpei.H</div>
        </div>
    </>
  )
}

export default Intro