import React from 'react'
import '../styles/works.css'

const Hobby = () => {
  return (
    <>
    <div id="twoD-content" className='right'>
      <h2 className="title">HOBBY</h2>
      <a href='#' className="back-button">
        <span></span>
        <span></span>
      </a>

      <ul className="works-list">
        <li className="works-item">
          <div className="works-title">
            QUCC
          </div>
          <p className="description">
          九州大学サイクリング同好会（QUCC）に所属し、九州・西日本を中心に自転車で走り回っている。
          </p>
          <h3 className="used-techs">
            ■愛車
          </h3>
          <h4 className="description">
          Specialized Allez Sprint Comp Disc 2022
          </h4>
          <img src="/assets/imgs/allez-sprint.JPG" alt="" className="thumbnail" />

          <h3 className="used-techs">
            ■主な活動
          </h3>
          <h4 className="small-title">
            - 鹿児島TT
          </h4>
          <img src="/assets/imgs/KagoshimaTT.jpg" alt="" className="thumbnail" />
          <p className="description">
          九州大学サイクリング同好会（QUCC）に所属し、九州・西日本を中心に自転車で走り回っている。
          </p>

          <h4 className="small-title">
            - 100kmウォーク（DNF）
          </h4>
          <img src="/assets/imgs/100km_Walk.jpg" alt="" className="thumbnail" />
          <p className="description">
          九州大学サイクリング同好会（QUCC）に所属し、九州・西日本を中心に自転車で走り回っている。
          </p>

          <h3 className="used-techs">
            ■ハイライト
          </h3>

          <div className="photo-gallery">
            <img src="/assets/imgs/allez-sprint.JPG" alt="" />
            <img src="/assets/imgs/allez-sprint.JPG" alt="" />
            <img src="/assets/imgs/allez-sprint.JPG" alt="" />
            <img src="/assets/imgs/allez-sprint.JPG" alt="" />
            <img src="/assets/imgs/allez-sprint.JPG" alt="" />
          </div>

        </li>
        <li className="works-item">
          <div className="works-title">
            略歴
          </div>
          <div className="history-flow">
            <div className="bar"></div>
            <div className="point">
              <div className="point-title">2025 九州大学大学院 在学中</div>
              <div className="point-sub-title">統合新領域科学府オートモーティブサイエンス専攻 <br /> 情報制御学分野</div>
            </div>
            <div className="point">
              <div className="point-title">2024 卒業研究着手</div>
              <div className="point-sub-title">聴覚・認知機能の向上を目指した、対話型聴覚訓練アプリの開発および若年者への使用感調査</div>
            </div>
            <div className="point">
              <div className="point-title">2022 休学</div>
              <div className="point-sub-title">起業のため一年間休学</div>
            </div>
            <div className="point">
              <div className="point-title">2020 九州大学工学部 入学</div>
              <div className="point-sub-title">電気情報工学科 電気電子工学課程</div>
            </div>
          </div>
         
          <h3 className="used-techs">
            ■修士
          </h3>
          <ul className="used-techs-list">
            <li className='used-techs-item'>
              2025年4月、九州大学大学院 統合新領域科学府 オートモーティブサイエンス専攻 情報制御学分野 入学。人間情報システム研究グループに配属され、自動車の情報制御やシステムを通した人間の行動変容について学ぶ。
            </li>
          </ul>

          <h3 className="used-techs">
            ■学士
          </h3>
          <ul className="used-techs-list">
            <li className='used-techs-item'>
            2020年4月、九州大学 工学部 電気情報工学科 入学。コンピューターサイエンスや電気回路、半導体などを幅広く学ぶ。二年次以降は電気電子工学課程に進み、制御工学やプラズマ工学を学ぶ。2023年度、起業のため一年間休学を経て、2025年3月卒業
            </li>
          </ul>
        </li>


      </ul>

      <div className="footer">© 2025 Rimpei.H</div>
    </div>
    </>
  )
}

export default Hobby