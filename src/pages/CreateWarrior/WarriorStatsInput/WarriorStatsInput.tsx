interface Props {
    name: string;
    value: number;
    sumOfPoints: number;
    changeStats: (name: string, value: number) => void;
}

export const WarriorStatsInput = (props: Props) => {

    const statsValidation = (value: number) => (value < 1 || value > 7);

    return (
        <div className="form-group col-md-2">
            <label htmlFor="power" className="col-sm-2 col-form-label">Power:</label>
            <div className="col-sm-10">
                <input required
                       value={props.value}
                       onChange={e => props.changeStats(props.name, Number(e.target.value))}
                       min="1"
                       max={props.sumOfPoints + props.value}
                       type="number"
                       name={props.name}
                       className={`form-range bg-light ${statsValidation(props.value) ? 'is-invalid' : ''}`}/>
                <div className="invalid-feedback">
                    Incorrect value
                </div>
            </div>
        </div>
    )
}