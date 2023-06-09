import React, {useEffect, useState} from 'react';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import UserCardModal from "./Modals/UserCardModal";

const UsersConnected = (props) => {
    const {serverUsers, serverSessions} = useSelector(state => ({
        loading: state.Occtl.usersLoading,
        serverUsers: state.Occtl.users,
        serverSessions: state.Occtl.sessions,
        error: state.Occtl.error,
    }));

    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})

    useEffect(()=>{
        if(serverUsers !== users){
            let userTMP = []

            for(const usr of serverUsers){
                userTMP.push({...usr, useragent: ""})
            }

            setUsers([...userTMP])
        }
    },[serverUsers])

    useEffect(()=>{
        if(serverSessions && serverSessions !== []){
            let userTMP = []

            for(const usr of serverUsers){

                const session = serverSessions.filter(sess=>sess.session===usr.session)

                let useragent = "unknown"

                if(session && session.length > 0){
                    useragent = session[0].useragent
                }

                userTMP.push({...usr, useragent})
            }

            setUsers([...userTMP])
        }
    },[serverSessions,serverUsers])

    const [userCardModal, setUserCardModal] = useState(false)

    const toggleUserCard = () => {
        setUserCardModal(!userCardModal)
    }

    const showUser = (uObj) => {
        setUser(uObj)
        toggleUserCard()
    }

    return (
        <React.Fragment>

            <UserCardModal user={user} modalState={userCardModal} toggle={toggleUserCard} />

            <Col xl={12} md={12}>
                <Card>
                    <CardHeader className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">{props.t("Connected users")}</h4>
                    </CardHeader>

                    <CardBody>
                        <div className="table-responsive table-card">
                            <table className="table table-borderless table-hover table-nowrap align-middle mb-0">
                                <thead className="table-light">
                                    <tr className="text-muted">
                                        <th scope="col">{props.t("ID")}</th>
                                        <th scope="col">{props.t("Username")}</th>
                                        <th scope="col">{props.t("UserAgent")}</th>
                                        <th scope="col">{props.t("Session")}</th>
                                        <th scope="col">{props.t("Groupname")}</th>
                                        <th scope="col">{props.t("State")}</th>
                                        <th scope="col">{props.t("vhost")}</th>
                                        <th scope="col">{props.t("Device")}</th>
                                        <th scope="col">{props.t("MTU")}</th>
                                        <th scope="col">{props.t("Remote IP")}</th>
                                        <th scope="col">{props.t("Local Device IP")}</th>
                                        <th scope="col">{props.t("IPv4")}</th>
                                        <th scope="col">{props.t("Average RX")}</th>
                                        <th scope="col">{props.t("Average TX")}</th>
                                        <th scope="col">{props.t("Connected at")}</th>
                                        <th scope="col">{props.t("DNS")}</th>
                                    </tr>
                                </thead>

                                <tbody>

                                {(users || []).map((user,index)=>(
                                    <tr key={index} onClick={()=>{showUser(user)}} style={{cursor: "pointer"}}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.useragent}</td>
                                        <td>{user.session}</td>
                                        <td>{user.groupname}</td>
                                        <td>{user.state}</td>
                                        <td>{user.vhost}</td>
                                        <td>{user.device}</td>
                                        <td>{user.mtu}</td>
                                        <td>{user.remoteip}</td>
                                        <td>{user.localdeviceip}</td>
                                        <td>{user.ipv4}</td>
                                        <td>{user.averagerx}</td>
                                        <td>{user.averagetx}</td>
                                        <td>{user.connectedat}</td>

                                        <td>{user.dns.join(",")}</td>

                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};
UsersConnected.propTypes = {
    t: PropTypes.any
};
export default withTranslation()(UsersConnected);
