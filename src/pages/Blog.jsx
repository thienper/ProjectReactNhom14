import React from 'react';
import { Container } from 'react-bootstrap';

const Blog = () => {
    return (
        <Container className="my-5 shadow p-4 bg-white rounded">
            <h2 className="mb-4">Our Blog</h2>
            <p>
                Welcome to our blog! Stay tuned for the latest news, fashion trends, and style tips.
            </p>
            <hr />
            <div className="mt-4">
                <h4>Blog Post Title 1</h4>
                <p className="text-muted">Published on March 14, 2025</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel purus at quam sagittis accumsan.
                </p>
            </div>
            <div className="mt-4">
                <h4>Blog Post Title 2</h4>
                <p className="text-muted">Published on March 10, 2025</p>
                <p>
                    Curabitur blandit tempus porttitor. Integer posuere erat a ante venenatis dapibus.
                </p>
            </div>
        </Container>
    );
};

export default Blog;
