import React, { useState } from 'react';

export default function UpdateBook(props) {
    const initialFormData = Object.freeze({
        title: props.book.title,
        author: props.book.author,
        yearofPublication: props.book.yearofPublication,
        genre: props.book.genre,
        available: props.book.available,
    });

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const bookToUpdate = {
            id: props.book.id,
            title: formData.title,
            author: formData.author,
            yearofPublication: formData.yearofPublication,
            genre: formData.genre,
            available: formData.available,
        };

        const url = 'https://localhost:7001/api/books';
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookToUpdate),
        })
            .then((response) => response.json())
            .then((responseFromServer) => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
        props.onBookUpdated(bookToUpdate);
    };

    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Update "{props.book.title}".</h1>

            <div className="mt-5">
                <label className="h3 form-label">Title</label>
                <input
                    value={formData.title}
                    name="title"
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                />
            </div>
            <div className="mt-5">
                <label className="h3 form-label">Author</label>
                <input
                    value={formData.author}
                    name="author"
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                />
            </div>
            <div className="mt-5">
                <label className="h3 form-label">Year of Publication</label>
                <input
                    value={formData.yearofPublication}
                    name="yearofPublication"
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                />
            </div>
            <div className="mt-5">
                <label className="h3 form-label">Genre</label>
                <input
                    value={formData.genre}
                    name="genre"
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                />
            </div>
            <div className="mt-5">
                <label className="h3 form-label">Available</label>
                <input
                    checked={formData.available}
                    name="available"
                    type="checkbox"
                    className="form-checkbox"
                    onChange={(e) => {
                        setFormData({
                            ...formData, available: e.target.checked,
                        });
                    }}
                />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Save</button>
            <button onClick={() => props.onBookUpdated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Cancel</button>
        </form>
    );
}


