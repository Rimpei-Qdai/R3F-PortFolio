import React from 'react'
import '../styles/works.css'

const Hobby = () => {
  return (
    <>
    <div id="twoD-content" className='right hobby'>
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum iste voluptates quaerat facilis harum? Consequuntur iure nemo excepturi ea doloremque necessitatibus nisi natus illo impedit culpa! Officia excepturi nostrum ab.
            </div>
          </div>

          <div className="activity">
            <div className="activity-description">
              <div className="activity-title">
                - 100kmウォーク
              </div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum iste voluptates quaerat facilis harum? Consequuntur iure nemo excepturi ea doloremque necessitatibus nisi natus illo impedit culpa! Officia excepturi nostrum ab.
            </div>
            <div className="image-wrapper">
              <img src="/assets/imgs/100km_Walk.jpg" alt="" className="activity-log" />
            </div>
          </div>

          <h3 className="used-techs">
            ■ハイライト
          </h3>

          <div className="photo-gallery">
            <img src="/assets/imgs/bike-hightlight-1.jpeg" alt="" />
            <img src="/assets/imgs/bike-hightlight-2.jpeg" alt="" />
            <img src="/assets/imgs/bike-hightlight-6.jpeg" alt="" />
            <img src="/assets/imgs/bike-hightlight-8.jpeg" alt="" />
            <img src="/assets/imgs/bike-hightlight-5.jpeg" className='large' alt="" />
            <img src="/assets/imgs/bike-hightlight-3.jpeg" alt="" />
            <img src="/assets/imgs/bike-hightlight-4.jpeg" alt="" />
            <img src="/assets/imgs/bike-hightlight-7.jpeg" className='large' alt="" />
          </div>

        </li>
        <li className="works-item">
          <div className="works-title">
            CAMERA
          </div>
          <p className="description">
          九州大学サイクリング同好会（QUCC）に所属し、九州・西日本を中心に自転車で走り回っている。
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

        </li>
     


      </ul>

      <div className="footer">© 2025 Rimpei.H</div>
    </div>
    </>
  )
}

export default Hobby