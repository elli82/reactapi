// import React, { useState } from 'react';

// export default function BookCreateForm(props) {
//     const initialFormData = {
//         title: "book",
//         author: "author",
//         yearofPublication: "year",
//         genre: "genre",
//         available: "false"
//     };

//     const [formData, setFormData] = useState(initialFormData);

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const bookToAdd = {
//             id: 0,
//             title: formData.title,
//             author: formData.author,
//             yearofPublication: formData.yearofPublication,
//             genre: formData.genre,
//             available: formData.available
//         };

//         const url = 'https://localhost:7001/api/books';
//         fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(bookToAdd),
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then((responseFromServer) => {
//                 console.log(responseFromServer)
//                 if (responseFromServer.isSuccess) {
                    
//                     props.onBookCreated(responseFromServer.result);
                    
//                 } else {
//                     console.error('API error:', responseFromServer.errorMessages);
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//                 alert(error);
//             });
//     };

//     return (
//         <div>
//             <form className="w-100 px-5">
//                 <h1 className="mt-5">Add new Book</h1>

//                 <div className="mt-5">
//                     <label className="h3 form-label">Title</label>
//                     <input value={FormData.title} name="title" type="text" className="form-control" onChange={handleChange}></input>
//                 </div>
//                 <div className="mt-5">
//                     <label className="h3 form-label">Author</label>
//                     <input value={FormData.author} name="author" type="text" className="form-control" onChange={handleChange}></input>
//                 </div>
//                 <div className="mt-5">
//                     <label className="h3 form-label">Year of Publication</label>
//                     <input value={FormData.yearofPublication} name="yearofPublication" type="text" className="form-control" onChange={handleChange}></input>
//                 </div>
//                 <div className="mt-5">
//                     <label className="h3 form-label">Genre</label>
//                     <input value={FormData.genre} name="genre" type="text" className="form-control" onChange={handleChange}></input>
//                 </div>
//                 <div className="mt-5">
//                     <label className="h3 form-label">Available</label>
//                     <input value={FormData.available} name="available" type="text" className="form-control" onChange={handleChange}></input>
//                 </div>

//                 <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Save</button>
//                 <button onClick={() => props.onBookCreated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Cancel</button>
//             </form>
//         </div>
//     );
// }


