import React from 'react'
import '../../styles/works.css'

const Philosophy = () => {
  return (
    <>
    <div id="twoD-content" className='right vision'>
      <h2 className="title">
        <p>V</p>
        <p>I</p>
        <p>S</p>
        <p>I</p>
        <p>O</p>
        <p>N</p>
      </h2>
      <a href='#' className="back-button">
        <span></span>
        <span></span>
      </a>

      <ul className="works-list">
        <li className="works-item">
          <div className="works-title">
            理念
          </div>
          <div className="vision">
            <div className="pink">Stay</div>
            <div className="blue">True</div>
            <div className="yellow">Within</div>
          </div>
          <div className="description">
            <p className="vision-jp">
            内なる自身に正直に
            </p>
            <p className="eb">・Should <br /> </p>
          社会で生きていく上で必要なこと <br />
          <p className="eb">・Want <br /> </p>
          自分の内面から湧き上がる欲求・感情 <br /> <br />
          この二つに折り合いをつけながら人は行動する。
          しかし、折り合いをつける作業は往々にして<p className="eb">無意識下</p>で行われ、二つのバランスが崩れていることに気づかない。 <br />

          <br />

          Shouldにとらわれれば、<p className="eb">機械</p>のようになってしまう。 <br />
          Wantにとらわれれば、<p className="eb">獣</p>のようになってしまう。 <br />

          <br />

          人間の自我は複雑であり、ShouldとWantを混同してしまう。 <br /> 明確にこれらを区別し、自己が求めることを見極めるのは困難である。 <br /> <br />

          それでも常に自分と向き合い、<p className="eb">ShouldとWantのバランスを保つ</p>ことで、自我を安定させ、最大限のパフォーマンスを維持する。 <br />
          そして常に、自身の自我の限界を認識することで、<p className="eb">何にも囚われない思考</p>を可能にする。
          </div>

        </li>
        <li className="works-item">
          <div className="works-title">
            基盤
          </div>
         
          <h3 className="used-techs">
            ■自我と無意識
          </h3>
          <img src="/assets/imgs/自我と無意識.png" alt="" className="thumbnail" />
          <p className="description">
            アンナ・フロイトによると、人間の内面は、超自我と自我そして無意識で構成されている。超自我とは、社会的体裁や立場などの要因によって形成される、外的に理想な像である。一方、無意識とは、欲求や感情といった、人間が本来持つ内面から湧き上がる事象である。人間の自我とは、この超自我と無意識に折り合いをつけるように作用し、自我によって人は思考し行動する。これらは常に作用しあっており、超自我と無意識のバランスを保つ必要がある。
            超自我の作用が大きくなり、無意識が抑圧されると、自身の感情や欲求が排除され、長期的にその状態が続けば不健全な形で感情や欲求が現れる（図左側）。
            一方、無意識の作用が大きくなり超自我が抑圧されると、社会的信頼を失い、いわゆる不適合者に陥ってしまう（図右側）。

            超自我と無意識のバランスをとり、自我を安定させることで、内面を健全に保ち、自己成長に繋がるのである。

          </p>

          <h3 className="used-techs">
            ■自我発達
          </h3>
          <img src="/assets/imgs/発達段階.png" alt="" className="thumbnail" />
          
          <p className="description">
          ケン・ウィルバーのインテグラル理論によると、人間の自我は成長とともに発達する。自我の成長とともに、自身の能力や性格特性といった要素の用い方が変化する。例えば、順応的段階においては、自身が所属する集団と自己のアイデンティティを同一化しているために、所属する集団において善とされることに盲目的に従う。しかし、自意識的段階においては、孤立した自己としてのアイデンティティを確立しようとするため、集団とは異なる意見、行動をあえて取ることで、自他に自身が周囲と異なる存在であることを暗示しようとするのである。自我が成長し、社会に適応する過程では、すべての欲求が健全に満たされることは稀で、多くの場合、社会に適応する中で都合の悪い欲求や感情は無意識下に抑圧される（shadow）。しかしshadowは、人間が持つ本来必要な欲求・感情であるため、長期的に抑圧されると、不健全な形で現れるようになる。個人にスキルや能力を求める現代の資本主義社会においては、このshadowと向き合うことが重要である。
          </p>
          <h3 className="used-techs">
            ■参考文献
          </h3>
          <ul className="achieves">
            <li className="achieve references">
            著 鈴木規夫（2021）『人が成長するとはどういうことか』日本能率協会マネジメントセンター
            </li>
            <li className="achieve references">
            著 ドン・リチャード・リソ他, 訳 高岡 よし子他 （2019）『新版 エニアグラム【基礎編】 自分を知る9つのタイプ』KADOKAWA
            </li>
            <li className="achieve references">
            著 ドン・リチャード・リソ他, 訳 高岡 よし子他  （2019）『エニアグラム【実践編】　人生を変える９つのタイプ活用法』KADOKAWA
            </li>
            <li className="achieve references">
            著 ケン・ウィルバー他, 訳 鈴木規夫（2020）『NTEGRAL LIFE PRACTICE 私たちの可能性を最大限に引き出す自己成長のメタ・モデル』日本能率協会マネジメントセンター
            </li>
            <li className="achieve references">
            著 アンナ・フロイト, 訳 外林大作（1985）『自我と防衛』誠信書房 第2版
            </li>
            <li className="achieve references">
            著 加藤洋平（2023）『成人発達理論から考える成長疲労社会への処方箋』日本能率協会マネジメントセンター
            </li>
            <li className="achieve references">
            著 カール・グスタフ・ユング, 訳 林道義（1987）『タイプ論』みすず書房
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