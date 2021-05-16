import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { Button, Card, ListGroup } from 'react-bootstrap'

function RandomNumber(props) {
    if (props.lastNumber) {
        return (
            <Card bg="info" className="p-3" style={{ height: '5rem' }}>
                <h2>Número sorteado: {props.lastNumber}</h2>
            </Card>
        )
    }
    return (<Card bg="info" className="p-3" style={{ height: '5rem' }} />)
}

function RandomNumbersList(props) {

    let numbersList = []

    for (let i = 1; i < props.drawedNumbers.length && i < 6; i++) {
        numbersList[i - 1] = <ListGroup.Item variant="primary" className="m-0">{props.drawedNumbers[i]}</ListGroup.Item>
    }

    return (
        <ListGroup horizontal>
            {numbersList}
        </ListGroup>
    )
}

function Result(props) {
    const { minimumNumber, maximumNumber, canDuplicateNumbers } = (props.location && props.location.state) || {}

    const [ drawedNumbers, setDrawedNumbers ] = useState([])

    const [ isButtonDisabled, setIsButtonDisabled ] = useState(false)

    let history = useHistory()

    function changeNumberRange() {
        history.push("/")
    }

    function draw() {
        let minimum = Math.ceil(minimumNumber)
        let maximum = Math.floor(maximumNumber)

        let randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum

        console.log(canDuplicateNumbers)

        if (canDuplicateNumbers == false) {
            for (let i = 0; i < drawedNumbers.length; i++) {
                if (drawedNumbers[i] == randomNumber) {
                    randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
                    i = -1
                }
            }
        }

        setDrawedNumbers(drawedNumbers => [randomNumber, ...drawedNumbers])

        if (drawedNumbers.length == (maximumNumber - minimumNumber) && canDuplicateNumbers == false) {
            setIsButtonDisabled(true)
        }
    }

    return (
        <Card border="primary" style={{ width: '30rem', height: '40rem' }}>
            <Card.Body>
                <h3 className="d-flex justify-content-center">
                    Mínimo: {minimumNumber}<br />
                    Máximo: {maximumNumber}<br />
                    Duplicados: {canDuplicateNumbers ? "Sim" : "Não"}
                </h3>
                <Button variant="secondary" className="mt-4 mr-3" onClick={(e) => changeNumberRange(e)}>Alterar configurações</Button>
                <Button variant="primary" className="mt-4 ml-3" onClick={(e) => draw(e)} disabled={isButtonDisabled}>Gerar número aleatório</Button>
                <RandomNumber lastNumber={drawedNumbers[0]} />
                <h3>Últimos números sorteados:</h3>
                <RandomNumbersList drawedNumbers={drawedNumbers} />
            </Card.Body>
        </Card>
    )
}

export default Result