import { Tab, Tabs } from "react-bootstrap";

export default function AdminPanel() {
  return (
    <div>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="users" title="Users">
          Tab content for Users
        </Tab>
        <Tab eventKey="products" title="Products">
          Tab content for Product
        </Tab>
        
        <Tab eventKey="orders" title="Orders">
          Tab content for Order
        </Tab>
      </Tabs>
    </div>
  );
}
