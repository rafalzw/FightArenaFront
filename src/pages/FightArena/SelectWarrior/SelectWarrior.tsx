import {WarriorEntity} from "types";

export const SelectWarrior = (props: WarriorEntity) => (
    <option value={props.id}>
        {props.name}
        🗡️ {props.power}
        🛡 {props.defence}
        💪 {props.endurance}
        🖐️ {props.agility}
    </option>
)