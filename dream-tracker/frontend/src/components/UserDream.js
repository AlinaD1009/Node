import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserDream = () => {
    const { uid } = useParams();
    const [dreams, setDreams] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/components/user/${uid}`)
        .then(res => res.json())
        .then(data => {
            if (data.message) {
                setError(data.message);
            } else {
                setDreams(data.dreams);
            }
        })
        .catch(() => setError('Помилка при завантаженні'));
    }, [uid]);

    if (error) return <p>{error}</p>;
    if (!dreams || dreams.length === 0) return <p>Завантаження...</p>;

    return (
        <div>
        <h2>Мрії користувача</h2>
        {dreams.map(dream => (
            <div key={dream.id} style={{ border: '1px solid #ccc', marginBottom: '1em', padding: '1em' }}>
                <h3>{dream.title}</h3>
                <img src={dream.imageUrl} alt={dream.title} width="200" />
                <p>{dream.description}</p>
                <p><strong>Категорія:</strong> {dream.category}</p>
            </div>
        ))}
        </div>
    );
};

export default UserDream;
