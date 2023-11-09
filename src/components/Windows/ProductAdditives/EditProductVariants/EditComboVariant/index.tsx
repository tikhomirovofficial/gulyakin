import React from 'react';
import ShadowWrapper from "../../../ShadowWrapper";
import styles from "../../productAdditives.module.scss";
import WindowBody from "../../../WhiteWrapper";
import {CloseIcon} from "../../../../../icons";
import {domain} from "../../../../../http/instance/instances";
import RedButton from "../../../../Buttons/RedButton";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {handleProductAdditives} from "../../../../../features/modals/modalsSlice";
import useCombo from "../../../../../hooks/useCombo";

const EditComboVariant = () => {
    const {
        additives = [],
        imageUrl,
        price,
        weight,
        name,
        description,
        id
    } = useAppSelector(state => state.modals.productAdditivesData)
    //ТОЛЬКО ДЛЯ КОМБО
    const dispatch = useAppDispatch()
    const cart = useAppSelector(state => state.cart.items)
    const saveMode = useAppSelector(state => state.modals.isChangingModeAdditives)

    const [addCombo] = useCombo(id)

    const handleProductWindow = () => dispatch(handleProductAdditives())

    return (
        <ShadowWrapper className={`${styles.additivesWindow} f-c-col p-fix h-100v w-100v`}
                       onClick={handleProductWindow}>
            <WindowBody className={`${styles.window} f-column`}>
                <div className="w-100p d-f al-end jc-end">
                    <div onClick={handleProductWindow} className={`closeWrapper ${styles.close}`}>
                        <CloseIcon isDark={true}/>
                    </div>
                </div>
                <div className="f-row-betw h-100p gap-40">
                    <div style={{backgroundImage: `url(${domain + imageUrl})`}}
                         className={`${styles.productImage}`}></div>
                    <div className={`${styles.productAdditivesBar} f-column-betw gap-10`}>
                        <div className="top f-column gap-10">
                            <div className={`${styles.titleBlock} jc-between d-f al-center gap-20`}>
                                <h3>{name}</h3>
                                <div className={styles.weight}>{weight} г</div>
                            </div>
                            <p className={styles.description}>{description || "Описание не заполнено"}</p>
                        </div>
                        <div className={`${additives?.length ? "f-1" : ""} content gap-10 f-column-betw`}>

                            <RedButton onClick={!saveMode ? addCombo : () => {
                            }} disabled={false}
                                       className={"pd-10-0"}>

                                {!saveMode ? `Добавить в корзину за ${price} ₽` : "Сохранить"}
                            </RedButton>
                        </div>

                    </div>
                </div>
            </WindowBody>
        </ShadowWrapper>
    )
}

export default EditComboVariant;