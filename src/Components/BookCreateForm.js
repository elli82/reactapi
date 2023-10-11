import React, { useState } from 'react'


export default function BookCreateForm(props) {

    const initialFormData = Object.freeze({
        title: "book",
        author: "author",
        yearofPublication: "year",
        genre: "genre",
        available: false,
    });

    const [formData, setFormdata] = useState(initialFormData);

    const handleChange = (e) => {
        setFormdata({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const booktoAdd = {
            id: 0,
            title: formData.title,
            author: formData.author,
            yearofPublication: formData.yearofPublication,
            genre: formData.genre,
            available: formData.available
        };

        const url = 'https://localhost:7001/api/books';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booktoAdd)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

        props.onBookCreated(booktoAdd);
    }
    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Add new Book</h1>

            <div className="mt-5">
                <label className="h3 form-label">Title</label>
                <input value={formData.title} name="title" type="text" className="form-control" onChange={handleChange}></input>
            </div>
            <div className="mt-5">
                <label className="h3 form-label">Author</label>
                <input value={formData.author} name="author" type="text" className="form-control" onChange={handleChange}></input>
            </div>
            <div className="mt-5">
                <label className="h3 form-label">Year of Publication</label>
                <input value={formData.yearofPublication} name="yearofPublication" type="text" className="form-control" onChange={handleChange}></input>
            </div>
            <div className="mt-5">
                <label className="h3 form-label">Genre</label>
                <input value={formData.genre} name="genre" type="text" className="form-control" onChange={handleChange}></input>
            </div>
            <div className="mt-5">
                <label className="h3 form-label">Available</label>
                <input
                    checked={formData.available}
                    name="available"
                    type="checkbox"
                    className="form-checkbox"
                    onChange={(e) => {
                        setFormdata({
                            ...formData, available: e.target.checked,
                        });
                    }}
                />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Save</button>
            <button onClick={() => props.onBookCreated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Cancel</button>
        </form>
    )
}
