import { Icon } from './Icon.jsx'
import path from '../services/image-path.js'

export function MoreActions() {

    return (
        <section className="more-symbols">
            <Icon path={path.googleApps} />
            <Icon path={path.googleApps} />
            <Icon path={path.googleApps} />
        </section>
    )
}