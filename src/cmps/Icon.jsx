export function Icon({ path, className }) {

    return <div className="icon-div">
        <img src={path} className={`icon-img ${className ? className : ""}`} />
    </div>
}