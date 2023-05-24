import React, {useEffect, useState} from 'react';
import { Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { Link } from 'react-router-dom';
import { dealsStatus } from "../../common/data";
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import UserCardModal from "./Modals/UserCardModal";

const UsersConnected = (props) => {
    const {serverUsers} = useSelector(state => ({
        loading: state.Occtl.usersLoading,
        serverUsers: state.Occtl.users,
        error: state.Occtl.error,
    }));

    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})

    useEffect(()=>{
        if(serverUsers !== users){
            setUsers(serverUsers)
        }
    },[serverUsers, users])

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
                                        <th scope="col">{props.t("Session")}</th>
                                        <th scope="col">{props.t("Groupname")}</th>
                                        <th scope="col">{props.t("State")}</th>
                                        <th scope="col">{props.t("vhost")}</th>
                                        <th scope="col">{props.t("Device")}</th>
                                        <th scope="col">{props.t("MTU")}</th>
                                        <th scope="col">{props.t("Remote IP")}</th>
                                        {/*<th scope="col">{props.t("Location")}</th>*/}
                                        <th scope="col">{props.t("Local Device IP")}</th>
                                        <th scope="col">{props.t("IPv4")}</th>
                                        {/*<th scope="col">{props.t("P-t-P IPv4")}</th>*/}
                                        {/*<th scope="col">{props.t("IPv6")}</th>*/}
                                        {/*<th scope="col">{props.t("P-t-P IPv6")}</th>*/}
                                        {/*<th scope="col">{props.t("RX")}</th>*/}
                                        {/*<th scope="col">{props.t("TX")}</th>*/}
                                        <th scope="col">{props.t("Average RX")}</th>
                                        <th scope="col">{props.t("Average TX")}</th>
                                        {/*<th scope="col">{props.t("DPD")}</th>*/}
                                        {/*<th scope="col">{props.t("KeepAlive")}</th>*/}
                                        <th scope="col">{props.t("Connected at")}</th>
                                        {/*<th scope="col">{props.t("Full session")}</th>*/}
                                        <th scope="col">{props.t("DNS")}</th>

                                        {/*<th scope="col" style={{ width: "20%" }}>Last Contacted</th>*/}
                                        {/*<th scope="col" >Sales Representative</th>*/}
                                        {/*<th scope="col" style={{ width: "16%" }}>Status</th>*/}
                                        {/*<th scope="col" style={{ width: "12%" }}>Deal Value</th>*/}
                                    </tr>
                                </thead>

                                <tbody>

                                {(users || []).map((user,index)=>(
                                    <tr key={index} onClick={()=>{showUser(user)}} style={{cursor: "pointer"}}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.session}</td>
                                        <td>{user.groupname}</td>
                                        <td>{user.state}</td>
                                        <td>{user.vhost}</td>
                                        <td>{user.device}</td>
                                        <td>{user.mtu}</td>
                                        <td>{user.remoteip}</td>
                                        {/*<td>{user.location}</td>*/}
                                        <td>{user.localdeviceip}</td>
                                        <td>{user.ipv4}</td>
                                        {/*<td>{user.ptpipv4}</td>*/}
                                        {/*<td>{user.ipv6}</td>*/}
                                        {/*<td>{user.ptpipv6}</td>*/}
                                        {/*<td>{user._rx}</td>*/}
                                        {/*<td>{user._tx}</td>*/}
                                        <td>{user.averagerx}</td>
                                        <td>{user.averagetx}</td>
                                        {/*<td>{user.dpd}</td>*/}
                                        {/*<td>{user.keepalive}</td>*/}
                                        <td>{user.connectedat}</td>

                                        <td>{user.dns.join(",")}</td>

                                    </tr>
                                ))}

                                    {/*{(dealsStatus || []).map((item, index) => (*/}
                                    {/*    <tr key={index}>*/}
                                    {/*        <td>{item.name}</td>*/}
                                    {/*        <td>{item.date}</td>*/}
                                    {/*        <td><img src={item.img} alt="" className="avatar-xs rounded-circle me-2" />*/}
                                    {/*            <Link to="#" className="text-body fw-medium">{item.representativeName}</Link></td>*/}
                                    {/*        <td><span className={"badge badge-soft-" + item.badgeClass + " p-2"}>{item.status}</span></td>*/}
                                    {/*        <td><div className="text-nowrap">{item.statusValue}</div></td>*/}
                                    {/*    </tr>*/}
                                    {/*))}*/}
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
