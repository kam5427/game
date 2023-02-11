import { useEffect, useState } from "react";
import "./styles.css";

const initialField = Array(9).fill(null);

function Field() {
    const [field, setField] = useState(initialField);
    const [finished, setFinished] = useState(false);
    const [xIsNext, setXIsNext] = useState(true);

    useEffect(() => {
        if (field.filter((cell) => cell === null).length <= 4) {
            const winVariants = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            for (let i = 0; i < winVariants.length; i++) {
                if (
                    field[winVariants[i][0]] !== null &&
                    field[winVariants[i][0]] === field[winVariants[i][1]] &&
                    field[winVariants[i][0]] === field[winVariants[i][2]]
                ) {
                    console.log(`Победили ${field[winVariants[i][0]]}`);
                    setFinished(true);
                    return;
                }
            }

            if (!field.includes(null)) {
                console.log("Ничья");
                setFinished(true);
                return;
            }
        }

        // Тут ставить O с помощью бота
    }, [field]);

    const handleCellClick = (index) => {
        if (field[index] === null) {
            const newField = [...field];
            // newField[index] = xIsNext ? "X" : "O";
            newField[index] = "X";

            let botIndex = index;
            while (newField[botIndex] !== null) {
                botIndex = Math.floor(Math.random() * 8);
            }
            newField[botIndex] = "O";
            setField(newField);
            setXIsNext(!xIsNext);
        }
    };

    const restartClick = () => {
        setField(initialField);
        setXIsNext(true);
        setFinished(false);
    };

    return (
        <div className="container">
            /* Тут писать, кто победил */
            <p className="who-plays">Ходит {xIsNext ? "X" : "O"}</p>
            <div className="field">
                {field.map((cell, index) => (
                    <button
                        onClick={() => {
                            handleCellClick(index);
                        }}
                        className="cell"
                        disabled={finished}
                    >
                        {cell}
                    </button>
                ))}
            </div>
            <div className="resetBlock">
                <button
                    onClick={() => {
                        restartClick();
                    }}
                    className="restartButton"
                >
                    Restart
                </button>
            </div>
        </div>
    );
}

export default Field;
