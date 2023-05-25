import React, {useEffect, useState} from 'react';
import { Card, CardBody, CardHeader, Col, Button } from 'reactstrap';
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import UserCardModal from "./Modals/UserCardModal";
import {disconnectUser} from "../../store/occtl/actions";
import EditUserModal from "./Modals/EditUserModal";

const UsersList = (props) => {
    const dispatch = useDispatch()

    const {serverUsers, serverUsersFile} = useSelector(state => ({
        loading: state.Occtl.usersLoading,
        serverUsers: state.Occtl.users,
        serverUsersFile: state.Occtl.usersFile,
        error: state.Occtl.error,
    }));

    const [usersFile, setUsersFile] = useState([])
    const [user, setUser] = useState({})

    useEffect(()=>{

        const usersFileData = []

        for(const usrStr of serverUsersFile){
            if(usrStr!==""){
                const usrArr = usrStr.split(":")

                const isOnline = serverUsers.filter(usr=>usr.username === usrArr[0])

                usersFileData.push({
                    id: isOnline.length>0?isOnline[0].id:null,
                    status: isOnline.length>0?"online":"offline",
                    username: usrArr[0],
                    groupname: usrArr[1],
                    hash: usrArr[3],
                })
            }

        }

        setUsersFile(usersFileData)

    },[serverUsers, serverUsersFile])

    const [userCardModal, setUserCardModal] = useState(false)

    const toggleUserCard = () => {
        setUserCardModal(!userCardModal)
    }
    const disconnectUsr = (id) => {
        dispatch(disconnectUser(id))
    }

    const editUser = (usr) =>{
        setUser(usr)

        toggleUserCard()
    }

    const addUser = () =>{
        setUser(null)
        toggleUserCard()
    }

    return (
        <React.Fragment>

            <EditUserModal user={user} modalState={userCardModal} toggle={toggleUserCard} />

            <Col xl={6} md={6}>
                <Card>
                    <CardHeader className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">{props.t("Users List")}</h4>
                        <React.Fragment>
                            <div className="flex-shrink-0">
                                <button type="button" className="btn btn-soft-primary btn-sm">
                                    {props.t("BackUp")}
                                </button>
                            </div>
                            {"  "}
                            <div className="flex-shrink-0">
                                <button type="button" onClick={addUser} className="btn btn-soft-primary btn-sm">
                                    {props.t("Create")}
                                </button>
                            </div>
                        </React.Fragment>
                    </CardHeader>

                    <CardBody>
                        <div className="table-responsive table-card">
                            <table className="table table-borderless table-hover table-nowrap align-middle mb-0">
                                <thead className="table-light">
                                    <tr className="text-muted">
                                        <th scope="col" style={{width: "50px"}}>{props.t("Status")}</th>
                                        <th scope="col">{props.t("Username")}</th>
                                        <th scope="col">{props.t("Action")}</th>
                                    </tr>
                                </thead>

                                <tbody>

                                {(usersFile || []).map((user,index)=>(
                                    <tr key={index} style={{cursor: "pointer"}}>
                                        <td align={"center"}>
                                            {user.status==="online"?(
                                                <i className="mdi mdi-circle align-middle text-success me-2"/>
                                            ):(
                                                <i className="mdi mdi-circle align-middle text-danger me-2" />
                                            )}
                                        </td>
                                        <td>{user.username}</td>
                                        <td>
                                            {user.status==="online"?(
                                                <React.Fragment>
                                                    <Button color="warning" onClick={()=>{disconnectUsr(user.id)}}>{props.t("Disconnect")}</Button>
                                                </React.Fragment>
                                            ):(
                                                <React.Fragment>
                                                    <Button color="success" onClick={()=>{editUser(user)}}>{props.t("Edit")}</Button>
                                                    {" "}
                                                    <Button color="danger" onClick={()=>{}}>{props.t("Delete")}</Button>
                                                </React.Fragment>
                                            )}
                                        </td>
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
UsersList.propTypes = {
    t: PropTypes.any
};
export default withTranslation()(UsersList);
