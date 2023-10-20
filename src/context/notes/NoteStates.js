import React from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{

    // Creating A Host As ::
    const host = "http://localhost:5000"
    // HardCoding The Notes For Now Only :: 
    const initialNotes = []   
    // Using UseState For Setting The Notes :: 
    const [notes, setNotes] = useState(initialNotes)

    // Create A Function For Getting Notes ::
    const getNote = async ()=>{
            
        // Now We Can Hit The API Calls ::
        const response = await fetch(`${host}/notes/fetchNotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyZWE4NWI0OWVlZWQyZmQ3MzI3YTlhIn0sImlhdCI6MTY5NzU1NjU3MX0.pJKBkPHG1R6rhHofBYLcDOXPMkrPB-uM11x0bbpEeh8'
            }
        });
        const json = await response.json();
        console.log(json);  
        setNotes(json);
    }

    // Create A Function For Adding Notes ::
        const addNote = async (title, discription, tag)=>{
            
            // Now We Can Hit The API Calls ::
            const response = await fetch(`${host}/notes/addNotes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyZWE4NWI0OWVlZWQyZmQ3MzI3YTlhIn0sImlhdCI6MTY5NzU1NjU3MX0.pJKBkPHG1R6rhHofBYLcDOXPMkrPB-uM11x0bbpEeh8'
                },
                body: JSON.stringify({title, discription, tag})
            });
            const result = response.json();
            console.log(result);

            const note = {
                "_id": "65323075cc9646c79858c661",
                "user": "652ea85b49eeed2fd7327a9a",
                "title": title,
                "discription": discription,
                "tag": tag,
                "date": "2023-10-20T07:47:01.083Z",
                "__v": 0
            };

            setNotes(notes.concat(note))
        }

    // Create A Function For Editing Notes ::
        const editNote = async (id, title, discription, tag)=>{

            // Now We Can Hit The API Calls ::
            const response = await fetch(`${host}/notes/updateNotes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyZWE4NWI0OWVlZWQyZmQ3MzI3YTlhIn0sImlhdCI6MTY5NzU1NjU3MX0.pJKBkPHG1R6rhHofBYLcDOXPMkrPB-uM11x0bbpEeh8'
                },
                body: JSON.stringify({title, discription, tag})
            });
            const json = response.json();
            console.log(json);

            // Edit Logic For User ::
            for (let index = 0; index < notes.length; index++) {
                const element = notes[index];
                
                if(element._id === id){
                    element.title = title;
                    element.discription = discription; 
                    element.tag = tag;
                }
            }

        }

    // Create A Function For Deleting Notes ::
        const deleteNote = async(id)=>{

            // Now We Can Hit The API Calls ::
            const response = await fetch(`${host}/notes/deleteNotes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyZWE4NWI0OWVlZWQyZmQ3MzI3YTlhIn0sImlhdCI6MTY5NzU1NjU3MX0.pJKBkPHG1R6rhHofBYLcDOXPMkrPB-uM11x0bbpEeh8'
                },
            });
            const json = response.json();
            console.log(json);

            // Logic For Delete The Notes ::
            const delNote = notes.filter((note)=>{
                return note._id !== id
            })
            setNotes(delNote)
        }

    return(
        <>
        <NoteContext.Provider value={{notes, getNote, addNote, editNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
        </>
    )
}

export default NoteState;