import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';
import ImageGallery from './components/ImageGallery/ImageGallery';
import SearchBar from './components/SearchBar/SearchBar';
import { useCallback, useEffect, useState } from 'react';
import Loader from './components/Loader/Loader';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './components/Message/Message';

const ACCESS_KEY = '2qSa9jRyTacrbv4XlcGRoDtyhRG9A_7Ms-PpWdDY6Sg';
const PER_PAGE = 12;
const MESSAGES = {
  empty: 'Start searching for images...',
  error: 'Unfortunatelly, something went wrong...',
};

function App() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        'https://api.unsplash.com/search/photos', {
        params: {
          client_id: ACCESS_KEY,
          query: searchQuery,
          page,
          per_page: PER_PAGE,
        },
      });

      const { results, total_pages } = response.data;

      setImages(prevImages => (
        page === 1
          ? results :
          [...prevImages, ...results]
      )
      );
      setTotalPages(total_pages);
    } catch (error) {
      toast.error('Failed to fetch images', { position: 'top-right' });
    } finally {
      setLoading(false);
    }
  }, [searchQuery, page]);

  useEffect(() => {
    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery, page, fetchData]);

  const handleSearch = (value) => {
    setPage(1);
    setSearchQuery(value);
  };

  const onLoadMore = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    } else {
      toast.error('No more images to load', { position: 'top-right' });
    }
  };

  const showLoadMoreBtn = !loading
    && !!images.length
    && !!totalPages
    && page < totalPages;

  const showMessage = !images.length && !loading;

  return (
    <div className={css.App}>
      <SearchBar onSearch={handleSearch} />
      <ImageGallery
        images={images}
        onImageClick={setSelectedImage}
      />

      <Loader visible={loading} />

      {showLoadMoreBtn &&
        <LoadMoreBtn
          onClick={onLoadMore}
        />
      }

      {showMessage && (
        <ErrorMessage text={
          !searchQuery
            ? MESSAGES.empty
            : MESSAGES.error}
        />
      )}

      <Toaster />
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  )
}

export default App
