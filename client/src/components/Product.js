import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './component.css';
import Container from 'react-bootstrap/Container';
import Rating from './Rating';
import Category from './Category';


export default function Product() {
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    // get product information
    fetch('http://localhost:3001/product')
    .then(response => {
      return response.json();
    })
    .then(products => {
      console.log('Products Data: ', products);
      setProducts(products.data);
    });
  }, []);

  return (
    <>
      <Container fluid className='card-container'>
        <Category />
        <Row>
            {products.map((product) => (
                <Col sm={6} md={4} lg={3} className='mb-3' key={products._id}>
                <Card style={{ width: '18rem' }}>
                <Card.Link style={{cursor:'pointer'}} href={`/productdetail/${product.product_id}`}>
                  <Card.Img variant="top" src={ product.imageURL }/>
                </Card.Link>
                <Card.Body>
                    <Card.Title>
                        <Card.Link style={{cursor:'pointer'}} href={`/productdetail/${product.product_id}`}>{ product.product_name }</Card.Link>
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
