import { Icon } from "./Icon";
import path from "../services/image-path.js"
import { useNavigate } from "react-router";

export function ListActions() {
    const navigate = useNavigate()

    return (
        <section className="list-actions">
            <Icon path={path.back} clickAction={() => { navigate(-1) }} />

        </section>
    )
}