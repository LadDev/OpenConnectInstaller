import React, {useEffect, useState} from 'react';
import { Card, CardBody, CardHeader, Col, Row, UncontrolledTooltip } from 'reactstrap';
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {occtlReset, occtlStopNow} from "../../store/occtl/actions";

const ServerStatus = (props) => {
    const dispatch = useDispatch()
    const {serverStatus} = useSelector(state => ({
        statusLoading: state.Occtl.statusLoading,
        serverStatus: state.Occtl.status,
        error: state.Occtl.error,
    }));

    const [status, setStatus] = useState({})

    useEffect(()=>{
        if(serverStatus !== status){
            setStatus(serverStatus)
        }
    },[serverStatus, status])

    const reset = () => {
        dispatch(occtlReset())
    }

    const stopNow = () => {
        dispatch(occtlStopNow())
    }

    return (
        <React.Fragment>
            <Col xl={6} md={6}>
                <Card className="card-height-100">
                    <CardHeader className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">
                            {status.status&&status.status==="online"?(
                                <i className="mdi mdi-circle align-middle text-success me-2"/>
                            ):(
                                <i className="mdi mdi-circle align-middle text-danger me-2" />
                            )}
                            {props.t("Server Status")}
                        </h4>
                        {status.status&&status.status==="online"?(
                           <React.Fragment>
                               {/*<div className="flex-shrink-0">*/}
                               {/*    <button type="button" id={"reload_button"} className="btn btn-soft-primary btn-sm">*/}
                               {/*        {props.t("Reload")}*/}
                               {/*    </button>*/}
                               {/*</div>*/}
                               {" "}
                               <div className="flex-shrink-0">
                                   <button type="button" onClick={reset} id={"reset_button"} className="btn btn-soft-warning btn-sm">
                                       {props.t("Reset")}
                                   </button>
                               </div>
                               {" "}
                               <div className="flex-shrink-0">
                                   <button type="button" onClick={stopNow} id={"stop_button"} className="btn btn-soft-danger btn-sm">
                                       {props.t("Stop")}
                                   </button>
                               </div>
                               {/*<UncontrolledTooltip target={"reload_button"} placement={"bottom"}>{props.t("Reloads the server configuration")}</UncontrolledTooltip>*/}
                               <UncontrolledTooltip target={"reset_button"} placement={"bottom"}>{props.t("Resets the screen and terminal")}</UncontrolledTooltip>
                               <UncontrolledTooltip target={"stop_button"} placement={"bottom"}>{props.t("Terminates the server")}</UncontrolledTooltip>
                           </React.Fragment>
                        ):("")}



                    </CardHeader>

                    <CardBody>
                        {status !== {}?(
                            <Row>
                                <Col xl={6}>
                                    <div className="mt-3 pt-2">
                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate text-muted fs-15 mb-0">
                                                    {props.t("Status")}
                                                </p>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <p className="mb-0">{status.status}</p>
                                            </div>
                                        </div>


                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate text-muted fs-14 mb-0">{props.t("Server PID")}</p>
                                            </div>
                                            <div className="flex-shrink-0"><p className="mb-0">{status.serverpid}</p></div>
                                        </div>

                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate text-muted fs-14 mb-0">{props.t("Sec-mod PID")}</p>
                                            </div>
                                            <div className="flex-shrink-0"><p className="mb-0">{status.secmodpid}</p></div>
                                        </div>

                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate text-muted fs-14 mb-0">{props.t("Up since")}</p>
                                            </div>
                                            <div className="flex-shrink-0"><p className="mb-0">{status._upsince}</p></div>
                                        </div>

                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate text-muted fs-14 mb-0">{props.t("Active sessions")}</p>
                                            </div>
                                            <div className="flex-shrink-0"><p className="mb-0">{status.activesessions}</p></div>
                                        </div>

                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate text-muted fs-14 mb-0">{props.t("Total sessions")}</p>
                                            </div>
                                            <div className="flex-shrink-0"><p className="mb-0">{status.totalsessions}</p></div>
                                        </div>

                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate text-muted fs-14 mb-0">{props.t("Authentication failures")}</p>
                                            </div>
                                            <div className="flex-shrink-0"><p className="mb-0">{status.totalauthenticationfailures}</p></div>
                                        </div>

                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate text-muted fs-14 mb-0">{props.t("IPs in ban list")}</p>
                                            </div>
                                            <div className="flex-shrink-0"><p className="mb-0">{status.ipsinbanlist}</p></div>
                                        </div>

                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate text-muted fs-14 mb-0">{props.t("Min MTU")}</p>
                                            </div>
                                            <div className="flex-shrink-0"><p className="mb-0">{status.minmtu}</p></div>
                                        </div>

                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate text-muted fs-14 mb-0">{props.t("Receive")}</p>
                                            </div>
                                            <div className="flex-shrink-0"><p className="mb-0">{status.rx}</p></div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={6}>
                                    <div className="mt-3 pt-2">

                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate text-muted fs-14 mb-0">{props.t("Last stats reset")}</p>
                                            </div>
                                            <div className="flex-shrink-0"><p className="mb-0">{status._laststatsreset}</p></div>
                                        </div>

                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate text-muted fs-14 mb-0">{props.t("Sessions handled")}</p>
                                            </div>
                                            <div className="flex-shrink-0"><p className="mb-0">{status.sessionshandled}</p></div>
                                        </div>

                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate text-muted fs-14 mb-0">{props.t("Timed out (idle) sessions")}</p>
                                            </div>
                                            <div className="flex-shrink-0"><p className="mb-0">{status.timedoutidlesessions}</p></div>
                                        </div>

                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate text-muted fs-14 mb-0">{props.t("Closed due to error sessions")}</p>
                                            </div>
                                            <div className="flex-shrink-0"><p className="mb-0">{status.closedduetoerrorsessions}</p></div>
                                        </div>

                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate text-muted fs-14 mb-0">{props.t("Average auth time")}</p>
                                            </div>
                                            <div className="flex-shrink-0"><p className="mb-0">{status.averageauthtime}</p></div>
                                        </div>

                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate text-muted fs-14 mb-0">{props.t("Max auth time")}</p>
                                            </div>
                                            <div className="flex-shrink-0"><p className="mb-0">{status.maxauthtime}</p></div>
                                        </div>

                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate text-muted fs-14 mb-0">{props.t("Average session time")}</p>
                                            </div>
                                            <div className="flex-shrink-0"><p className="mb-0">{status.averagesessiontime}</p></div>
                                        </div>

                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate text-muted fs-14 mb-0">{props.t("Max session time")}</p>
                                            </div>
                                            <div className="flex-shrink-0"><p className="mb-0">{status.maxsessiontime}</p></div>
                                        </div>

                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate text-muted fs-14 mb-0">{props.t("Max MTU")}</p>
                                            </div>
                                            <div className="flex-shrink-0"><p className="mb-0">{status.maxmtu}</p></div>
                                        </div>

                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <p className="text-truncate text-muted fs-14 mb-0">{props.t("Transmit")}</p>
                                            </div>
                                            <div className="flex-shrink-0"><p className="mb-0">{status.tx}</p></div>
                                        </div>


                                    </div>
                                </Col>
                            </Row>
                        ):("")}

                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

ServerStatus.propTypes = {
    t: PropTypes.any
};
export default withTranslation()(ServerStatus);
