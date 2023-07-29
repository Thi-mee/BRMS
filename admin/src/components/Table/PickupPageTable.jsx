import {Button} from "../Button/Button";
import XPTable from "./shared/XPTable";


const PickUpTable = ({pickupPoints,navigateToEdit, preDelete}) => (
    <XPTable
        data={pickupPoints}
        titles={["Name", "Title", "Nearest Bus Stop", "Status", "Action"]}
        serial
        renderitem={(pickUpPoint, i) => (
            <>
                <td>{pickUpPoint.name}</td>
                <td>{pickUpPoint.title}</td>
                <td>{pickUpPoint.busStop}</td>
                <td>{pickUpPoint.status}</td>
                <td>
                    <div className="d-flex gap-2">
                        <Button
                            variant="warning"
                            size="sm"
                            onClick={() => navigateToEdit(pickUpPoint.id)}>
                            Edit
                        </Button>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => preDelete(pickUpPoint)}>
                            Delete
                        </Button>
                    </div>
                </td>
            </>
        )}
    />
)

export default PickUpTable;