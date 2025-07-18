import { useEffect, useState } from 'react';
import { todoModel } from '../models/todoModel';

export function useTodoController() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const { data } = await todoModel.getAll(); // Extrai o data da resposta JSON automaticamente
    setTodos(data);
  };

  const addTodo = async (title) => {
    const { data } = await todoModel.create(title);
    setTodos((prev) => [...prev, data]);
    // copia todos os itens do array anterior para um novo array + adiciona nova tarefa ao array
  };

  const deleteTodo = async (id) => {
    await todoModel.remove(id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Quando a View for carregada, buscar os dados
  useEffect(() => {
    fetchTodos();
  }, []);

  
  return { todos, addTodo, deleteTodo };
}
