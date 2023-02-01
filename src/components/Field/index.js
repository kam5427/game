import { useState } from "react";
import "./styles.css";

const initialField = Array(9).fill(null)

function Field() {
    const [field, setField] = useState(initialField);
    const [xIsNext, setXIsNext] = useState(true);
    const handleCellClick = (index) => {
        const newField = [...field];
        if (newField[index] === null) {
            newField[index] = xIsNext ? 'X' : 'O';
            setField(newField);
            setXIsNext(!xIsNext)
        }
    };

    return (
        <div>

        <div className="field">

            {field.map((cell, index) => (
                <button
                    onClick={() => {
                        handleCellClick(index);
                    }}
                    className="cell"
                >
                    {cell}
                </button>
            ))}
        </div>
            <div className="resetBlock">
                <button className="resetButton">Restart</button>
            </div>

        </div>
    );
}

export default Field;
