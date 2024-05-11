pragma solidity ^0.8.0;

contract Parcel {
    struct ParcelData {
        uint256 id;
        uint price;
        string state;
        string city;
        string clientFullName;
        string clientPhoneNumber;
    }

    struct ParcelHistoryItem {
        uint256 parcelId;
        string status;
        uint256 timestamp;
        address updatedBy;
    }

    mapping(uint256 => ParcelData) public parcels;

    mapping(uint256 => ParcelHistoryItem[]) public parcelHistory;

    uint256 public parcelCount;

    event ParcelCreated(
        uint256 indexed id,
        uint price,
        string state,
        string city,
        string clientFullName,
        string clientPhoneNumber
    );

    event ParcelStatusUpdated(
        uint256 indexed id,
        string status,
        uint256 timestamp,
        address updatedBy
    );

    constructor() {
        parcelCount = 0;
    }

    function createParcel(
        uint _price,
        string memory _state,
        string memory _city,
        string memory _clientFullName,
        string memory _clientPhoneNumber
    ) public {
        parcelCount++;
        parcels[parcelCount] = ParcelData(
            parcelCount,
            _price,
            _state,
            _city,
            _clientFullName,
            _clientPhoneNumber
        );

        parcelHistory[parcelCount].push(
            ParcelHistoryItem(
                parcelCount,
                "CREATED",
                block.timestamp,
                msg.sender
            )
        );

        emit ParcelCreated(
            parcelCount,
            _price,
            _state,
            _city,
            _clientFullName,
            _clientPhoneNumber
        );
    }

    function updateParcelStatus(uint256 _id, string memory _status) public {
        parcelHistory[_id].push(
            ParcelHistoryItem(_id, _status, block.timestamp, msg.sender)
        );

        emit ParcelStatusUpdated(_id, _status, block.timestamp, msg.sender);
    }

    function getParcels() public view returns (ParcelData[] memory) {
        ParcelData[] memory _parcels = new ParcelData[](parcelCount);
        for (uint256 i = 1; i <= parcelCount; i++) {
            _parcels[i - 1] = parcels[i];
        }
        return _parcels;
    }

    function getParcel(uint256 _id) public view returns (ParcelData memory) {
        return parcels[_id];
    }

    function getParcelHistory(
        uint256 _id
    ) public view returns (ParcelHistoryItem[] memory) {
        return parcelHistory[_id];
    }
}
