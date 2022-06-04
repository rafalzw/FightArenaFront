interface Props {
    index: number;
    name: string;
    wins: number;
}

export const Records = (props: Props) => (
    <tr>
        <th scope="row">{props.index + 1}</th>
        <td>{props.name}</td>
        <td>{props.wins}</td>
    </tr>
)