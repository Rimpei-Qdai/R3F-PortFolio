import React from 'react'
import '../styles/works.css'

const Works = () => {
  return (
    <>
    <div id="twoD-content" className='works'>
      <h2 className="title">
        <p>W</p>
        <p>O</p>
        <p>R</p>
        <p>K</p>
        <p>S</p>
      </h2>
      <a href='#' className="back-button" onClick={() => {
        const sectionDOM = document.querySelector('#twoD-content')
        sectionDOM.classList.remove('show')
        console.log(sectionDOM)
      }}>
        <span></span>
        <span></span>
      </a>

      <ul className="works-list">
        <li className="works-item">
          <div className="works-title">
            Hosh!
          </div>
          <img src="/assets/imgs/Hosh.png" alt="" className="thumbnail" />
          <p className="description">
          「家族や恋人にプレゼントを選ぶのって難しい！」、「自分が本当に欲しいものを見つけるのって難しい！」そんな思いを解決るすために、「Hosh!」は誕生しました。今の自分の欲求を投稿することで、他ユーザーやLLMからほしい物をおすすめしてくれる。また、欲しいものリストを共有することで、プレゼント選びの参考にできる。「ほしい」をキーワードにユーザ間でのインタラクティブな環境を提供します。
          </p>

          <h3 className="used-techs">
            <span className='pink'>■</span>使用技術
          </h3>
          <ul className="used-techs-list">
            {/* <li className='used-techs-item'>
              <img src="/assets/imgs/php-logo.svg" alt="" className="techs-logo" />
            </li>
            <li className='used-techs-item'>
              <img src="/assets/imgs/matter-js-logo.svg" alt="" className="techs-logo" />
            </li>
            <li className='used-techs-item'>
              <img src="/assets/imgs/mysql-logo.png" alt="" className="techs-logo" />
            </li>
            <li className='used-techs-item'>
              <img src="/assets/imgs/google-apps-script-logo.png" alt="" className="techs-logo" />
            </li> */}
            <li className='used-techs-item'>
              php, MySQL, Google Apps Scripts, Matter.js
            </li>
          </ul>

          <h3 className="used-techs">
            ■実績
          </h3>

          <ul className="achieves">
          <li className="achieve">
              <a href="https://mitou-fukuoka.org/works/hosh/" target='_blank'>
                福岡未踏コンソーシアム 2023 Grow3期採択
              </a>
            </li>
            <li className="achieve">
              <a href="https://protopedia.net/prototype/4674" target='_blank'>
                Engineer Driven Day 2023 決勝進出

              </a>
            </li>
           
          </ul>
        </li>
        <li className="works-item">
          <div className="works-title">
            フリーランス
          </div>
          <img src="/assets/imgs/Wahiru-Ichino-portfolio.png" alt="" className="thumbnail" />
          <p className="description">
          フリーランスとして、システム開発の案件を受託。デザイナーのポートフォリオサイト開発や、学習塾の進捗管理システムの開発など、幅広く受注。
          </p>
          <ul className="achieves">
          <li className="achieve">
              <a href="https://wahiru-f.com/" target='_blank'>
                市野わひるさん ポートフォリオ
              </a>
            </li>
           
          </ul>

          <h3 className="used-techs">
            ■使用技術
          </h3>
          <ul className="used-techs-list">
            {/* <li className='used-techs-item'>
              <img src="/assets/imgs/php-logo.svg" alt="" className="techs-logo" />
            </li>
            <li className='used-techs-item'>
              <img src="/assets/imgs/matter-js-logo.svg" alt="" className="techs-logo" />
            </li>
            <li className='used-techs-item'>
              <img src="/assets/imgs/mysql-logo.png" alt="" className="techs-logo" />
            </li>
            <li className='used-techs-item'>
              <img src="/assets/imgs/google-apps-script-logo.png" alt="" className="techs-logo" />
            </li> */}
            <li className='used-techs-item'>
              php, Google Apps Scripts, wordpress
            </li>
          </ul>

          

        </li>
        <li className="works-item">
          <div className="works-title">
            株式会社RIWB
          </div>
          <p className="description">
          2022年6月、株式会社RIWBを設立し代表取締役社長に就任。自律したシンクタンクの実現を最終目標に掲げ、不動産検索サイトの共同開発やシステム案件受注を行う。
          </p>
          <ul className="achieves">
          <li className="achieve">
              <a href="https://riwb.org/" target='_blank'>
                RIWBホームページ
              </a>
            </li>
           
          </ul>

          <h3 className="used-techs">
            ■使用技術
          </h3>
          <ul className="used-techs-list">
            {/* <li className='used-techs-item'>
              <img src="/assets/imgs/php-logo.svg" alt="" className="techs-logo" />
            </li>
            <li className='used-techs-item'>
              <img src="/assets/imgs/matter-js-logo.svg" alt="" className="techs-logo" />
            </li>
            <li className='used-techs-item'>
              <img src="/assets/imgs/mysql-logo.png" alt="" className="techs-logo" />
            </li>
            <li className='used-techs-item'>
              <img src="/assets/imgs/google-apps-script-logo.png" alt="" className="techs-logo" />
            </li> */}
            <li className='used-techs-item'>
               python, php, wordpress
            </li>
          </ul>

          
        </li>
        <li className="works-item">
          <div className="works-title">
            その他
          </div>
          <ul className="achieves">
            <li className="achieve">
            Wework Student Ambassador
            </li>
            <li className="achieve">
            ペンギンハック2024メンター
            </li>
          </ul>
          
          
        </li>
      </ul>

      <div className="footer">© 2025 Rimpei.H</div>
    </div>
    </>
  )
}

export default Works