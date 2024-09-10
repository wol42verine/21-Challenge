const axios = require('axios');

const searchBooks = async (req, res) => {
  const { query } = req.params;

  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const books = response.data.items.map((item) => ({
      bookId: item.id,
      authors: item.volumeInfo.authors,
      description: item.volumeInfo.description,
      title: item.volumeInfo.title,
      image: item.volumeInfo.imageLinks?.thumbnail,
      link: item.volumeInfo.infoLink,
    }));
    return res.json(books);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching books from Google Books API' });
  }
};

module.exports = { searchBooks };