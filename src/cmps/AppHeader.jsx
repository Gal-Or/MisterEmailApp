import { Link } from 'react-router-dom'

export function AppHeader() {


    return (
        <header className="app-header">
            <img className="gmail-logo" src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" srcSet="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png 1x, https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_2x_r5.png 2x " alt="" aria-hidden="true" role="presentation" ></img>
            {/* <input className="input-search" aria-label="Search mail" autoComplete="off" placeholder="Search mail" value=""
                type="text" dir="ltr" spellCheck="false" aria-haspopup="true" aria-live="off"
                aria-owns="gs_sbt50" aria-hidden="false">
            </input> */}
            {/* <div className="buttonIn">
                <button className='btn' id="clear">clear</button>
                <input className="input-search" type="text" id="enter" />

            </div> */}
            <section className="links-container">
                <Link to="/" className='link'>Home</Link>
                <Link to="/about" className='link'>About</Link>
                <Link to="/email" className='link'>Emails</Link>
            </section>
        </header>
    )
}

<input  ></input>


