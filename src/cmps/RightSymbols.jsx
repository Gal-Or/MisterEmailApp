import path from '../services/image-path.js'
import { Icon } from './Icon.jsx'

export function RightSymbols() {

    return (
        <section className='right-symbols'>
            <div className='user-symbol'>
                <Icon path={path.userLetter} className='user-letter-icon' />
            </div>
            <div className='mid-symbols'>
                <Icon path={path.calendar} />
                <Icon path={path.keep} />
                <Icon path={path.contacts} />
            </div>


        </section>

    )

}