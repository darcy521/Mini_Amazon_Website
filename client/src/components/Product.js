import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './component.css';
import Product_Json from '../product.json';
import Container from 'react-bootstrap/Container';
import Rating from './Rating';
// import { Link } from 'react-router-dom';


export default function Product() {
  const [products, setProducts] = React.useState(Product_Json.products);


  return (
    <>
      <Container fluid className='card-container'>
        <Row>
            {products.map((product) => (
                <Col sm={6} md={4} lg={3} className='mb-3'>
                <Card style={{ width: '18rem' }}>
                <Card.Link style={{cursor:'pointer'}} href={`/product/${product.product_name}`}>
                  <Card.Img variant="top" src={ product.imageURL }/>
                </Card.Link>
                <Card.Body>
                    <Card.Title>
                        <Card.Link style={{cursor:'pointer'}} href={`/product/${product.product_name}`}>{ product.product_name }</Card.Link>
                    </Card.Title>
                    <Card.Text>{ product.description }</Card.Text>
                    <Rating rating={product.star} numReviews={product.numReviews}/>
                    <Card.Text>{ product.reviews }</Card.Text>
                    <Card.Text>${ product.price }</Card.Text>
                </Card.Body>
                {/* <Card.Body>
                    {product.quantity > 0 ? 
                    <Button href="#" variant='warning'>Add to Cart</Button>
                    :
                    <Button disabled variant='light'>Out of Stock</Button>
                    }
                </Card.Body> */}
                </Card>
                </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}
