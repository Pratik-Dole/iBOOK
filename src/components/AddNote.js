import React from 'react'
import { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddNote = () => {

    const context = useContext(NoteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", discription: "", tag: ""})

    const handleSubmit = (e)=>{
        e.preventDefault();
        addNote(note.title, note.discription, note.tag);
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value});
    }

    return (
        <>
            <section>
                <div className="container my-3">
                    <h1>Add Your Notes !!</h1>
                    <div className="container my-3">
                        <form className="mb-4">
                            <div className="form-group my-3">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Add Your Title Here" />
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="discription">Discription</label>
                                <input type="text" className="form-control" id="discription" name="discription" placeholder="Add Your Note Discription Here" onChange={onChange}/>
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="tag">Tag</label>
                                <input type="text" className="form-control" id="tag" placeholder="Add Your Tag Here" name="tag" onChange={onChange}/>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                            <button type="submit" className="btn btn-success" onClick={handleSubmit}>Save Now</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddNote