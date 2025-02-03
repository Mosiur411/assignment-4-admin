import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface ITask {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  status: string;
  dueDate: string;
  priority: string;
}

export default function TaskCard({ data }: { data: ITask }) {
  const [task, ] = useState<ITask>(data);

  return (
    <div className="flex flex-col justify-center bg-slate-300 p-4">
      <div className="flex items-center border border-gray-500 justify-between p-4 bg-white shadow-md rounded-lg w-[500px]">
        <div>
          <h2 className="text-lg font-semibold text-gray-600">{task.title}</h2>
          <p className="text-sm text-gray-600">{task.description}</p>
          <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
          <p className="text-sm text-gray-600">Priority: {task.priority}</p>
          <p className={`text-sm ${task.isCompleted ? 'text-green-500' : 'text-yellow-500'}`}>
            Status: {task.status}
          </p>
        </div>
        <div className="flex space-x-4">
          <button className="text-blue-500 hover:text-blue-700">
            <FaEdit />
          </button>
          <button className="text-red-500 hover:text-red-700">
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
