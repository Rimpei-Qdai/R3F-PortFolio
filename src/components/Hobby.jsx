import React from 'react'
import '../styles/works.css'

const Hobby = () => {
  return (
    <>
    <div id="twoD-content" className='right hobby'>
      <h2 className="title">
        <p>H</p>
        <p>O</p>
        <p>B</p>
        <p>B</p>
        <p>Y</p>
      </h2>
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
          九州大学サイクリング同好会（QUCC）に所属。福岡を中心に、九州・西日本を旅している。若く体力のある内にできることを全てやり尽くしたいという思いで、自転車に限らず、楽しさ、面白さに特化して活動。
          </p>
          <a href='https://note.com/qu_cyclingclub/n/n357a4608d854' target='_blank' className="more-button">
            <div className="text">
            QUCCについて
            </div>
          </a>

          <h3 className="used-techs">
            ■愛車
          </h3>
          <h4 className="description name">
          Specialized Allez Sprint Comp Disc 2022
          </h4>
          <img src="/assets/imgs/allez-sprint.JPG" alt="" className="thumbnail" />

          <h3 className="used-techs">
            ■主な活動
          </h3>

          <div className="activity">
            <div className="image-wrapper">
              <img src="/assets/imgs/KagoshimaTT.jpg" alt="" className="activity-log" />
            </div>
            <div className="activity-description">
              <div className="activity-title">
                - 鹿児島TT
              </div>
              QUCCで毎年9月に開催しているイベントの一つ。夜22時に福岡サンパレス出発し、鹿児島までの300kmのタイムを競う。
            </div>
          </div>

          <div className="activity reverse">
            <div className="activity-description">
              <div className="activity-title">
                - 100kmウォーク
              </div>
              九大伊都キャンパスから門司港までの100kmを徒歩で移動する。2025年4月に挑戦するも、60km地点で雨によりDNF。6月にリベンジ予定。
            </div>
            <div className="image-wrapper">
              <img src="/assets/imgs/100km_Walk.jpg" alt="" className="activity-log" />
            </div>
          </div>

          <a href='https://www.strava.com/athletes/80879326' target='_blank' className="more-button">
            <div className="text">
            活動をもっと見る
            </div>
          </a>


        </li>
        <li className="works-item">
          <div className="works-title">
            CAMERA
          </div>
          <p className="description">
          2004年発売のNikon D70で、カメラを勉強中。画素数は610万画素と乏しいが、CCD機特有の発色を楽しんでいる。
          </p>
          <h3 className="used-techs">
            ■愛機
          </h3>
          <h4 className="description name">
          Nikon D70
          </h4>
          <img src="/assets/imgs/Nikon-D70.jpg" alt="" className="thumbnail" />

          <h3 className="used-techs">
            ■ハイライト
          </h3>

          <div className="photo-gallery">
            <img src="/assets/imgs/camera-hight-light-2.JPG" alt="" />
            <img src="/assets/imgs/camera-hight-light-3.JPG" alt="" />
            <img src="/assets/imgs/camera-hight-light-4.JPG" alt="" />
            <img src="/assets/imgs/camera-hight-light-5.JPG" alt="" />
            <img src="/assets/imgs/camera-hight-light-1.JPG" alt="" />
            <img src="/assets/imgs/camera-hight-light-6.JPG" alt="" />
            <img src="/assets/imgs/camera-hight-light-7.JPG" alt="" />
            <img src="/assets/imgs/camera-hight-light-8.JPG" alt="" />
            <img src="/assets/imgs/camera-hight-light-9.JPG" alt="" />
            <img src="/assets/imgs/camera-hight-light-10.JPG" alt="" />
          </div>

          <a href='https://www.instagram.com/rimpei3188/' target='_blank' className="more-button">
            <div className="text">
            写真をもっと見る
            </div>
          </a>

        </li>
     


      </ul>

      <div className="footer">© 2025 Rimpei.H</div>
    </div>
    </>
  )
}

export default Hobby