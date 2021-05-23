import React, { useState, useEffect } from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import axios from 'axios'

/************************************* 
 * Function to Add/Create the Customer
 **************************************/
const AddNewCustomer = (props) => {
    const { open, toggleCreateModal, fetchCustomerData } = props;
    const [name, setname] = useState(null);
    const [address, setaddress] = useState(null);
    useEffect(() => {
        console.log(name + " " + address)
        return () => {
            console.log("UnMount a Component using Hook")

        }
    }, [name, address])
    console.log("Testing :" + name + " and " + address);
    /************************************* 
     * Function to Add/Create Customer using axios
     **************************************/
    const createCustomer = () => {
        var msg = ""
        if (name != null && address != null) {
            if ((name.localeCompare("") !== 0 && address.localeCompare("") !== 0)) {
                axios.post(`/Customers/PostCustomer`, {
                    CustomerName: name,
                    CustomerAddress: address,
                })
                    .then(function (res) {
                        console.log(res);
                        fetchCustomerData();
                        resetNewSalesData();
                        toggleCreateModal();
                    })
                    .catch(function (err) {
                        console.log(err);
                        resetNewSalesData();
                        toggleCreateModal();
                    });
            } else {
                /* Show Alert on blank Sales details */
                if (name.localeCompare("") === 0) {
                    msg = "Customer Name field is empty..\n"
                }
                if (address.localeCompare("") === 0) {
                    msg = msg + "Customer Address field is empty..\n"
                }
                msg = msg + "Please enter the correct Customer Details\n"
                alert(msg)
            }
        } else {
            /* Show Alert on null Sales details */
            if (name == null) {
                msg = "Customer Name field is empty..\n"
            }
            if (address == null) {
                msg = msg + "Customer Address field is empty..\n"
            }
            msg = msg + "Please enter the correct Customer Details\n"
            alert(msg)
        }
    }

    /*********************************************************************************** 
      * Function to Update the local state fields to null before exiting the AddNewSale
      ***********************************************************************************/
    const resetNewSalesData = () => {
        setname(null)
        setaddress(null)
        console.log("AddNewSale:resetNewSalesData:Customer Name: " + name + " Customer Address: " + address)
    }

    /*********************************************************************************** 
     * on Cancel, Function to Update the local state fields to null before exiting the AddNewSale
     ***********************************************************************************/
    const resetNewCustomersDataOnCancel = () => {
        resetNewSalesData();
        toggleCreateModal();
        console.log("AddNewSale:resetNewSalesData:Customer Name: " + name + " Customer Address: " + address)
    }
    /************************************* 
    * Using Semantic UI Modal & Form as UI
    **************************************/
    return (
        <Modal
            open={open}
        >
            <Modal.Header>C U S T O M E R</Modal.Header>
            <Modal.Content>

                <Modal.Description>

                    <Form>
                        <Form.Field>
                            <label>Customer Name</label>
                            <input placeholder='Customer Name' onChange={(e) => setname(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <label>Customer Address</label>
                            <input placeholder='Customer Address' onChange={(e) => setaddress(e.target.value)} />
                        </Form.Field>
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => toggleCreateModal()}>
                    Cancel
        </Button>
                <Button
                    content="Create"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => createCustomer()}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default AddNewCustomer