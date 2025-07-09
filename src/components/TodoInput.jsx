import { useState } from 'react';

export function TodoInput({ onAdd }) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <div>
      <input
        id='nome-todo'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a todo"
      />
      <button id='add-button' onClick={handleAdd}>Add</button>
    </div>
  );
}
