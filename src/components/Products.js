// src/components/Posts.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setPosts] = useState([]);

  useEffect(() => {
    // Fetch data from WordPress API when the component mounts
    axios.get('http://localhost/wp-headless/server/wp-json/wp/v2/products?_fields=acf&acf_format=standard&_fields=id,slug,title,acf')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from WordPress:', error);
      });
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  return (
    <div>
      <h2>WordPress Posts</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
             {product.acf.thumbnail && (
              <img
                src={product.acf.thumbnail}
                alt={product.title || 'Product Image'}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            )}
            <h3>{product.title?.rendered || 'No Title'}</h3>
            <p dangerouslySetInnerHTML={{ __html: product.acf.summary }} />

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
