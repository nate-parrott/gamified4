import './intro.css'
import intro from '../images/intro3_nathaniel.svg'
import React from 'react'

export default function Intro() {
    return (
        <div className='intro'>
            <div className='readable-width'>
                <img src={intro} alt="Nathaniel Parrott dot com: developer, designer and gamification enthusiast." />
            </div>
        </div>
    )
}
