import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DreamDetail = () => {
    const { id } = useParams();
    const [dream, setDream] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/components/${id}`)
        .then(res => res.json())
        .then(data => {
            if (data.message) {
                setError(data.message);
            } else {
                setDream(data.dream);
            }
        })
        .catch(() => setError('Помилка при завантаженні'));
    }, [id]);

    if (error) return <p>{error}</p>;
    if (!dream) return <p>Завантаження...</p>;

    return (
        <div>
            <h2>{dream.title}</h2>
            <img src={dream.imageUrl} alt={dream.title} width="300" />
            <p>{dream.description}</p>
            <p><strong>Категорія:</strong> {dream.category}</p>
        </div>
    );
};

export default DreamDetail;
