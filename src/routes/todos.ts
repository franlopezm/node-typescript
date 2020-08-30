import { Router } from 'express'
import { Todo } from '../models/todo'

type RequestBody = { text: string }
type RequestParams = { todoId: string }

const todos: Todo[] = []

const router = Router()

router.get('/', (req, res, next) => {
    res.status(200).json({ todos })
})

router.post('/todo', (req, res, next) => {
    const body = req.body as RequestBody

    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text
    }


    todos.push(newTodo)

    res.status(200).json({ message: 'Added todo', todos, todo: newTodo })
})

router.put('/todo/:todoId', (req, res, next) => {
    const body = req.body as RequestBody
    const params = req.params as RequestParams

    const index = todos.findIndex(elem => elem.id === params.todoId)

    if (index >= 0) {
        todos[index].text = body.text

        return res.status(200).json({ message: 'update', todos })
    }

    res.status(404).json({ message: 'Invalid id.' })
})

router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParams

    const index = todos.findIndex(elem => elem.id === params.todoId)

    if (index >= 0) {
        todos.splice(index, 1)
    }

    res.status(200).json({ message: 'Delete todo', todos })
})

export default router