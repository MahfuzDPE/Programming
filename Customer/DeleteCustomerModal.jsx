import React, { useState, useEffect } from 'react'
import { Label, Form, Button, Header, Modal } from 'semantic-ui-react'
import axios from 'axios'

/************************************* 
 * Function to get approval to Delete the Customer
 **************************************/

const DeleteCustomerModal = (props) => {
    const { open, toggleDeleteModal, fetchCustomerData, customer } = props;
    useEffect(() => {
        console.log("UnMount a Component using Hook")
        return () => {
            console.log("UnMount a Component using Hook1")
        }
    }, [])

    /************************************* 
    * Function to Delete the Customer
    **************************************/
    const deleteCustomer = (id) => {
        console.log("Customers:deleteCustomer")
        axios.delete(`/Customers/DeleteCustomer/${id}`)
            .then(function (res) {
                console.log(res);
                fetchCustomerData();
                toggleDeleteModal();
            })
            .catch(function (err) {
                // handle error

                console.log(err);
                toggleDeleteModal();
            })

    }


    /************************************* 
     * Using Semantic UI Modal & ribbon Labels as UI
     **************************************/
    return (
        <Modal open={open}>
            <Modal.Header>Delete customer</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form.Field>
                        <Label as='a' color='red'>
                            Customer ID : {customer.customerId},
                            Customer Name : {customer.customerName},
                            Customer Address : {customer.customerAddress}
                        </Label>
                    </Form.Field>
                    <br /><br />
                    <footer align='center'>Are you sure?</footer>
                </Modal.Description>
            </Modal.Content>

            <Modal.Actions>
                <Button color="black" onClick={() => toggleDeleteModal()}>
                    Cancel
                </Button>
                <Button
                    color="red"
                    content="Delete"
                    labelPosition="right"
                    icon="x"
                    onClick={() => deleteCustomer(customer.customerId)}
                />
            </Modal.Actions>
        </Modal>
    );
}

export default DeleteCustomerModal