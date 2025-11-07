import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/UI.jsx';
import '../styles/php-theme.css';

const seedBooks = [
  { BookID: 'B-001', BookTitle: 'Lonely Planet Australia (Travel Guide)', ISBN: '123-456-789-1', Price: 136, Author: 'Lonely Planet', Type: 'Travel', Image: '/assets/travel.jpg', Description: 'Explore Australia with this comprehensive guide.' },
  { BookID: 'B-002', BookTitle: 'Crew Resource Management, Second Edition', ISBN: '123-456-789-2', Price: 599, Author: 'Barbara Kanki', Type: 'Technical', Image: '/assets/technical.jpg', Description: 'Essential CRM for aviation teams.' },
  { BookID: 'B-003', BookTitle: 'CCNA Routing and Switching 200-125 Official Cert Guide Library', ISBN: '123-456-789-3', Price: 329, Author: 'Cisco Press', Type: 'Technology', Image: '/assets/technology.jpg', Description: 'Prepare for the CCNA exam with this definitive guide.' },
  { BookID: 'B-004', BookTitle: 'Easy Vegetarian Slow Cooker Cookbook', ISBN: '123-456-789-4', Price: 75.9, Author: 'Rockridge Press', Type: 'Food', Image: '/assets/food.jpg', Description: 'Delicious vegetarian recipes for your slow cooker.' }
];

// PUBLIC_INTERFACE
export default function BookDetail() {
  /** Book detail view consistent with PHP card/typography */
  const { bookId } = useParams();
  const navigate = useNavigate();
  const book = useMemo(() => seedBooks.find(b => b.BookID === bookId), [bookId]);

  if (!book) {
    return (
      <blockquote>
        <div className="container">
          <h2 style={{ marginTop: 0 }}>Book not found</h2>
          <Button className="button" onClick={() => navigate('/catalog')}>Back to Catalog</Button>
        </div>
      </blockquote>
    );
  }

  return (
    <blockquote>
      <div className="container">
        <h2 style={{ marginTop: 0 }}>{book.BookTitle}</h2>
        <div style={{ display: 'flex', gap: 16 }}>
          <img src={book.Image} alt={book.BookTitle} style={{ width: 240, height: 'auto' }} />
          <div style={{ flex: 1 }}>
            <p><b>ISBN:</b> {book.ISBN}</p>
            <p><b>Author:</b> {book.Author}</p>
            <p><b>Type:</b> {book.Type}</p>
            <p><b>Price:</b> RM{book.Price}</p>
            <p>{book.Description}</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <Button className="button" onClick={() => alert('Add to Cart (stub)')}>Add to Cart</Button>
              <Button className="cbtn" onClick={() => navigate('/catalog')}>Back to Catalog</Button>
            </div>
          </div>
        </div>
      </div>
    </blockquote>
  );
}
