import { Request, Response } from 'express';

import { Task, TaskQuery } from 'app/models';
import { successHandler, notFoundHandler } from 'app/middlewares';
import { DataStore } from 'app/providers';

/**
 * @name createTask
 * @description creates task for user
 * @route /task
 * @method POST
 */
export const createTask = (req: any, res: Response) => {
  const assignedTo = req.body.assignedTo || req.user.userId;
  const payload = { ...req.body, assignedTo };
  const task = DataStore.insert<Task>(Task, payload);

  return res.status(200).json(successHandler(task));
};

/**
 * @name getTaskById
 * @description gets a task against task id
 * @route /task/:id
 * @method GET
 */
export const getTaskById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const task = DataStore.findById<Task>(Task, id);

  if (!task) {
    return res.status(404).json(notFoundHandler());
  }

  return res.status(200).json(successHandler(task));
};

/**
 * @name updateTask
 * @description updates a task against task id
 * @route /task/:id
 * @method PUT
 */
export const updateTask = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const task = DataStore.update<Task>(Task, id, req.body);

  if (!task) {
    return res.status(404).json(notFoundHandler());
  }

  return res.status(200).json(successHandler(task));
};

/**
 * @name deleteTask
 * @description deletes a task against task id
 * @route /task/:id
 * @method DELETE
 */
export const deleteTask = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const task = DataStore.delete<Task>(Task, id);

  if (!task) {
    return res.status(404).json(notFoundHandler());
  }

  return res.status(200).json(successHandler(task));
};

/**
 * @name getTasks
 * @description gets all task based on specified filter
 * @route /tasks?assignedTo=[username]
 * @route /tasks?category=[categoryName]
 * @param assignedTo
 * @param category
 * @method GET
 */
export const getTasks = (req: Request<any, any, any, TaskQuery>, res: Response) => {
  const { assignedTo, category, page, limit } = req.query;

  let query: TaskQuery | undefined;

  if (assignedTo) {
    query = { assignedTo };
  }

  if (category) {
    query = { ...query, category };
  }

  const tasks = DataStore.findAll<Task>(Task, query, page, limit);

  const response = { totalItemCount: DataStore.count(Task), items: tasks };

  return res.status(200).json(successHandler(response));
};