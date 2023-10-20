import React, { useEffect, useRef, useState } from 'react'
import NotesItem from './NotesItem';
import AddNote from './AddNote'
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
const Notes = () => {

    const context = useContext(NoteContext);
    const { notes, getNote } = context;
    useEffect(() => {
        getNote()
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({etitle: currentNote.title, ediscription: currentNote.discription, etag: currentNote.tag})
    }

    const ref = useRef(null)

    // Handling OnChange & OnClick Events ::
    const [note, setNote] = useState({etitle: "", ediscription: "", etag: ""})

    const handleSubmit = (e)=>{
        e.preventDefault();
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value});
    }


    return (
        <>
            <AddNote />
            <section>
                <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className="mb-4">
                                    <div className="form-group my-3">
                                        <label htmlFor="etitle">Title</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" placeholder="Add Your Title Here" onChange={onChange} value={note.etitle}/>
                                    </div>
                                    <div className="form-group my-3">
                                        <label htmlFor="ediscription">Discription</label>
                                        <input type="text" className="form-control" id="ediscription" name="ediscription" placeholder="Add Your Note Discription Here" onChange={onChange} value={note.ediscription}/>
                                    </div>
                                    <div className="form-group my-3">
                                        <label htmlFor="etag">Tag</label>
                                        <input type="text" className="form-control" id="etag" placeholder="Add Your Tag Here" name="etag" onChange={onChange} value={note.etag}/>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-success" onClick={handleSubmit}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container my-5">
                <h3>Your Notes ::</h3>
                {notes.map((note) => {
                    return <NotesItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes