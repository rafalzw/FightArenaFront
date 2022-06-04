interface Props {
    name: string;
}

export const WarriorAdded = (props:Props) => (
    <div className="alert alert-success w-50">
        Successfully added warrior {props.name}
    </div>
)