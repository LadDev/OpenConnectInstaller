import React, {PureComponent, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from "react-i18next";
import { Button, Modal,ModalHeader, ModalFooter, ModalBody, Row, Col } from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import {disconnectUser, fetchOcctlUser} from "../../../store/occtl/actions";

const UserCardModal = (props) => {
    const dispatch = useDispatch()
    const [modalState, setModalState] = useState(false);
    const [user, setUser] = useState(null);

    const {serverUser} = useSelector(state => ({
        loading: state.Occtl.usersLoading,
        serverUser: state.Occtl.user,
        error: state.Occtl.error,
    }));

    useEffect(()=>{
        setModalState(props.modalState)

        if(props.modalState){
            dispatch(fetchOcctlUser(props.user.id))
        }

    },[props.modalState])

    useEffect(()=>{
        setUser(props.user)
    },[props.user])

    useEffect(()=>{
        if(serverUser){
            setUser(serverUser)
        }
    },[serverUser])

    const toggleModal = () => {
        props.toggle()
    }

    const disconnect = () => {
        dispatch(disconnectUser(user.id))
        props.toggle()
    }

    return (
        <React.Fragment>
            <Modal id="myModal"
                   isOpen={modalState}
                   toggle={toggleModal}
            >
                <ModalHeader toggle={() => {
                    toggleModal();
                }}>
                    {props.t("User Card")}
                </ModalHeader>
                <ModalBody>
                    {modalState && user?(
                        <Row>
                            <Col xl={12}>
                                <div className="mt-3 pt-2">

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("ID")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.id}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("Username")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.username}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("Session")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.session}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("Full Session")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.fullsession}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("Groupname")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.groupname}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("Status")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.state}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("vhost")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.vhost}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("Device")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.device}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("Remote IP")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.remoteip}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("Local Device IP")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.localdeviceip}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("IPv4")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.ipv4}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("P-t-P IPv4")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.ptpipv4}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("IPv6")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.ipv6}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("P-t-P IPv6")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.ptpipv6}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("RX")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user._rx}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("TX")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user._tx}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("Average RX")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.averagerx}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("Average TX")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.averagetx}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("DPD")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.dpd}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("KeepAlive")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.keepalive}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("Connected at")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user._connectedat}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("DNS")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.dns.join(",")}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("NBNS")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.nbns.join(",")}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("Split-DNS-Domains")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.splitdnsdomains.join(",")}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("Routes")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.routes}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("No-routes")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.noroutes.join(",")}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("iRoutes")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.iroutes.join(",")}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("Restricted to routes")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.restrictedtoroutes}</p></div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-truncate text-muted fs-14 mb-0">{props.t("Restricted to ports")}</p>
                                        </div>
                                        <div className="flex-shrink-0"><p className="mb-0">{user.restrictedtoports.join(",")}</p></div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    ):("")}

                </ModalBody>
                <ModalFooter>
                    <Button color="light" onClick={() => {toggleModal();}}>{props.t("Close")}</Button>
                    <Button color="danger" onClick={disconnect}>
                        {props.t("Disconnect User")}
                    </Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
}

UserCardModal.propTypes = {
    t: PropTypes.any,
    user: PropTypes.object,
    modalState: PropTypes.bool,
    toggle: PropTypes.func
};

export default withTranslation()(UserCardModal);
