const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require('path');

const booksPath = path.join(__dirname, "books.json")

const getAll = async ()=>{
    const data = await fs.readFile(booksPath)
    return JSON.parse(data)
};

const getById = async (id)=>{
    const books = getAll();
    const result = books.find(item => item.id === id);
    return result || null;
};

const add = async (data)=>{
    const books = getAll();
    const newBook = {
        id: nanoid(),
        ...data,
    }
    books.push(newBook);
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
    return newBook;
};

const updateById = async (id)=>{
    const books = getAll();
    const index = books.findIndex(item => item.id === id);
    if(index === -1){
        return null
    }
    books[index] = {id, ...data}
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
    return books[index];
};

const deleteById = async (id)=>{
    const books = getAll();
    const index = books.findIndex(item => item.id === id)
    if(index === -1){
        return null
    }
    const [result] = books.splice(index, 1)
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2))
    return result
}

module.exports={
    getAll,
    getById,
    add,
    updateById,
    deleteById
}

