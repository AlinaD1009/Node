import React, { useEffect, useState } from 'react';

export function UserList() {
    const [users, setUsers] = useState(null);
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/users')
        .then(res => res.json())
        .then(setUsers)
        .catch(() => setError('Помилка завантаження'));
    }, []);

    const handleAdd = () => {
        setError(null);
        if (!name.trim()) {
            setError('Ім’я не може бути порожнім');
            return;
        }
        fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        })
        .then(res => {
            if (!res.ok) throw new Error('Помилка при додаванні');
            return res.json();
        })
        .then(newUser => {
            setUsers(prev => [...prev, newUser]);
            setName('');
        })
        .catch(() => setError('Помилка при додаванні'));
    };

    if (users === null) return <div>Завантаження...</div>;

    return (
        <div>
            {error && <div role="alert">{error}</div>}
            <ul>
                {users.map(u => (
                <li key={u.id}>ID: {u.id} - {u.name}</li>
                ))}
            </ul>
            <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ім'я"
                aria-label="name-input"
            />
            <button onClick={handleAdd}>Додати</button>
        </div>
    );
}
