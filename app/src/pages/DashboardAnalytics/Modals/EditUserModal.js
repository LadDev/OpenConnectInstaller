import React, {PureComponent, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from "react-i18next";
import { Button, Modal,ModalHeader, ModalFooter, ModalBody, Row, Col, Form,
    FormFeedback,
    Input,
    Label } from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import {disconnectUser, fetchOcctlUser, occtlUpdateUser} from "../../../store/occtl/actions";
import {useFormik} from "formik";
import * as Yup from "yup";

const EditUserModal = (props) => {
    const dispatch = useDispatch()
    const [modalState, setModalState] = useState(false);


    useEffect(()=>{
        setModalState(props.modalState)
    },[props.modalState])

    const toggleModal = () => {
        props.toggle()
    }

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            username: props.user.username || "",
            password: "",
            confirm_password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required(props.t("Please Enter Your Username")),
            password: Yup.string().required(props.t("Please Enter Your Password")),
            confirm_password: Yup.string().required(props.t("Please Confirm Password")),
        }),
        onSubmit: (values) => {
            dispatch(occtlUpdateUser({...values,groupname:"*"}))
            //dispatch(setAccountsAboutAction({ids:props.selected,about:values.about}))
            //dispatch(setUsernamesAction({usernames:completeUsernames,ids:selected}))

        }
    });





    return (
        <React.Fragment>
            <Modal id="myModal"
                   isOpen={modalState}
                   toggle={toggleModal}
            >
                <ModalHeader toggle={() => {
                    toggleModal();
                }}>
                    {props.t("Edit User")}
                </ModalHeader>
                <ModalBody>

                    <Form onSubmit={(e) => {e.preventDefault();validation.handleSubmit();return false;}} action="#">
                        <div className={"mb-3"}>
                            <Label htmlFor={"username"} className={"form-label"}>{props.t("Username")}</Label>
                            <Input
                                name={"username"}
                                className={"form-control"}
                                type={"text"}
                                onChange={validation.handleChange}
                                placeholder={props.t("Enter yours Username...")}
                                defaultValue={props.user.username}
                                disabled={props.user && props.user.username !== ""}
                                invalid={
                                    validation.touched.username && validation.errors.username ? true : false
                                }
                            />
                            {validation.touched.username && validation.errors.username ? (
                                <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                            ) : null}
                        </div>
                        <div className={"mb-3"}>
                            <Label htmlFor={"password"} className={"form-label"}>{props.t("Password")}</Label>
                            <Input
                                name={"password"}
                                className={"form-control"}
                                type={"password"}
                                onChange={validation.handleChange}
                                placeholder={props.t("Enter yours Password...")}
                                invalid={
                                    validation.touched.password && validation.errors.password ? true : false
                                }
                            />
                            {validation.touched.password && validation.errors.password ? (
                                <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                            ) : null}
                        </div>
                        <div className={"mb-3"}>
                            <Label htmlFor={"confirm_password"} className={"form-label"}>{props.t("Confirm Password")}</Label>
                            <Input
                                name={"confirm_password"}
                                className={"form-control"}
                                type={"password"}
                                onChange={validation.handleChange}
                                placeholder={props.t("Confirm yours Password...")}
                                invalid={
                                    validation.touched.confirm_password && validation.errors.confirm_password ? true : false
                                }
                            />
                            {validation.touched.confirm_password && validation.errors.confirm_password ? (
                                <FormFeedback type="invalid">{validation.errors.confirm_password}</FormFeedback>
                            ) : null}
                        </div>
                    </Form>

                </ModalBody>
                <ModalFooter>
                    <Button color="light" onClick={() => {toggleModal()}}>{props.t("Close")}</Button>
                    <Button color="success" onClick={()=>{validation.handleSubmit()}}>
                        {props.t("Update")}
                    </Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
}

EditUserModal.propTypes = {
    t: PropTypes.any,
    user: PropTypes.object,
    modalState: PropTypes.bool,
    toggle: PropTypes.func
};

export default withTranslation()(EditUserModal);
