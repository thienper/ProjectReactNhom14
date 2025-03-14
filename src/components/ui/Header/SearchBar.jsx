import { Search } from 'lucide-react';
import React from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';

const SearchBar = () => {
    return (
        <Form className="ms-4">
            <InputGroup>
                <InputGroup.Text><Search size={18} /></InputGroup.Text>
                <FormControl
                    type="text"
                    placeholder="Search for shoes..."
                />
            </InputGroup>
        </Form>
    );
};

export default SearchBar;
