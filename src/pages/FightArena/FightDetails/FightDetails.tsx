import {WarriorProfile} from "./WarriorProfile/WarriorProfile";
import {WarriorEntity} from "types";

interface Props {
    fightDetails: string[];
    warrior1: WarriorEntity;
    warrior2: WarriorEntity;
}

export const FightDetails = (props: Props) => {
    const result = props.fightDetails.map(el => (
        <tr>
            <th className="fw-normal" scope="row">{el}</th>
        </tr>
    ));

    return (
        <div className="container text-light">
            <h2 className="text-center">Flow of the fight</h2>
            <div className="d-flex justify-content-evenly mt-4">
                <WarriorProfile
                    name={props.warrior1.name}
                    power={props.warrior1.power}
                    defence={props.warrior1.defence}
                    endurance={props.warrior1.endurance}
                    agility={props.warrior1.agility}
                />

                <table className="table table-dark table-striped table-bordered w-50 opacity-75">
                    <tbody>
                    {result}
                    </tbody>
                </table>

                <WarriorProfile
                    name={props.warrior2.name}
                    power={props.warrior2.power}
                    defence={props.warrior2.defence}
                    endurance={props.warrior2.endurance}
                    agility={props.warrior2.agility}
                />
            </div>
        </div>
    )
}