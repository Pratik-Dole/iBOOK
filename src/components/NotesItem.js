import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const NotesItem = (props) => {

    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <>
            <section>
                <div className="col-md-2">
                    <div className="card my-2">
                        <div className="card-body">
                            <h5 className="card-title">Title: {note.title}</h5>
                            <p className="card-text"><b>Disc:</b> {note.discription}</p>
                            <small className="card-text"><b>Tag:</b> {note.tag}</small>
                            <div>
                                <i className="fa-regular fa-pen-to-square my-2 mx-2" onClick={() => {
                                    return updateNote(note);
                                }}><span> edit</span></i>
                                <i className="fa-regular fa-trash-can my-2 mx-2" onClick={() => {
                                    return deleteNote(note._id);
                                }}><span> delete</span></i>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default NotesItem