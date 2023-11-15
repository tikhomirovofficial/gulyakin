import React, {FC} from 'react';
import styles from "../Windows/DeliveryWay/deliveryWay.module.scss";
import {FindedAddress, SearchAddressItem} from "../Windows/DeliveryWay";

type AddressSuggestionsProps = {
    findedAddresses: FindedAddress[],
    selectAddress:  (lat: string, long: string, address: string) => void

}
const AddressSuggestions: FC<AddressSuggestionsProps> = ({findedAddresses, selectAddress}) => {
    return (
        <div className={`${styles.searchedMatches} miniScrollbar  pd-10 p-abs left-0 w-100p bg-white`}>
            {
                findedAddresses.map(item => (
                    item.house !== null ?
                        <SearchAddressItem
                            geo_lat={item.geo_lat}
                            geo_lon={item.geo_lon}
                            handleAddress={() => selectAddress(item.geo_lat || "0", item.geo_lon || "0", item.address)}
                            house={item.house}
                            address={item.address}
                            city={item.city}/>
                        : null
                ))
            }
        </div>
    );
};

export default AddressSuggestions;