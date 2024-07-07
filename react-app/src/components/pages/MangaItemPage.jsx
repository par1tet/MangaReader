import React from 'react';
import axios from 'axios';
import './styles/MangaItemPage.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function MangaItemPage() {
    const navigate = useNavigate()
    const id = (window.location.href).split('/')[4]
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/find_manga_by_id?id=${+id}`)
        .then(r => {
            localStorage.setItem('title', r.data.manga.nameSyst)
            setName(r.data.manga.nameSyst)
        })
        axios.get(`http://127.0.0.1:8000/find_manga_by_id?id=${+id}`)
        .then(r => {
            localStorage.setItem('description', r.data['manga']['desc'])
            setDesc(r.data['manga']['desc'])
        });
        axios.get(`http://127.0.0.1:8000/find_manga_by_id?id=${+id}`)
        .then(r => {
            localStorage.setItem('description', r.data['manga']['desc'])
            setTitle(r.data['manga']['name'])
        });
    }, [])

    function getTitleName(){
        axios.get(`http://127.0.0.1:8000/find_manga_by_id?id=${+id}`)
        .then(r => {
            localStorage.setItem('title', r.data.manga.nameSyst)
        })
    }

    function goToRead(){
        navigate(`/readmanga/${title}/read`)
    }

    function getDescription(){
        axios.get(`http://127.0.0.1:8000/find_manga_by_id?id=${+id}`)
        .then(r => {
            localStorage.setItem('description', r.data['manga']['desc'])
        });
    }

    return ( <div className='body-panel'>
        <div className='info-manga'>
            <div className='cover'>
                <img src={`http://localhost:8000/${title}/cover`} className='cover-img'></img>
                <button onClick={() => {goToRead()}}>ЧИТАТЬ</button>
            </div>
            <div className='info'>
                <div className='title-name'>
                    {getTitleName()}
                    {name}
                </div>
                <div className='advanced'>
                    <div className='description'>
                        <div className='desc-info'>
                            {getDescription()}
                            {desc}
                        </div>
                    </div>
                    <div className='info-about'>
                        <div className='tags'>
                            <span className='tags-title'>Теги</span>
                        </div>
                        <div className='rait'>
                            <span className='rait-title'>Рейтинг</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div> );
}

export default MangaItemPage;