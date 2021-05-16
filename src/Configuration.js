import React, { useState } from "react"
import { Card, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom";

function Configure() {
    const [ minimumNumber, setMinimumNumber ] = useState(0)
    const [ maximumNumber, setMaximumNumber ] = useState(0)
    const [ canDuplicateNumbers, setCanDuplicateNumbers ] = useState()

    let history = useHistory()

    function setNumberRange() {
        if (maximumNumber < minimumNumber) {
            return alert('O número máximo deve ser maior do que o mínimo!')
        }

        if (minimumNumber <= 0) {
            return alert('Apenas números maiores que 0!')
        }

        history.push({
            pathname: "/result",
            state: { minimumNumber, maximumNumber, canDuplicateNumbers }
        })
    }

    function duplicateNumbersToBoolean(value) {
        if (value == "yes") {
            setCanDuplicateNumbers(true)
        } else if (value == "no") {
            setCanDuplicateNumbers(false)
        }
    }

    return (
        <Card border="primary" style={{ width: '30rem', height: '40rem' }}>
            <Card.Body>
                <div>
                    <label for="minimumNumber">O número mínimo é {minimumNumber}</label><br />
                    <input id="minimumNumber" value={minimumNumber} type="number" onChange={event => setMinimumNumber(parseInt(event.target.value))} /><br />
                    <label for="maximumNumber">O número máximo é {maximumNumber}</label><br />
                    <input id="maximumNumber" value={maximumNumber} type="number" onChange={event => setMaximumNumber(parseInt(event.target.value))} /><br />
                    <p className="mt-3">Gerar números duplicados?</p>
                    <div onChange={(event) => duplicateNumbersToBoolean(event.target.value)}>
                        <input type="radio" id="yes" name="canDuplicateNumbers" value="yes" />
                        <label for="yes">Sim</label><br />
                        <input type="radio" id="no" name="canDuplicateNumbers" value="no" />
                        <label for="no">Não</label><br />
                    </div>
                    <Button variant="primary" type="submit" onClick={(e) => setNumberRange(e)}>Configurar</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Configure
