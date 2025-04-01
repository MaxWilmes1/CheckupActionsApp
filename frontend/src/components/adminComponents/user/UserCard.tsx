import {AppUser} from "../../../models/appUser/AppUser.ts";
import {useNavigate} from "react-router-dom";

type Props = {
    user: AppUser
}

export default function UserCard(props: Readonly<Props>) {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/admin/editUser/${props.user.id}`)
    }

    return (
        <div className={"card"}>
            <p>User: {props.user.username}</p>
            <p>ID: {props.user.id}</p>
            <p>Role: {props.user.role?.toLocaleLowerCase()}</p>
            <button onClick={handleClick}>edit</button>
        </div>
    );
}
