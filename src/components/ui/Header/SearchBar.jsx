import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { Form, FormControl, InputGroup, ListGroup, Image } from 'react-bootstrap';

const products = [
    { id: 1, name: 'Nike Air Force 1', price: '$90', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' },
    { id: 2, name: 'Ultraboost 22', price: '$180', image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
    { id: 4, name: 'Chuck Taylor All Star', price: '$60', image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1121&q=80' },
    { id: 5, name: 'Old Skool', price: '$65', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=698&q=80' },
    { id: 6, name: 'Fresh Foam 1080v11', price: '$150', image: 'https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' },
    { id: 7, name: 'Gel-Kayano 28', price: '$160', image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80' },
    { id: 8, name: 'Speedcross 5', price: '$130', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80' },
    { id: 9, name: 'Suede Classic XXI', price: '$70', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80' },
    { id: 10, name: 'Stan Smith', price: '$85', image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2112&q=80' },
    { id: 11, name: 'Air Jordan 1 Retro High OG', price: '$170', image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80' },
    { id: 12, name: 'Slip-Ons', price: '$50', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }
];

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="search-bar position-relative">
            <Form>
                <InputGroup>
                    <InputGroup.Text><Search size={18} /></InputGroup.Text>
                    <FormControl
                        type="text"
                        placeholder="Search for shoes..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </InputGroup>
            </Form>

            {searchTerm && (
                <ListGroup className="search-results position-absolute w-100 bg-white border rounded mt-1 shadow-sm z-10" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                    {filteredProducts.slice(0, 3).map(product => (
                        <ListGroup.Item key={product.id} className="d-flex align-items-center">
                            <Image src={product.image} alt={product.name} width={50} height={50} className="me-2" />
                            <div>
                                <div><strong>{product.name}</strong></div>
                                <div className="text-muted">{product.price}</div>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default SearchBar;
