import {Draggable} from "@hello-pangea/dnd";
import {useNavigate} from "react-router-dom";
import CardForm from "./CardForm.tsx";
import {useIsAdmin} from "../../../utils/customHooks/useIsAdmin.ts";
import {CheckupAction} from "../../../models/checkupAction/CheckupAction.ts";

type Props = {
    status: string;
    action: CheckupAction;
    index: number;
};

export default function DragableActionCard(props: Readonly<Props>) {
    const navigate = useNavigate();
    const isAdmin = useIsAdmin();

    const handleClick = (id: string) => {
        navigate("/checkup-actions/" + id);
    };

    if (!isAdmin) {
        return (
            <CardForm
                ref={null}
                action={props.action}
                status={props.status}
                isDragging={false}
                onClick={() => handleClick(props.action.id)}
            />
        );
    }

    return (
        <Draggable draggableId={props.action.id} index={props.index}>
            {(provided, snapshot) => (
                <CardForm
                    ref={provided.innerRef}
                    action={props.action}
                    status={props.status}
                    isDragging={snapshot.isDragging}
                    onClick={() => handleClick(props.action.id)}
                    style={provided.draggableProps.style}
                    dragHandleProps={{
                        ...provided.draggableProps,
                        ...provided.dragHandleProps
                    }}
                />
            )}
        </Draggable>
    );
}