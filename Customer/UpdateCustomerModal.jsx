import React, { useState, useEffect } from 'react'
import { Form, Button, Header, Modal } from 'semantic-ui-react'
import axios from 'axios'

/************************************* 
  * Function to Update the Customer
  **************************************/

const UpdateCustomerModal = (props) => {

    const { open, toggleUpdateModal, fetchCustomerData, customer } = props;

    const [updateNameStatus, setupdateNameStatus] = useState(false)
    const [updateAddressStatus, setupdateAddressStatus] = useState(false)
    const [cname, setcname] = useState(customer.name);
    const [caddress, setcaddress] = useState(customer.address);
    //const [customerId] = useState(customer.customerId);

    console.log("Customer Id: " + customer.customerId + " Name: " + customer.customerName + " Address: " + customer.customerAddress);

    useEffect(() => {
        console.log("UpdateCustomers:useEffect:Name: " + cname + " address: " + caddress);
        return () => {
            console.log("UpdateCustomer:UnMount a Component using Hook")

        }
    }, [cname, caddress])

    /************************************* 
      * Function to Update the Customer
      **************************************/
    const updateName = (e) => {
        setcname(e.target.value)
        setupdateNameStatus(true)
        console.log("Comp1:updateName:" + e.target.value)
    }

    /************************************* 
     * Function to Update the Address field
     **************************************/
    const updateAddress = (e) => {
        setcaddress(e.target.value)
        setupdateAddressStatus(true)
        console.log("Comp1:updateAddress:" + e.target.value)
    }


    /************************************* 
     * Function to Update the Customer
    **************************************/
    const updateCustomer = (custId) => {
        console.log("UpdateCustomers:updateCustomer:Cid=" + customer.customerId + " CName: " + cname + " CAddress: " + caddress);
        
        var msg = ""
        /* Based on the field update status edited Name or Props Name is coppied. */
        let customer1 = {
            id: customer.customerId,
            name: updateNameStatus ? cname : customer.name,
            address: updateAddressStatus ? caddress : customer.address
        }
        console.log("UpdateCustomers:updateCustomer:customer1:Cid=" + customer1.id + " CName: " + customer1.name + " CAddress: " + customer1.address);
        if (cname != null && caddress != null) {
            if ((cname.localeCompare("") !== 0 && caddress.localeCompare("") !== 0)) {
                axios.put(`/Customers/PutCustomer/${custId}`, {
                    CustomerId: customer1.id,
                    customerName: customer1.name,
                    CustomerAddress: customer1.address,
                }
                )
                    .then(function (res) {
                        console.log(res);
                        fetchCustomerData();
                        setupdateNameStatus(false)
                        setupdateAddressStatus(false)
                        toggleUpdateModal();

                    })
                    .catch(function (err) {
                        console.log(err);
                        setupdateNameStatus(false)
                        setupdateAddressStatus(false)
                        toggleUpdateModal();
                    });
            } else {
                /* Show Alert on blank Sales details */
                if (cname.localeCompare("") === 0) {
                    msg = "Customer Name field is empty..\n"
                }
                if (caddress.localeCompare("") === 0) {
                    msg = msg + "Customer Address field is empty..\n"
                }
                msg = msg + "Please enter the correct Customer Details\n"
                alert(msg)
            }
        } else {
            /* Show Alert on null Sales details */
            if (cname == null) {
                msg = "Customer Name field is empty..\n"
            }
            if (caddress == null) {
                msg = msg + "Customer Address field is empty..\n"
            }
            msg = msg + "Please enter the correct Customer Details\n"
            alert(msg)
        }
    }

    /************************************* 
     * Using Semantic UI Modal & Form  as UI
     **************************************/
    return (
        <Modal
            open={open}
        >
            <Modal.Header>Edit Customer</Modal.Header>
            <Modal.Content>

                <Modal.Description>
                    <Header>Customer details</Header>

                    <Form>
                        <Form.Field>
                            <label>Customer Name</label>
                            <input placeholder='Customer Name' name='cname'
                                defaultValue={customer.customerName} id="myInput"
                                onChange={(e) => updateName(e)} />
                        </Form.Field>
                        <Form.Field>
                            <label>Customer Address</label>
                            <input placeholder='Customer Address' name='caddress' 
                            defaultValue={customer.customerAddress} onChange={(e) => updateAddress(e)} />
                        </Form.Field>
                    </Form></Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => toggleUpdateModal()}>
                    Cancel
        </Button>
                <Button
                    content="Update"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => updateCustomer(customer.customerId)}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default UpdateCustomerModal