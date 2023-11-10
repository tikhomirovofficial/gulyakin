import {FC, ReactNode} from "react";
import styles from "./logosSection.module.scss";
import {
    FoodHallLogo,
    FoodPancakesLogo,
    GulenkiPelmeniLogo,
    GulibuliLogo,
    GustoLogo,
    IFoodLogo,
    ShrimpLogo, VorobushekLogo
} from "../../icons";

export type MarketItem = {
    ComponentLogo: FC
    className: string,
    selectedClassName: string,
    forMarketId: number,
}

export const marketComponents: MarketItem[] = [
    {
        ComponentLogo: FoodHallLogo,
        className: `${styles.item} ${styles.neededFill} f-c-col`,
        forMarketId: 5,
        selectedClassName: styles.selectedNeededFill
    },
    {
        ComponentLogo: GulenkiPelmeniLogo,
        className: `${styles.item} ${styles.neededFill} f-c-col `,
        forMarketId: 2,
        selectedClassName: styles.selectedNeededFill
    },
    {
        ComponentLogo: FoodPancakesLogo,
        className: `${styles.item} ${styles.neededFill} f-c-col `,
        forMarketId: 3,
        selectedClassName: styles.selectedNeededFill
    },
    {
        ComponentLogo: IFoodLogo,
        className: `${styles.item} ${styles.neededFill} ${styles.neededIfood} f-c-col `,
        forMarketId: 4,
        selectedClassName: `${styles.selectedNeededIFood} ${styles.selectedNeededIFood}`
    },
    {
        ComponentLogo: VorobushekLogo,
        className: `${styles.item} ${styles.neededFill} f-c-col `,
        forMarketId: 6,
        selectedClassName: styles.selectedNeededFill
    },
    {
        ComponentLogo: GustoLogo,
        className: `${styles.item} ${styles.neededGusto} f-c-col `,
        forMarketId: 7,
        selectedClassName: `${styles.selectedNeededGusto}`
    },
    {
        ComponentLogo: ShrimpLogo,
        className: `${styles.item} ${styles.neededFill} f-c-col `,
        forMarketId: 8,
        selectedClassName: styles.selectedNeededFill
    },
    {
        ComponentLogo: GulibuliLogo,
        className: `${styles.item} ${styles.neededFill} f-c-col `,
        forMarketId: 9,
        selectedClassName: styles.selectedNeededFill
    }

]