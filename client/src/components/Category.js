import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function Category() {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="Shirts" title="Shirts">
        Tab content for Shirts
      </Tab>
      <Tab eventKey="Pants" title="Pants">
        Tab content for Pants
      </Tab>
      <Tab eventKey="Dresses" title="Dresses">
        Tab content for Dresses
      </Tab>
      <Tab eventKey="Contact" title="Contact">
        Tab content for Contact
      </Tab>
    </Tabs>
  )
}
