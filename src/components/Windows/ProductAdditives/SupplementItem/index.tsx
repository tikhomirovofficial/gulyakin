import React, {Dispatch, FC, SetStateAction} from "react";
import styles from "../productAdditives.module.scss";
import {CheckedMark} from "../../../../icons";

type SupplementProps = {
    id: number,
    price: number,
    title: string
    selected?: boolean,
    setAddedSupplements: Dispatch<SetStateAction<Array<number>>>,
    addedSupplementsIds: Array<number>
}

const SupplementItem: FC<SupplementProps> = ({
                                                 id,
                                                 price,
                                                 addedSupplementsIds,
                                                 title,
                                                 setAddedSupplements,
                                                 selected
                                             }) => {
    const added = addedSupplementsIds.some(sup => sup === id)
    const addSupplement = (id: number) => {
        setAddedSupplements(prev => [...prev, id])
    }
    const removeSupplement = (id: number) => {
        setAddedSupplements(prev => prev.filter(sup_id => sup_id !== id))
    }

    const handleSupplement = (id: number) => {
        if (added) {
            removeSupplement(id)
            return;
        }
        addSupplement(id)

    }
    return (
        <div className={`${styles.supplementItem}  f-row-betw`}>
            <div className="left d-f gap-10 al-end ">
                <p>{title}</p>
                <div className={`${styles.price}`}>+ {price} ₽</div>
            </div>
            <div onClick={() => handleSupplement(id)}
                 className={`${styles.checkbox} ${added ? styles.checkboxSelected : ""} w-content h-content f-c-col`}>
                {
                    added ? <CheckedMark stroke={"white"} height={10}/> : null
                }
            </div>
        </div>
    );
};
export default SupplementItem