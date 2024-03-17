export function Icon({ path, className, clickAction }) {

    return <div className="icon-div">
        <img src={path} className={`icon-img ${className ? className : ""}`} onClick={clickAction ? clickAction : () => { console.log("no action yet.."); }} />
    </div>
}