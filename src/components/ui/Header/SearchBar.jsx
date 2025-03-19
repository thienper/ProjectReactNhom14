import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { Form, FormControl, Image, InputGroup, ListGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";
import products from "../../../Data/products.json";


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
                <ListGroup className="search-results position-absolute w-100 bg-white border rounded mt-1 shadow-sm z-3" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                    {filteredProducts.slice(0, 3).map(product => (

                        <ListGroup.Item key={product.id} className="d-flex align-items-center">
                            <Link to={`/product/${product.id}`}>
                                <Image src={product.images[0]} alt={product.name} width={50} height={50} className="me-2" />
                            </Link>
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
