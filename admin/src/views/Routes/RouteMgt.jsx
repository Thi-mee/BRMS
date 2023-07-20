import XPTable from "../../components/Table/XPTable";
import {useSelector} from "react-redux";
import {getRoutesData} from "../../store/selectors";
import FlexHeader from "../../components/Headers/FlexHeader";
import {BackButton, Button} from "../../components/Button/Button";
import {Dropdown, DropdownButton, Modal} from "react-bootstrap";
import {useState} from "react";





const RouteMgt = (props) => {
    const {data: routes, error} = useSelector(getRoutesData)
    const [showModal, setShowModal] = useState(false)
    return (
        <div className={'page'}>
            <FlexHeader headerText={'Routes'}>
                <div className="d-flex gap-1">
                    <BackButton/>
                    <Button onClick={() => console.log("Clicked")}>
                        Create new Route
                    </Button>
                </div>
            </FlexHeader>
            <RouteTable data={routes} />
            <Modal onHide={() => {
                setShowModal(false)
            }} show={showModal} size={'lg'}>

            </Modal>
        </div>
    );
};


export default RouteMgt



function RouteTable(props) {
    return <XPTable
        serial
        data={props.data}
        titles={["Name", "Title", "Start point", "Stop point", "Status", "Actions"]}
        renderitem={(item, index) => (
            <>
                <td>{item.name}</td>
                <td>{item.title}</td>
                <td>{item.start}</td>
                <td>{item.stop}</td>
                <td>{item.status}</td>
                <td>
                    <RouteDropdown/>
                </td>
            </>
        )}
    />;
}

function RouteDropdown (props) {
    return (
        <DropdownButton id="dropdown-basic-button" title="Manage" variant={'light'}>
            <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
            <Dropdown.Item as={Button}>Delete</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Map</Dropdown.Item><Dropdown.Item href="#/action-3">Schedule</Dropdown.Item>
        </DropdownButton>
    )
}