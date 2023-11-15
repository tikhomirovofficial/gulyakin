import React, {FC, useEffect} from 'react';
import styles from "./catalog.module.scss";
import List from "../List";
import Product from "./Product";
import {useAppSelector} from "../../app/hooks";
import {BigSpinner} from "../Preloader";
import {getCombinedData, searchProducts} from "../../utils/productsFilter";

type CatalogProps = {
    search: string
}

const Catalog: FC<CatalogProps> = ({search}) => {
    const {categories, products, cart} = useAppSelector(state => state)
    const isLoaded = categories.category.length && products.items.length

    const searchedData = searchProducts(search, getCombinedData(categories.category, products.items))
    useEffect(() => {
    }, [search])
    return (
        <>
            {isLoaded ?
                <div className="block f-column gap-40 ">
                    {
                        searchedData.length > 0 ?
                        searchedData.map(category => (
                            <div className={`${styles.categoryBlock} f-column gap-20`}>
                                <h2 id={`${category?.id}`} className="sectionTitle">{category?.title}</h2>
                                <List
                                    listBlockClassname={`${styles.catalogPartList} d-f flex-wrap gap-20`}
                                    list={category?.products}
                                    listItemClassname={styles.catalogProductWrapper}
                                    renderItem={(product) =>
                                        <Product
                                            key={product.id}
                                            title={product.title}
                                            is_product_day={product.is_product_day !== undefined ? product.is_product_day : false}
                                            id={product.id}
                                            count={cart.items.filter(item => item.product.id === product.id)[0]?.count}
                                            inCart={cart.items.some(item => item.product.id === product.id && !item.is_combo)}
                                            image={product.image}
                                            composition={product.composition || "Состав не заполнен"}
                                            weight={product.weight}
                                            price={product.price} category={product.category}
                                            description={product.description}
                                            short_description={product.short_description}
                                            supplements={product.supplements}/>
                                    }/>
                            </div>
                        )) :
                            <p className={styles.notFoundedText}>По запросу: {search} ничего не найдено.</p>
                    }
                </div> :
                <BigSpinner/>
            }
        </>

    );
};

export default Catalog;