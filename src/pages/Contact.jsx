import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';

const Contact = () => {
    return (
        <Container className="my-5 shadow p-4 bg-white rounded">
            <h2 className="mb-4">Contact Us</h2>
            <p>We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.</p>

            <Form className="mt-4">
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={4} placeholder="Write your message here" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Send Message
                </Button>
            </Form>
        </Container>
    );
};

export default Contact;
