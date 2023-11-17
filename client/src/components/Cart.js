import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus, faSquarePlus, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import Button from 'react-bootstrap/Button';
import './component.css';
import Message from './Message';
import { Link, useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

export default function Cart() {
//   const navigate = useNavigate();

  const cartItems = [
    {
        id:1,
        name: 'cart1',
        image: './images/dress1.jpg',
        price: '30',
        quantity: 5,
        stock: 10
    },
    {
        id:2,
        name: 'cart2',
        image: './images/dress2.jpg',
        price: '40',
        quantity: 1,
        stock: 2
    },
    {
        id:3,
        name: 'cart3',
        image: './images/dress3.jpg',
        price: '50',
        quantity: 2,
        stock: 3
    }
  ];

  const updateItemHandler = async(item, quantity) => {
    // const { data } = await axios.get();
    // if (data.stock < quantity) {
    //     window.alert('This product only have '+ data.stock + ' left');
    //     return;
    // }

  }

  const deleteItemHandler = () => {

  }

  const proceedToCheckoutHandler = () => {
    // navigate('./signin?redirect=/shipping');
  }

  return (
    <>
      <div className='cart-container'>
        <h2>Shopping Cart</h2>
        <Row>
            <Col md={8}>
              {cartItems.length === 0 ? (
                <Message>
                    Cart is empty. <Link to="/">Go Shopping</Link>
                </Message>
              ) : (
              <ListGroup>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.id}>
                    <Row className='align-items-center'>
                      <Col md={3}>
                        <img src={item.image} alt={item.name} className='img-fluid rounded img-thumbnail cart-img'/>
                      </Col>
                      <Col>
                        <Row className='cart-info-name'>
                            <div>{item.name}</div>
                        </Row>
                        <Row className='cart-info-operation'>
                        <Col>
                        <Button variant='light' className='edit-button' onClick={updateItemHandler(item, item.quantity - 1)} disabled={cartItems.quantity === 1}>
                          <FontAwesomeIcon icon={faSquareMinus} size="lg"/>
                        </Button>
                        <span>&nbsp;{item.quantity}&nbsp;</span>
                        <Button variant='light' className='edit-button' onClick={updateItemHandler(item, item.quantity + 1)} disabled={cartItems.quantity >= item.stock}>
                          <FontAwesomeIcon icon={faSquarePlus} size='lg'/>
                        </Button>
                        </Col>
                        <Col> $ {item.price}</Col>
                        <Col>
                        <Button variant='light' className='edit-button' onClick={deleteItemHandler()}>
                          <FontAwesomeIcon icon={faTrashCan} size='lg'/>
                        </Button>
                        </Col>
                        </Row>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup> 
            )}
            </Col>
            <Col md={4}>
                <Card>
                    <Card.Body>
                        <ListGroup  variant='flush'>
                            <ListGroup.Item>
                                <h3>
                                    Subtotal ({cartItems.reduce((num, currentItem) => num + currentItem.quantity, 0)}{' '}items): 
                                </h3>
                            </ListGroup.Item>
                                {cartItems.map((item) => (
                                    <div className='subtotal-price-detail'>
                                        {item.name}
                                    <span>$ {item.price * item.quantity}</span>
                                    </div>
                                ))}
                            <ListGroup.Item className='cart-total'>
                                <span>total: &nbsp;</span>
                                $ {cartItems.reduce((sum, currentItem) => sum + currentItem.price * currentItem.quantity, 0)}
                            </ListGroup.Item>
                            <ListGroup.Item className='cart-checkout-button'>
                                <Button onClick={proceedToCheckoutHandler} variant='warning' disabled={cartItems.length === 0}>
                                    Checkout
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
      </div>
    </>
  )
}
