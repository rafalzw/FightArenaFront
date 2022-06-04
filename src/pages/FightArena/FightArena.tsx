import {FormEvent, useEffect, useState} from "react";
import {SelectWarrior} from "./SelectWarrior/SelectWarrior";
import {WarriorEntity} from "types";
import {FightDetails} from "./FightDetails/FightDetails";

interface Result {
    fightDetails: string[];
    war1: WarriorEntity;
    war2: WarriorEntity;
}

export function FightArena() {
    const [data, setData] = useState<WarriorEntity[]>([]);
    const [warrior1, setWarrior1] = useState<string>('1');
    const [warrior2, setWarrior2] = useState<string>('2');
    const [result, setResult] = useState<Result>();

    useEffect(() => {
        (async () => {
            const res = await fetch("http://localhost:3001/fight-arena")
            const data = await res.json()
            setData(data);
        })()
    }, []);

    const submit = async (e: FormEvent) => {
        e.preventDefault();

        const res = await fetch("http://localhost:3001/fight-arena/fight", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({warrior1, warrior2})
        });

        const content = await res.json();
        setResult({
            fightDetails: content.fightDetails,
            war1: content.warrior1,
            war2: content.warrior2
        });
    }

    const warriorsList = [...data].map(el => (
        <SelectWarrior
            key={String(el.id)}
            id={String(el.id)}
            name={el.name}
            power={el.power}
            defence={el.defence}
            endurance={el.endurance}
            agility={el.agility}
        />
    ))

    if (result) {
        return <FightDetails
            fightDetails={result.fightDetails}
            warrior1={result.war1}
            warrior2={result.war2}
        />
    }

    return (
        <div className="container text-light">
            <h2 className="mb-5">Select Warriors</h2>
            <form className="row g-3" onSubmit={submit}>
                <div className="container d-flex justify-content-evenly">
                    <select
                        className="form-select w-25"
                        name="warrior1"
                        onChange={e => setWarrior1(e.target.value)}>
                        <option value='1'>Select Warrior 1</option>
                        {warriorsList}
                    </select>
                    <div className="p-2">VS</div>
                    <select
                        className="form-select w-25"
                        name="warrior2"
                        onChange={e => setWarrior2(e.target.value)}>
                        <option value='2'>Select Warrior 2</option>
                        {warriorsList}
                    </select>
                </div>
                <div className="w-100 d-flex flex-column align-items-center justify-content-center mt-5">
                    <button
                        type="submit"
                        className="btn btn-danger px-5 btn-lg w-25 mb-2"
                        disabled={warrior1 === warrior2 || warrior1 === '1' || warrior2 === '2'}
                    >Begin the fight!
                    </button>
                    {warrior1 === warrior2 &&
                        <div className="alert alert-danger w-25">Choose two different warriors!</div>}
                </div>
            </form>
        </div>
    )
}