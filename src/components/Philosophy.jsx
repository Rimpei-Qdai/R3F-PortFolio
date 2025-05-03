import React from 'react'
import '../styles/works.css'

const Philosophy = () => {
  return (
    <>
            <div id="twoD-content" className='right philosophy'>
      <h2 className="title middle">VISION</h2>
      <a href='#' className="back-button">
        <span></span>
        <span></span>
      </a>

      <ul className="works-list">
        <li className="works-item">
          <div className="works-title">
            Vision
          </div>
          <h3 className="used-techs">
            「」
          </h3>
          <p className="description">
          聴覚や認知機能の低下は、高齢者の生活の質やコミュニケーション能力の低下を引き起こす要因とされています。特に、発声を伴う訓練は聴取能力や認知機能の向上に有効であることが知られています。そこで、本研究では聴覚・認知・発声訓練を統合したiPadアプリを開発し、その使用感を評価しました。
          本アプリでは、ChatGPTを活用した音声対話型「しりとり」課題を採用し、音声認識（Swift Speech-to-Text）や音声合成（Google TTS）を導入しました。さらに、残響・ノイズを付加することで、お風呂やレストランなど実際の環境に近い条件での訓練を可能にしました。九州大学の学生8名を対象にSUS評価を実施し、概ね高評価を得ましたが、音声認識精度や特定環境での聴取性に課題が見られました。今後は音声認識精度の向上や、ユーザーのモチベーションを維持する機能の実装を目指します。
          </p>

        </li>
        <li className="works-item">
          <div className="works-title">
            基盤
          </div>
         
          <h3 className="used-techs">
            ■インテグラル理論
          </h3>
          <ul className="used-techs-list">
            <li className='used-techs-item'>
              2025年4月、九州大学大学院 統合新領域科学府 オートモーティブサイエンス専攻 情報制御学分野 入学。人間情報システム研究グループに配属され、自動車の情報制御やシステムを通した人間の行動変容について学ぶ。
            </li>
          </ul>

          <h3 className="used-techs">
            ■自我と無意識
          </h3>
          <ul className="used-techs-list">
            <li className='used-techs-item'>
            2020年4月、九州大学 工学部 電気情報工学科 入学。コンピューターサイエンスや電気回路、半導体などを幅広く学ぶ。二年次以降は電気電子工学課程に進み、制御工学やプラズマ工学を学ぶ。2023年度、起業のため一年間休学を経て、2025年3月卒業
            </li>
          </ul>
        </li>
        <li className="works-item">
          <div className="works-title">
            好きな言葉
          </div>
          <ul className="achieves">
            <li className="achieve">
            認知科学
            </li>
            <li className="achieve">
            聴覚訓練
            </li>
            <li className="achieve">
            対話型システム
            </li>
            <li className="achieve">
            LLM（Large Language Models）
            </li>
          </ul>
         
      
        </li>


      </ul>
      <div className="footer">© 2025 Rimpei.H</div>
    </div>
    </>
  )
}

export default Philosophy