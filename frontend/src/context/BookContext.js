import {createContext, useState, useContext, Children} from 'react';
import axios from 'axios';

const BookContext = createContext();
export const useBookContext = useContext(BookContext);

export const BookProvider = ({Children}) =>{
    const[book, setbooks] = useState([]);

    const fetchBooks = async () =>{
        try{
            const token = localStorage.getItem('token');
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/books`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            setbooks(response.data);

        }catch(err){
            console.log('error fetching books', err.message);
        } 
    };

    const addBook = async (book) =>{
        try{
                const token = localStorage.getItem('token');
                const response = await axios.put(`${process.env.REACT_APP_API_URL}/books`,book, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                });
                setbooks((prevBook)=>{
                    if(Array.isArray(prevBook)){
                        return [...prevBook, response.data];
                    }else{
                        return [response.data];
                    }
                });
        }catch(err){
            console.log('error adding book', err.message);
        }
    };
    return(
        <BookContext.Provider value={{book, fetchBooks, addBook}}>
            {Children}
        </BookContext.Provider>
    );


};