import React, { useEffect, useState } from 'react'
import '../styles/now.css'
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, limit, orderBy, query } from 'firebase/firestore'
import Calender from './Calender';

const Now = () => {
    const [latestItem, setLatestItem] = useState({cal:100, step:300});

    const getData = async () => {
        const firebaseConfig = {
            apiKey: "AIzaSyBfN_XVjsEqI21JgZCoNjbZqZqxhcf3Fjc",
            authDomain: "bio-data-portfolio.firebaseapp.com",
            projectId: "bio-data-portfolio",
            storageBucket: "bio-data-portfolio.firebasestorage.app",
            messagingSenderId: "901365318859",
            appId: "1:901365318859:web:cfbe35d660a6b5c714074e",
            measurementId: "G-C2XMCW24X3"
        };
    
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        const q = query(
            collection(db, "default"),
            orderBy("fetchedAt", "desc"),
            limit(1)
        )

        const querySnapshot = await getDocs(q)
        setLatestItem(querySnapshot.docs[0].data())

    }

    useEffect(() => {
        
        getData()
    }, [])


  return (
    <>
    <div className="reat-time-data">
        <div className="title">
            <p>N</p>
            <p>O</p>
            <p>W</p>
        </div>
        <div className="now-back-button" onClick={() => {
            const realTimeDataDOM = document.querySelector('.reat-time-data')
            realTimeDataDOM.classList.toggle('view')
            
            const coverDOM = document.querySelector('.global-cover-for-data')
            coverDOM.classList.toggle('open')
        }}>
            <span></span>
            <span></span>
        </div>
        <div className="sub-title">今日のりんぺいは</div>
        <ul className="data">
                  <Calender />
            <li className="datum">
                <div className="datum-name">消費</div>
                <div className="datum-score">{ latestItem.cal }</div>
                <div className="datum-unit">kcal</div>
            </li>
            <li className="datum">
                <div className="datum-name">歩数</div>
                <div className="datum-score">{ latestItem.step }</div>
                <div className="datum-unit">steps</div>
            </li>
            
        </ul>
        <div className="warn">※データは一時間に一度更新されます。</div>
    </div>
    </>
  )
}

export default Now