import React, {FormEvent, useEffect, useState} from "react";
import {WarriorStatsInput} from "./WarriorStatsInput/WarriorStatsInput";
import {WarriorNameInput} from "./WarriorNameInput/WarriorNameInput";
import {WarriorEntity} from "types";
import {WarriorAdded} from "./WarriorAdded/WarriorAdded";

export const CreateWarrior = () => {
    const [form, setForm] = useState<WarriorEntity>({
        name: '',
        power: 1,
        defence: 1,
        endurance: 1,
        agility: 1,
    });
    const [sumOfPoints, setSumOfPoints] = useState<number>(6);
    const [added, setAdded] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const totalPoints = ([...stats]: number[]) => stats.reduce((prev, curr) => prev - curr, 10);

    const changeInput = (item: string, value: number | string) =>  (setForm({...form, [item]: value}));

    const submit = async (e: FormEvent) => {
        e.preventDefault();

        const res = await fetch("http://localhost:3001/create-warrior", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(form)
        });

        if ([400, 500].includes(res.status)) {
            const error = await res.json();
            setError(`Error occurred: ${error}`);
            return;
        }
        setAdded(true);
    }

    useEffect(() => {
        setSumOfPoints(totalPoints([form.power, form.defence, form.agility, form.endurance])
        );
        return
    }, [form.power, form.defence, form.agility, form.endurance]);

    if(added) {
        return <WarriorAdded name={form.name} />
    }

    return (
        <div className="container text-light">
            <h2>Add new Warrior:</h2>
            <form className="row g-3" onSubmit={submit}>

                <WarriorNameInput
                    name={'name'}
                    value={form.name}
                    changeName={changeInput}/>

                <div className="form-group col-md-12">
                    <p>Total stats points to
                        use: {sumOfPoints < 0 || sumOfPoints > 6 ? 'enter correct values!' : sumOfPoints}</p>
                </div>

                <WarriorStatsInput
                    name={'power'}
                    value={form.power}
                    sumOfPoints={sumOfPoints}
                    changeStats={changeInput}/>

                <WarriorStatsInput
                    name={'defence'}
                    value={form.defence}
                    sumOfPoints={sumOfPoints}
                    changeStats={changeInput}/>

                <WarriorStatsInput
                    name={'endurance'}
                    value={form.endurance}
                    sumOfPoints={sumOfPoints}
                    changeStats={changeInput}/>

                <WarriorStatsInput
                    name={'agility'}
                    value={form.agility}
                    sumOfPoints={sumOfPoints}
                    changeStats={changeInput}/>

                <div className="mt-5">
                    <button type="submit" className="btn btn-danger px-5">Create</button>
                </div>
            </form>
            {error ? (
                <div className="alert alert-danger mt-3 w-50">{error}</div>
            ) : null}
        </div>
    )
}