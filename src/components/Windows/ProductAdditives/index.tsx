import React, {useState} from 'react';
import ShadowWrapper from "../ShadowWrapper";
import WindowBody from "../WhiteWrapper";
import {CloseIcon} from "../../../icons";
import styles from './productAdditives.module.scss'
import RedButton from "../../Buttons/RedButton";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {handleProductAdditives} from "../../../features/modals/modalsSlice";
import List from "../../List";
import {domain} from "../../../http/instance/instances";
import SupplementItem from "./SupplementItem";
import useProduct from "../../../hooks/useProduct";
import {getSupplementsTotalPrice} from "../../../utils/getSupplementsTotalPrice";
import {getFromCartAddedSupplements} from "../../../utils/getFromCartAddedSupplements";
import useCombo from "../../../hooks/useCombo";
import EditProductVariant from "./EditProductVariants/EditProductVariant";
import EditComboVariant from "./EditProductVariants/EditComboVariant";


const ProductAdditives = () => {
    const {
       is_combo
    } = useAppSelector(state => state.modals.productAdditivesData)

    return !is_combo ? <EditProductVariant/> : <EditComboVariant/>
};

export default ProductAdditives;