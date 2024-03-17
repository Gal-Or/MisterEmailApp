import { Icon } from "./Icon";
import path from "../services/image-path.js"
import { useNavigate } from "react-router";

export function EmailDetailsActions() {
    const navigate = useNavigate()

    return (
        <section className="email-details-actions">
            <Icon path={path.back} className="back-icon" clickAction={() => { navigate(-1) }} />
        </section>
    )
}