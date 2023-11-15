import React, { useState } from 'react';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { Link, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { Helmet } from "react-helmet";
import Rating from '../components/Rating';
import Button from 'react-bootstrap/Button';
import Card  from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import Product_Json from '../product.json';

export default function ProductDetail() {
  
  const [selectedImage, setSelectedImage] = useState('');
  const [product, setProduct] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  var loadingCreateReview = true;
  let userInfo = 'test';

  const status = {
    loading: false,
    error: ''
  }

  // const params = useParams();
  // const { slug } = params; 

  // useEffect(() => {
  //   const fetchData = async () => {
  //     dispatch({ type: 'FETCH_REQUEST' });
  //     try {
  //       const result = await axios.get(`/api/products/slug/${slug}`);
  //       dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
  //     } catch (err) {
  //       dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
  //     }
  //   };
  //   fetchData();
  // }, [slug]);

  const addToCartHandler = async() => {

  }

  const submitHandler = async() => {

  }


  return (
      status.loading ? 
      (
        <Loading />
      ) : status.error ? (
      <Message variant="danger">{ status.error }</Message>
      ) : 
    <>
      <div className='product-detail-container'>
        {/* left picture */}
        <Row>
          <Col md={6}>
            <img src={selectedImage || product.imageURL} alt={product.name} />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <h1>{product.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                Price : ${product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                <Row xs={1} md={2} className='g-2'>
                  {[product.imageURL, ...product.images].map((x) => (
                    <Col>
                      <Card>
                        <Button
                          className="thumbnail"
                          type="button"
                          variant='light'
                          onClick={() => setSelectedImage(x)}
                        >
                          <Card.Img variant="top" src={x} alt="product" />
                        </Button>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                Description:
                <p>{product.description}</p>
              </ListGroup.Item>
              <Card>
                <Card.Body>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price: </Col>
                        <Col>{product.price}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>status: </Col>
                        <Col>
                          {product.quantity > 0 ? 
                            (<Badge bg='success'>In Stock</Badge>) 
                            : 
                            (<Badge bg='danger'>Unavailable</Badge>)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {product.quantity > 0 ?
                        (<Button variant='warning' onClick={addToCartHandler}>
                          Add to Cart
                         </Button>)
                        :
                        (<Button variant='light' disabled>Out of Stock</Button>)}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </ListGroup>
          </Col>
        </Row>
        <div className='my-3'>
          <h2>Reviews</h2>
          <div className='mb-3'>
            {product.reviews.length === 0 && (
              <Message>There is no review</Message>
            )}
          </div>
          <ListGroup>
            {product.reviews.map((review) => (
              <ListGroup.Item key={review.id}>
                <strong>{review.name}</strong>
                <Rating rating={review.rating} caption=" "></Rating>
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className='my-3'>
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <h2>Write a customer review</h2>
                <Form.Group className="mb-3" controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Select
                    aria-label="Rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value=''>Select...</option>
                    <option value={1}>1- Poor</option>
                    <option value={2}>2- Fair</option>
                    <option value={3}>3- Good</option>
                    <option value={4}>4- Very Good</option>
                    <option value={5}>5- Excellent</option>
                  </Form.Select>
                </Form.Group>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Comments"
                  className="mb-3"
                >
                  <Form.Control
                    as={"textarea"}
                    placeholder="Leave a comment here"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)} 
                  />
                </FloatingLabel>

                <div className='mb-3'>
                  <Button disabled={loadingCreateReview} type='submit'>
                    Submit
                  </Button>
                  {loadingCreateReview && <Loading />}
                </div>
              </form>
            ) : (
              <Message>
                Please{''}
                <Link to={'/signin?redirect=/product/${product.id}'}>
                  Sign In
                </Link>
                to write a review
              </Message>
              )}
          </div>
        </div>
      </div>
    </>
  )
}
