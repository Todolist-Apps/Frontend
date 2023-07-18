const { Task } = require('../../models')


class TaskController {
    static findTask = async (req, res, next) => {
        try {
            const data = await Task.findAll();
            res.status(200).json({
                data
            });
        } catch (err) {
            next(err);
        }
    };

    static findTaskById = async (req, res, next) => {
        try{
            const {id} = req.params;
            const data = await Task.findOne({where: {id: +id}})
            res.status(200).json({data});
        } catch (err) {
            next(err);
        }
    }

    static createTask = async (req, res, next) => {
        try {
            const { title } = req.body;
            const data = await Task.create({
                title,
            });
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };

    static updateTask = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { title, is_done } = req.body;
            const task = await Task.update(
                {
                    title
                },
                {
                    where: { id: +id },
                }
            );
            res.status(200).json({ message: "Title updated successfully" });
        } catch (err) {
            next(err);
        }
    };

    static deleteTask = async (req, res, next) => {
        try {
            const { id } = req.params;
            const findtask = await Task.findOne({ where: { id: +id } });

            if (findtask) {
                const task = await Task.destroy({
                    where: { id: +id }
                });
                if (task) {
                    res.status(200).json({
                        message: "Task deleted successfully"
                    });
                }
            } else {
                next({ name: "ErrorNotFound" });
            }
        } catch (err) {
            next(err);
        }
    };
}

module.exports = TaskController;
