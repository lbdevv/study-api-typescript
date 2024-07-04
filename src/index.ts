import express from 'express'
import * as diaryServices from './services/diaryServices'
import toNewDiaryEntry from './utils'

const app = express()
app.use(express.json())

const PORT = 3000   

app.get('/', (_req, res) => {
    res.send(diaryServices.getEntriesWithoutSensitiveInfo())
})

app.get('/:id', (req, res) => {
    //El + ya hace el casteo al tipo de dato esperado (esta bueno pero igual es un poco rebuscado usar un signo y no una función)
    const diary = diaryServices.findById(+req.params.id)
    return (diary != undefined)
    ? res.send(diary)
    : res.sendStatus(404)
})

app.post('/', (req, res) => {

    try
    {
        const newDiaryEntry = toNewDiaryEntry(req.body)
        const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry)
        res.json(addedDiaryEntry)
    }
    catch(error)
    {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.status(400).send("An unknown error occurred");
        }
    }

})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})